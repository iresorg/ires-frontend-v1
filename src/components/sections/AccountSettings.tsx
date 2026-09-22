"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { clearClientSession } from "@/lib/session";
import {
  COMPANY_SIZE_OPTIONS,
  getDisplayName,
  getMediaUrl,
  getUserInitials,
  profileService,
  type CompanySize,
} from "@/services/profile";
import {
  PROFILE_PHOTO_ACCEPT,
  PROFILE_PHOTO_HINT,
  validateProfilePhoto,
} from "@/lib/profilePhoto";

type Tab = "profile" | "security";

const inputClass =
  "w-full rounded-xl bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-2 focus:ring-[var(--accent-color)]/40";

const labelClass = "mb-1.5 block text-xs font-medium text-white/50";

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AccountSettings() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const [tab, setTab] = useState<Tab>("profile");
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [individualForm, setIndividualForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [orgForm, setOrgForm] = useState({
    organizationName: "",
    industryType: "",
    companySize: "" as CompanySize | "",
    businessAddress: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactJobTitle: "",
    primaryContactEmail: "",
    primaryContactPhoneNumber: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await fetchUser({ silent: true });
      if (!cancelled) setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchUser]);

  useEffect(() => {
    if (!user || file) return;

    if (user.role === "individual" && user.individualProfile) {
      setIndividualForm({
        firstName: user.individualProfile.firstName || "",
        lastName: user.individualProfile.lastName || "",
        phoneNumber: user.individualProfile.phoneNumber || "",
      });
      setPreviewUrl(getMediaUrl(user.individualProfile.profilePicture));
    }

    if (user.role === "organization" && user.organizationProfile) {
      const p = user.organizationProfile;
      setOrgForm({
        organizationName: p.organizationName || "",
        industryType: p.industryType || "",
        companySize: (p.companySize as CompanySize) || "",
        businessAddress: p.businessAddress || "",
        city: p.city || "",
        state: p.state || "",
        country: p.country || "",
        phoneNumber: p.phoneNumber || "",
        primaryContactFirstName: p.primaryContactFirstName || "",
        primaryContactLastName: p.primaryContactLastName || "",
        primaryContactJobTitle: p.primaryContactJobTitle || "",
        primaryContactEmail: p.primaryContactEmail || "",
        primaryContactPhoneNumber: p.primaryContactPhoneNumber || "",
      });
      setPreviewUrl(getMediaUrl(p.logoUrl));
    }
  }, [user, file]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (next: File | null) => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);

    if (!next) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    const result = validateProfilePhoto(next);
    if (!result.ok) {
      setFile(null);
      setPreviewUrl(null);
      setError(result.message);
      return;
    }

    setError(null);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || saving) return;
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      if (user.role === "individual") {
        await profileService.updateProfile({
          ...individualForm,
          ...(file ? { profilePicture: file } : {}),
        });
      } else {
        await profileService.updateProfile({
          ...orgForm,
          companySize: orgForm.companySize || undefined,
          ...(file ? { profilePicture: file } : {}),
        });
      }
      setFile(null);
      await fetchUser({ silent: true });
      setMessage("Profile updated successfully");
    } catch (err: unknown) {
      const apiMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update profile";
      setError(apiMessage);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordSaving) return;
    setPasswordMessage(null);
    setPasswordError(null);

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation do not match");
      return;
    }

    setPasswordSaving(true);
    try {
      await profileService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      // Server invalidates all sessions on password change
      clearUser();
      clearClientSession();
      router.push("/login");
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response
        ?.status;
      const apiMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to change password";
      setPasswordError(
        status === 401 ? "Current password is incorrect" : apiMessage,
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await profileService.logout();
    } catch {
      // Still clear local session if API fails
    }
    clearUser();
    clearClientSession();
    router.push("/");
  };

  if (!hydrated && !user) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[var(--accent-color)]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl bg-[#141327]/90 p-8 text-center text-white/60 ring-1 ring-white/10">
        Unable to load your profile.
      </div>
    );
  }

  const initials = getUserInitials(user);
  const isOrg = user.role === "organization";

  return (
    <div className="text-white">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Profile & settings
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Manage your account details and security
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {(
          [
            ["profile", "Profile"],
            ["security", "Security"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              tab === id
                ? "text-white"
                : "bg-white/5 text-white/65 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
            }`}
            style={tab === id ? { background: "var(--btn-bg)" } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="space-y-5">
          <section className="rounded-2xl bg-[#141327]/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt=""
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-2xl object-cover ring-1 ring-white/10"
                    unoptimized={previewUrl.startsWith("blob:")}
                  />
                ) : (
                  <div
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl text-lg font-semibold text-white"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {initials}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold">
                  {getDisplayName(user)}
                </p>
                <p className="truncate text-sm text-white/50">{user.email}</p>
                <p className="mt-1 text-xs capitalize text-white/40">
                  {user.role} account
                </p>
              </div>
              <div className="grid gap-1 text-xs text-white/45 sm:text-right">
                <p>Last login: {formatDate(user.lastLoginAt)}</p>
                <p>Member since: {formatDate(user.createdAt)}</p>
              </div>
            </div>
          </section>

          <form
            onSubmit={handleProfileSubmit}
            className="rounded-2xl bg-[#141327]/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:p-6"
          >
            <h2 className="mb-5 text-base font-semibold">Edit profile</h2>

            {message && (
              <p className="mb-4 rounded-xl bg-[#22C55E]/15 px-4 py-3 text-sm text-[#86EFAC] ring-1 ring-[#22C55E]/25">
                {message}
              </p>
            )}
            {error && (
              <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-500/30">
                {error}
              </p>
            )}

            <div className="mb-5">
              <label className={labelClass}>
                {isOrg ? "Organization logo" : "User profile photo"}{" "}
                <span className="font-normal text-white/35">(optional)</span>
              </label>
              <input
                type="file"
                accept={PROFILE_PHOTO_ACCEPT}
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                className="w-full rounded-xl bg-white/5 px-3 py-2.5 text-xs text-white ring-1 ring-white/10 file:mr-3 file:rounded-lg file:border-0 file:bg-white/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
              />
              <p className="mt-1.5 text-[11px] text-white/40">
                {PROFILE_PHOTO_HINT} Email cannot be changed here.
              </p>
            </div>

            {!isOrg ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>First name</label>
                  <input
                    className={inputClass}
                    value={individualForm.firstName}
                    onChange={(e) =>
                      setIndividualForm((s) => ({
                        ...s,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>Last name</label>
                  <input
                    className={inputClass}
                    value={individualForm.lastName}
                    onChange={(e) =>
                      setIndividualForm((s) => ({
                        ...s,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Phone number</label>
                  <input
                    className={inputClass}
                    value={individualForm.phoneNumber}
                    onChange={(e) =>
                      setIndividualForm((s) => ({
                        ...s,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Email</label>
                  <input
                    className={`${inputClass} cursor-not-allowed opacity-60`}
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Organization name</label>
                    <input
                      className={inputClass}
                      value={orgForm.organizationName}
                      onChange={(e) =>
                        setOrgForm((s) => ({
                          ...s,
                          organizationName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Industry</label>
                    <input
                      className={inputClass}
                      value={orgForm.industryType}
                      onChange={(e) =>
                        setOrgForm((s) => ({
                          ...s,
                          industryType: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company size</label>
                    <select
                      className={inputClass}
                      style={{ colorScheme: "dark" }}
                      value={orgForm.companySize}
                      onChange={(e) =>
                        setOrgForm((s) => ({
                          ...s,
                          companySize: e.target.value as CompanySize | "",
                        }))
                      }
                    >
                      <option value="">Select size</option>
                      {COMPANY_SIZE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Business address</label>
                    <input
                      className={inputClass}
                      value={orgForm.businessAddress}
                      onChange={(e) =>
                        setOrgForm((s) => ({
                          ...s,
                          businessAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      className={inputClass}
                      value={orgForm.city}
                      onChange={(e) =>
                        setOrgForm((s) => ({ ...s, city: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input
                      className={inputClass}
                      value={orgForm.state}
                      onChange={(e) =>
                        setOrgForm((s) => ({ ...s, state: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input
                      className={inputClass}
                      value={orgForm.country}
                      onChange={(e) =>
                        setOrgForm((s) => ({ ...s, country: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Organization phone</label>
                    <input
                      className={inputClass}
                      value={orgForm.phoneNumber}
                      onChange={(e) =>
                        setOrgForm((s) => ({
                          ...s,
                          phoneNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Account email</label>
                    <input
                      className={`${inputClass} cursor-not-allowed opacity-60`}
                      value={user.email}
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white/80">
                    Primary contact
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>First name</label>
                      <input
                        className={inputClass}
                        value={orgForm.primaryContactFirstName}
                        onChange={(e) =>
                          setOrgForm((s) => ({
                            ...s,
                            primaryContactFirstName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last name</label>
                      <input
                        className={inputClass}
                        value={orgForm.primaryContactLastName}
                        onChange={(e) =>
                          setOrgForm((s) => ({
                            ...s,
                            primaryContactLastName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Job title</label>
                      <input
                        className={inputClass}
                        value={orgForm.primaryContactJobTitle}
                        onChange={(e) =>
                          setOrgForm((s) => ({
                            ...s,
                            primaryContactJobTitle: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={orgForm.primaryContactEmail}
                        onChange={(e) =>
                          setOrgForm((s) => ({
                            ...s,
                            primaryContactEmail: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Phone</label>
                      <input
                        className={inputClass}
                        value={orgForm.primaryContactPhoneNumber}
                        onChange={(e) =>
                          setOrgForm((s) => ({
                            ...s,
                            primaryContactPhoneNumber: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--btn-bg)" }}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-5">
          <form
            onSubmit={handlePasswordSubmit}
            className="rounded-2xl bg-[#141327]/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:p-6"
          >
            <h2 className="mb-2 text-base font-semibold">Change password</h2>
            <p className="mb-5 text-sm text-white/50">
              Use at least 6 characters for your new password.{" "}
              <Link
                href="/forgot-password"
                className="text-[var(--accent-color)] hover:underline"
              >
                Forgot password instead?
              </Link>
            </p>

            {passwordMessage && (
              <p className="mb-4 rounded-xl bg-[#22C55E]/15 px-4 py-3 text-sm text-[#86EFAC] ring-1 ring-[#22C55E]/25">
                {passwordMessage}
              </p>
            )}
            {passwordError && (
              <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-500/30">
                {passwordError}
              </p>
            )}

            <div className="mx-auto grid max-w-md gap-4">
              <div>
                <label className={labelClass}>Current password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  className={inputClass}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((s) => ({
                      ...s,
                      currentPassword: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className={labelClass}>New password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  className={inputClass}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((s) => ({
                      ...s,
                      newPassword: e.target.value,
                    }))
                  }
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className={labelClass}>Confirm new password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  className={inputClass}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((s) => ({
                      ...s,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={passwordSaving}
                className="mt-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--btn-bg)" }}
              >
                {passwordSaving ? "Updating..." : "Update password"}
              </button>
            </div>
          </form>

          <section className="rounded-2xl bg-[#141327]/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:p-6">
            <h2 className="mb-2 text-base font-semibold">Sign out</h2>
            <p className="mb-4 text-sm text-white/50">
              End your session on this device.
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-500/15 px-5 py-2.5 text-sm font-medium text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500/25"
            >
              Log out
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
