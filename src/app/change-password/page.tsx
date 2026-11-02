"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { profileService } from "@/services/profile";

function homeForRole(role?: string) {
  return role === "organization" ? "/dashboard/organization" : "/dashboard";
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [ready, setReady] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const authenticated = await checkAuth();
      if (!authenticated) {
        router.replace("/login");
        return;
      }
      const user = useAuthStore.getState().user;
      if (!user?.mustChangePassword) {
        router.replace(homeForRole(user?.role));
        return;
      }
      setReady(true);
    };
    void verify();
  }, [checkAuth, router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      const result = await profileService.changePassword({
        currentPassword,
        newPassword,
      });
      if (!result.token) {
        router.replace("/login");
        return;
      }
      await fetchUser({ silent: true });
      const user = useAuthStore.getState().user;
      router.replace(homeForRole(user?.role));
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      const message = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setError(
        status === 401
          ? "Current password is incorrect."
          : message || "Could not change the password.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1C1B2B] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#4185DD]" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8">
      <video
        className="fixed top-0 left-0 z-[-2] h-full w-full object-cover"
        src="/video/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed inset-0 z-[-1] bg-[#1C1B2B]/90" />
      <form
        onSubmit={onSubmit}
        className="glass-panel brand-border relative z-10 w-full max-w-[480px] rounded-2xl p-6 sm:p-8"
      >
        <Image src="/logos/ires-logo.svg" alt="iRES" width={48} height={48} />
        <h1 className="mt-5 text-2xl font-semibold text-white">Choose a new password</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          This account was created from an incident report. Sign-in stays locked until
          you replace the temporary password.
        </p>
        <label className="mt-6 block text-xs text-white/60">
          Temporary password
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-[var(--accent-color)]/40"
          />
        </label>
        <label className="mt-4 block text-xs text-white/60">
          New password
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-[var(--accent-color)]/40"
          />
        </label>
        <label className="mt-4 block text-xs text-white/60">
          Confirm new password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-[var(--accent-color)]/40"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="mt-6 w-full cursor-pointer rounded-lg py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: "var(--btn-bg)" }}
        >
          {saving ? "Saving..." : "Save password"}
        </button>
      </form>
    </div>
  );
}
