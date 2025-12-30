import api, { setCookie } from "@/lib/api";
import { profileService } from "@/services/profile";
import { useAuthStore } from "@/store/auth";

export interface RegisterIndividualData {
  email: string;
  password: string;
  role: "individual";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture?: File;
}

export interface RegisterOrganizationData {
  email: string;
  password: string;
  role: "organization";
  organizationName: string;
  industryType: string;
  companySize: "1-10" | "11-50" | "51-200" | "200-500" | "500-1000" | "1000+";
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
  profilePicture?: File;
}

export interface RegisterResponse {
  id: string;
  email: string;
  role: string;
}

export interface VerifyEmailData {
  accountId: string;
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  verified: boolean;
}

export interface ResendOtpData {
  email: string;
}

export interface ResendOtpResponse {
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const authService = {
  registerIndividual: async (
    data: RegisterIndividualData
  ): Promise<RegisterResponse> => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phoneNumber", data.phoneNumber);

    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    const response = await api.post<RegisterResponse>(
      "/accounts/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const responseData = response.data;

    return responseData;
  },

  registerOrganization: async (
    data: RegisterOrganizationData
  ): Promise<RegisterResponse> => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("organizationName", data.organizationName);
    formData.append("industryType", data.industryType);
    formData.append("companySize", data.companySize);
    formData.append("businessAddress", data.businessAddress);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("primaryContactFirstName", data.primaryContactFirstName);
    formData.append("primaryContactLastName", data.primaryContactLastName);
    formData.append("primaryContactJobTitle", data.primaryContactJobTitle);
    formData.append("primaryContactEmail", data.primaryContactEmail);
    formData.append(
      "primaryContactPhoneNumber",
      data.primaryContactPhoneNumber
    );

    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    const response = await api.post<RegisterResponse>(
      "/accounts/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // The API returns the data directly in response.data
    // Response structure: { id, email, role }
    const responseData = response.data;

    return responseData;
  },

  verifyEmail: async (data: VerifyEmailData): Promise<VerifyEmailResponse> => {
    const response = await api.post<VerifyEmailResponse>(
      "/accounts/auth/verify-email",
      {
        accountId: data.accountId,
        email: data.email,
        otp: data.otp,
      }
    );

    return response.data;
  },

  resendOtp: async (data: ResendOtpData): Promise<ResendOtpResponse> => {
    const response = await api.post<ResendOtpResponse>(
      "/accounts/auth/resend-otp",
      {
        email: data.email,
      }
    );

    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/accounts/auth/login", {
      email: data.email,
      password: data.password,
    });

    // Save token to cookies
    if (response.data.token) {
      setCookie("auth_token", response.data.token);

      // Fetch user profile after login
      try {
        const user = await profileService.getCurrentUser();
        useAuthStore.getState().setUser(user);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }

    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordData
  ): Promise<ForgotPasswordResponse> => {
    const response = await api.post<ForgotPasswordResponse>(
      "/accounts/auth/forgot-password",
      {
        email: data.email,
      }
    );

    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordData
  ): Promise<ResetPasswordResponse> => {
    const response = await api.post<ResetPasswordResponse>(
      "/accounts/auth/reset-password",
      {
        email: data.email,
        token: data.token,
        newPassword: data.newPassword,
      }
    );

    return response.data;
  },
};
