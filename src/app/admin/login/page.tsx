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
    <main className="mx-auto flex min-h-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-sm text-[var(--muted)]">Arkan Control</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        لوحة الطلبات
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        سجّل الدخول لمراجعة طلبات العرض والمشاريع.
      </p>

      <form action={loginAction} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm text-[var(--muted)]">البريد</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="field-input"
            defaultValue="ahmedabdulhakim90@gmail.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-[var(--muted)]">كلمة المرور</span>
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
          <p className="text-sm text-[var(--danger)]" role="alert">
            {message}
          </p>
        ) : null}
        <button type="submit" className="btn-primary w-full">
          دخول
        </button>
      </form>
    </main>
  );
}
