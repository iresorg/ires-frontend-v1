import { z } from "zod";

export const individualRegistrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    profilePicture: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type IndividualRegistrationFormData = z.infer<
  typeof individualRegistrationSchema
>;

export const verifyEmailSchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const organizationRegistrationSchema = z
  .object({
    organizationName: z.string().min(1, "Company name is required"),
    industryType: z.string().min(1, "Business type is required"),
    companySize: z.enum(
      ["1-10", "11-50", "51-200", "200-500", "500-1000", "1000+"],
      {
        required_error: "Company size is required",
        invalid_type_error: "Please select a valid company size",
      }
    ),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Company phone number is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    businessAddress: z.string().min(1, "Business address is required"),
    primaryContactFirstName: z
      .string()
      .min(1, "Primary contact first name is required"),
    primaryContactLastName: z
      .string()
      .min(1, "Primary contact last name is required"),
    primaryContactJobTitle: z
      .string()
      .min(1, "Primary contact job title is required"),
    primaryContactEmail: z
      .string()
      .email("Invalid primary contact email address"),
    primaryContactPhoneNumber: z
      .string()
      .min(1, "Primary contact phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    profilePicture: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type OrganizationRegistrationFormData = z.infer<
  typeof organizationRegistrationSchema
>;
