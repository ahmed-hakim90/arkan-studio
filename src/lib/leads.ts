export const LEAD_STATUSES = [
  "new",
  "seen",
  "contacted",
  "closed",
  "spam",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  system_type: string;
  market: string;
  scale: string;
  language: string;
  source_project: string | null;
  status: LeadStatus;
  admin_notes: string;
  created_at: string;
  updated_at: string;
};

export function isLeadStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}
