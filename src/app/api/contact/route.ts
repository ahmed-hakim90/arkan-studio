import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { isAllowedContactOrigin, isSafeWebhookUrl } from "@/lib/security";
import { siteConfig } from "@/lib/site";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createAnonClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().max(12000).optional().default(""),
  systemType: z.enum(["erp", "pos", "ops", "commerce", "ai", "other"]),
  market: z.enum(["egypt", "saudi", "gulf", "global"]).optional().default("egypt"),
  scale: z.enum(["mvp", "growth", "enterprise"]).optional().default("growth"),
  language: z.enum(["ar", "en", "both"]).optional().default("both"),
  website: z.string().max(200).optional().default(""),
  brief: z.unknown().optional(),
});

function hashIp(ip: string): string {
  const salt =
    process.env.LEAD_IP_HASH_SALT ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "arkan";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function extractSourceProject(message: string): string | null {
  const match = message.match(/Interested in something like\s+([a-z0-9-]+)/i);
  if (!match?.[1]) return null;
  return match[1].slice(0, 120);
}

export async function POST(request: Request) {
  if (!isAllowedContactOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Honeypot — bots fill this; humans never see it.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
    to: siteConfig.email,
  };

  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 400);
  const sourceProject = extractSourceProject(payload.message);

  // Persist to Supabase so the dashboard can show every request.
  if (hasSupabaseConfig()) {
    try {
      const supabase = createAnonClient();
      const { error } = await supabase.from("leads").insert({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        system_type: payload.systemType,
        market: payload.market,
        scale: payload.scale,
        language: payload.language,
        source_project: sourceProject,
        status: "new",
        admin_notes: "",
        ip_hash: ip === "unknown" ? null : hashIp(ip),
        user_agent: userAgent || null,
      });

      if (error) {
        console.error("[arkan-contact] supabase insert failed");
        return NextResponse.json({ error: "Unable to save request" }, { status: 503 });
      }
    } catch {
      console.error("[arkan-contact] supabase unavailable");
      return NextResponse.json({ error: "Unable to save request" }, { status: 503 });
    }
  } else {
    console.warn("[arkan-contact] supabase env missing — request not persisted");
  }

  // Log minimal fields only — never dump full message body to shared logs.
  console.info("[arkan-contact]", {
    name: payload.name,
    email: payload.email,
    systemType: payload.systemType,
    market: payload.market,
    scale: payload.scale,
    language: payload.language,
    messageLength: payload.message.length,
    receivedAt: payload.receivedAt,
    persisted: hasSupabaseConfig(),
  });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    if (!isSafeWebhookUrl(webhook)) {
      console.error("[arkan-contact] webhook URL rejected");
    } else {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
          redirect: "error",
        });
        clearTimeout(timeout);
      } catch {
        console.error("[arkan-contact] webhook failed");
      }
    }
  }

  return NextResponse.json({ ok: true });
}
