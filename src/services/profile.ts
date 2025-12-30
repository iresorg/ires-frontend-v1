import api from "@/lib/api";

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
    profilePicture: string;
  };
  organizationProfile?: {
    organizationName: string;
    logoUrl: string;
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

export const profileService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>("/accounts/auth/me");
    return response.data;
  },
};
