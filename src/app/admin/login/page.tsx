import { SubmitButton } from "@/components/admin/SubmitButton";
import { loginAction } from "../actions";

const errors: Record<string, string> = {
  invalid: "بيانات غير صالحة.",
  auth: "البريد أو كلمة المرور غير صحيحة.",
  unauthorized: "هذا الحساب غير مصرح له بالدخول.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = error ? errors[error] ?? "تعذر تسجيل الدخول." : null;

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-[var(--radius-xs)] bg-[var(--volt)] font-display text-sm font-bold text-white">
            AR
          </div>
          <div>
            <p className="tech-label text-[10px] text-[var(--signal)]">Arkan Control</p>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              دخول لوحة التحكم
            </h1>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          إدارة الطلبات، المشاريع، الفريق، النصوص، والوسائط من مكان واحد.
        </p>

        <form action={loginAction} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--muted)]">البريد</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="field-input"
              placeholder="admin@example.com"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
              كلمة المرور
            </span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              className="field-input"
            />
          </label>
          {message ? (
            <p
              className="admin-flash admin-flash--error"
              role="alert"
            >
              {message}
            </p>
          ) : null}
          <SubmitButton className="btn-primary w-full" pendingLabel="جارٍ الدخول…">
            دخول
          </SubmitButton>
        </form>
      </div>
    </main>
  );
}
