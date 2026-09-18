import api from "@/lib/api";

export type CompanySize =
  | "1-10"
  | "11-50"
  | "51-200"
  | "200-500"
  | "500-1000"
  | "1000+";

export const COMPANY_SIZE_OPTIONS: { value: CompanySize; label: string }[] = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "200-500", label: "200-500" },
  { value: "500-1000", label: "500-1000" },
  { value: "1000+", label: "1000+" },
];

export type MediaAsset = {
  publicId: string;
  url: string;
};

export interface UserProfile {
  id: string;
  email: string;
  role: "individual" | "organization";
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  individualProfile?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicture?: MediaAsset | string | null;
  };
  organizationProfile?: {
    organizationName: string;
    logoUrl?: MediaAsset | string | null;
    industryType: string;
    companySize: string;
    businessAddress: string;
    city: string;
    state: string;
    country: string;
    phoneNumber: string;
    primaryContactFirstName: string;
    primaryContactLastName: string;
    primaryContactJobTitle: string;
    primaryContactEmail: string;
    primaryContactPhoneNumber: string;
  };
}

export type IndividualProfileUpdate = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: File;
};

export type OrganizationProfileUpdate = {
  organizationName?: string;
  industryType?: string;
  companySize?: CompanySize | string;
  businessAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  primaryContactFirstName?: string;
  primaryContactLastName?: string;
  primaryContactJobTitle?: string;
  primaryContactEmail?: string;
  primaryContactPhoneNumber?: string;
  profilePicture?: File;
};

export type ProfileUpdatePayload =
  | IndividualProfileUpdate
  | OrganizationProfileUpdate;

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

/** Resolve Cloudinary / media URL from object or legacy string */
export function getMediaUrl(
  media: MediaAsset | string | null | undefined,
): string | null {
  if (!media) return null;
  if (typeof media === "string") {
    try {
      const parsed = JSON.parse(media) as MediaAsset;
      return parsed?.url || null;
    } catch {
      return media.startsWith("http") ? media : null;
    }
  }
  return media.url || null;
}

export function getDisplayName(user: UserProfile | null | undefined): string {
  if (!user) return "User";
  if (user.role === "organization" && user.organizationProfile) {
    return user.organizationProfile.organizationName || user.email;
  }
  if (user.role === "individual" && user.individualProfile) {
    const { firstName, lastName } = user.individualProfile;
    const full = `${firstName || ""} ${lastName || ""}`.trim();
    if (full) return full;
  }
  return user.email.split("@")[0] || "User";
}

export function getUserInitials(user: UserProfile | null | undefined): string {
  if (!user) return "U";

  if (user.role === "individual" && user.individualProfile) {
    const first = user.individualProfile.firstName?.[0] ?? "";
    const last = user.individualProfile.lastName?.[0] ?? "";
    const initials = `${first}${last}`.toUpperCase();
    if (initials) return initials;
  }

  if (
    user.role === "organization" &&
    user.organizationProfile?.organizationName
  ) {
    const words = user.organizationProfile.organizationName
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return words[0].slice(0, 2).toUpperCase();
  }

  return (user.email?.split("@")[0] ?? "U").slice(0, 2).toUpperCase();
}

/** Profile photo (individual) or logo (organization), if present */
export function getUserAvatarUrl(
  user: UserProfile | null | undefined,
): string | null {
  if (!user) return null;
  if (user.role === "individual") {
    return getMediaUrl(user.individualProfile?.profilePicture);
  }
  return getMediaUrl(user.organizationProfile?.logoUrl);
}

function appendIfPresent(
  form: FormData,
  key: string,
  value: string | File | undefined | null,
) {
  if (value === undefined || value === null || value === "") return;
  form.append(key, value);
}

export const profileService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>("/accounts/auth/me");
    return response.data;
  },

  updateProfile: async (
    data: ProfileUpdatePayload,
  ): Promise<{ message: string }> => {
    const form = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "profilePicture") {
        if (value instanceof File) {
          form.append("profilePicture", value);
        }
        return;
      }
      appendIfPresent(form, key, value as string | undefined);
    });

    const response = await api.put<{ message: string }>(
      "/accounts/auth/profile",
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  changePassword: async (
    data: ChangePasswordPayload,
  ): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(
      "/accounts/auth/change-password",
      data,
    );
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(
      "/accounts/auth/logout",
    );
    return response.data;
  },
};
