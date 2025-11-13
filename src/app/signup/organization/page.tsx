"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { organizationRegistrationSchema, type OrganizationRegistrationFormData } from "@/validation/auth";
import { authService } from "@/services/auth";
import type { AxiosError } from "axios";
// import ErrorToast from "@/components/sections/ErrorToast";
import CustomSelect from "@/components/ui/CustomSelect";

const countries = [
  { name: "Nigeria", code: "+234", flag: "/images/nigeria-flag.png" },
  { name: "Ghana", code: "+233", flag: "/images/ghana-flag.png" },
  { name: "United States", code: "+1", flag: "/images/usa-flag.png" },
  { name: "United Kingdom", code: "+44", flag: "/images/uk-flag.png" },
];

export default function OrganizationSignup() {
  const router = useRouter();

  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Phone number states
  const [companyCountry, setCompanyCountry] = useState(countries[0]);
  const [companyCountryDropdownOpen, setCompanyCountryDropdownOpen] = useState(false);
  const [primaryContactCountry, setPrimaryContactCountry] = useState(countries[0]);
  const [primaryContactCountryDropdownOpen, setPrimaryContactCountryDropdownOpen] = useState(false);

  const industryTypeOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Education", label: "Education" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Retail", label: "Retail" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Construction", label: "Construction" },
    { value: "Transportation", label: "Transportation" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Energy", label: "Energy" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Consulting", label: "Consulting" },
    { value: "Non-profit", label: "Non-profit" },
    { value: "Government", label: "Government" },
    { value: "Media & Entertainment", label: "Media & Entertainment" },
    { value: "Telecommunications", label: "Telecommunications" },
    { value: "Food & Beverage", label: "Food & Beverage" },
    { value: "Legal Services", label: "Legal Services" },
    { value: "Others", label: "Others" },
  ];

  const companySizeOptions = [
    { value: "1-10", label: "1-10" },
    { value: "11-50", label: "11-50" },
    { value: "51-200", label: "51-200" },
    { value: "200-500", label: "200-500" },
    { value: "500-1000", label: "500-1000" },
    { value: "1000+", label: "1000+" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OrganizationRegistrationFormData>({
    resolver: zodResolver(organizationRegistrationSchema),
  });

  const handleFileChange = (file: File) => {
    if (file) {
      setFileName(file.name);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const onSubmit = async (data: OrganizationRegistrationFormData) => {
    setIsSubmitting(true);
    setToastType(null);
    try {
      // Combine country code with phone numbers
      const phoneNumber = `${companyCountry.code}${data.phoneNumber}`;
      const primaryContactPhoneNumber = `${primaryContactCountry.code}${data.primaryContactPhoneNumber}`;

      // Handle file input - react-hook-form returns FileList
      let profilePicture: File | undefined;
      if (data.profilePicture) {
        if (data.profilePicture instanceof FileList && data.profilePicture.length > 0) {
          profilePicture = data.profilePicture[0];
        } else if (data.profilePicture instanceof File) {
          profilePicture = data.profilePicture;
        }
      }

      const result = await authService.registerOrganization({
        email: data.email,
        password: data.password,
        role: "organization",
        organizationName: data.organizationName,
        industryType: data.industryType,
        companySize: data.companySize,
        businessAddress: data.businessAddress,
        city: data.city,
        state: data.state,
        country: data.country,
        phoneNumber,
        primaryContactFirstName: data.primaryContactFirstName,
        primaryContactLastName: data.primaryContactLastName,
        primaryContactJobTitle: data.primaryContactJobTitle,
        primaryContactEmail: data.primaryContactEmail,
        primaryContactPhoneNumber,
        profilePicture,
      });

      // Redirect to verify email page with account ID and email
      if (result?.id) {
        router.replace(`/signup/verify-email?accountId=${result.id}&email=${encodeURIComponent(data.email)}`);
      } else {
        router.replace(`/signup/verify-email?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Registration failed. Please try again.";
      setToastMessage(errorMessage);
      setToastType("error");
      setTimeout(() => setToastType(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/*  Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        src="/video/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/*  Fallback Image */}
      <Image
        src="/images/welcome-signup.png"
        alt="Background"
        fill
        className="object-cover z-[-3]"
        priority
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-[#1C1B2B]/90 z-[-1]" />

   
      {/* Signup Card */}
      <div
        className="relative z-10 w-[800px] p-4 rounded-2xl bg-transparent mt-20 mb-2"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Logo */}
        <div className="flex justify-between items-start">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
          <Link href="/signup" aria-label="Close" className="w-6 h-6">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
            />
          </Link>
        </div>

        {/* Main content */}
        <motion.h2
          className="text-2xl font-bold mb-1 bg-clip-text text-transparent text-center -mt-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
            backgroundSize: "200% auto",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          Sign up
        </motion.h2>
        <p className="text-white text-center text-sm mb-4">
          Enter your details below to create an account and get started
        </p>

        {/* Signup Form */}
        <form className="space-y-2 text-xs" onSubmit={handleSubmit(onSubmit)}>
          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <input
                type="text"
                placeholder="Company Name |"
                {...register("organizationName")}
                className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.organizationName && (
                <p className="text-red-500 text-[10px] mt-1">{errors.organizationName.message}</p>
              )}
            </div>
            <CustomSelect
              options={industryTypeOptions}
              placeholder="Business Type"
              register={register("industryType")}
              error={errors.industryType?.message}
              control={control}
            />

            <CustomSelect
              options={companySizeOptions}
              placeholder="Company Size"
              register={register("companySize")}
              error={errors.companySize?.message}
              label="(Numbers of employees?)"
              control={control}
            />
          </div>

          {/*Company Email & Telephone*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center bg-gray-700/40 rounded-lg px-4 py-2">
              <Image
                src="/images/comp_email.svg"
                alt="Company Email"
                width={20}
                height={20}
                className="mr-2"
              />
              <input
                type="email"
                placeholder="Company Email"
                {...register("email")}
                className="bg-transparent w-full text-gray-500 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>
            )}
            {/* Telephone Input */}
            <div className="relative">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-3">
                <div
                  className="flex items-center gap-[4px] cursor-pointer select-none"
                  onClick={() => setCompanyCountryDropdownOpen(!companyCountryDropdownOpen)}
                >
                  <Image
                    src={companyCountry.flag}
                    alt={companyCountry.name}
                    width={20}
                    height={14}
                    className="rounded-sm"
                  />
                  <Image
                    src="/images/dropdown.png"
                    alt="Dropdown"
                    width={16}
                    height={16}
                    className={`transition-transform ${companyCountryDropdownOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
                <input
                  type="tel"
                  placeholder={`${companyCountry.code} 910 000 0000`}
                  {...register("phoneNumber")}
                  className="bg-transparent w-full text-white placeholder-white/60 outline-none ml-1"
                />
              </div>
              {companyCountryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => {
                        setCompanyCountry(country);
                        setCompanyCountryDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 cursor-pointer"
                    >
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={18}
                        height={12}
                        className="rounded-sm"
                      />
                      <span className="text-white text-sm">{country.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {errors.phoneNumber && (
                <p className="text-red-500 text-[10px] mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          {/* Location Input */}
          <div>
            <label
              htmlFor="company-Location"
              className="block text-gray-500 text-[12px] mt-2 mb-2"
            >
              Company Location
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="City |"
                  {...register("city")}
                  className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.city && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.city.message}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="State |"
                  {...register("state")}
                  className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.state && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.state.message}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Country |"
                  {...register("country")}
                  className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.country && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.country.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="(Street / area / lga address) |"
                  {...register("businessAddress")}
                  className="w-full mt-3 bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.businessAddress && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.businessAddress.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Primary Contact Person */}
          <div>
            <div>
              <label className="block text-gray-500 mt-2 mb-2">
                Primary Contact Person
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name |"
                  {...register("primaryContactFirstName")}
                  className="bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.primaryContactFirstName && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.primaryContactFirstName.message}</p>
                )}
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Last Name |"
                  {...register("primaryContactLastName")}
                  className="bg-gray-700/40 w-full text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.primaryContactLastName && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.primaryContactLastName.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Job Title"
                  {...register("primaryContactJobTitle")}
                  className="bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.primaryContactJobTitle && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.primaryContactJobTitle.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <input
                  type="email"
                  placeholder="Email |"
                  {...register("primaryContactEmail")}
                  className="bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.primaryContactEmail && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.primaryContactEmail.message}</p>
                )}
              </div>
              <div className="relative">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-3">
                  <div
                    className="flex items-center gap-[4px] cursor-pointer select-none"
                    onClick={() => setPrimaryContactCountryDropdownOpen(!primaryContactCountryDropdownOpen)}
                  >
                    <Image
                      src={primaryContactCountry.flag}
                      alt={primaryContactCountry.name}
                      width={20}
                      height={14}
                      className="rounded-sm"
                    />
                    <Image
                      src="/images/dropdown.png"
                      alt="Dropdown"
                      width={16}
                      height={16}
                      className={`transition-transform ${primaryContactCountryDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder={`${primaryContactCountry.code} 910 000 0000`}
                    {...register("primaryContactPhoneNumber")}
                    className="bg-transparent w-full text-white placeholder-white/60 outline-none ml-1"
                  />
                </div>
                {primaryContactCountryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        onClick={() => {
                          setPrimaryContactCountry(country);
                          setPrimaryContactCountryDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 cursor-pointer"
                      >
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={18}
                          height={12}
                          className="rounded-sm"
                        />
                        <span className="text-white text-sm">{country.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {errors.primaryContactPhoneNumber && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.primaryContactPhoneNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Logo and Password */}
          <label
            htmlFor="company-logo"
            className="block text-gray-500 text-md mt-2 mb-2"
          >
            Upload your company logo
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div
              className="bg-gray-700/40 rounded-lg border-[2px] border-dashed"
              style={{
                borderImage:
                  "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
                borderImageSlice: 1,
                borderStyle: isDragging ? "dashed" : "solid",
              }}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <Image
                  src="/images/upload.svg"
                  alt="Upload Icon"
                  width={70}
                  height={70}
                />
                <label htmlFor="dropzone-file" className="space-y-3">
                  {fileName ? (
                    <p className="text-sm text-gray-300 text-center">
                      {fileName}
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold italic underline decoration-blue-500 decoration-4">
                        Click to upload
                      </span>{" "}
                      or drag and drop{" "}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    Max file size: 15MB
                  </p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...register("profilePicture")}
                    onChange={(e) => {
                      handleInputChange(e);
                      register("profilePicture").onChange(e);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Password Section */}
            <div className="flex flex-col items-center space-y-2">
              {/* Password Input */}
              <div className="w-full">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
                  <Image
                    src="/images/locker.png"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    className="bg-transparent w-full text-white placeholder-white/60 outline-none"
                  />
                  <Image
                    src={
                      showPassword
                        ? "/images/eye-opened.png"
                        : "/images/eye-closed.png"
                    }
                    alt="Toggle password visibility"
                    width={18}
                    height={18}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="w-full">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
                  <Image
                    src="/images/locker.png"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className="bg-transparent w-full text-white placeholder-white/60 outline-none"
                  />
                  <Image
                    src={
                      showConfirmPassword
                        ? "/images/eye-opened.png"
                        : "/images/eye-closed.png"
                    }
                    alt="Toggle password visibility"
                    width={18}
                    height={18}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <p className="text-[8px] text-gray-500 text-center leading-snug">
                (Keep your account safe, tight and unique by using a combination
                of uppercase & lowercase letters, symbols and numbers)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-[60%] py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-white/80">
          Already have an account?
          <Link href="/login" className="hover:underline">
            <motion.span
              className="font-semibold bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                backgroundSize: "200% auto",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              Log in
            </motion.span>
          </Link>
        </p>
      </div>
    </div>
  );
}
