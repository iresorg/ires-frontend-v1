export const PROFILE_PHOTO_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const PROFILE_PHOTO_MAX_MB = 10;

export const PROFILE_PHOTO_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type ProfilePhotoMimeType = (typeof PROFILE_PHOTO_MIME_TYPES)[number];

/** Value for `<input accept="...">` */
export const PROFILE_PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

export const PROFILE_PHOTO_TYPE_LABEL = "JPEG, PNG, or WebP";

export const PROFILE_PHOTO_HINT = `Optional. ${PROFILE_PHOTO_TYPE_LABEL}. Max ${PROFILE_PHOTO_MAX_MB} MB.`;

export function isAllowedProfilePhotoType(type: string): type is ProfilePhotoMimeType {
  return (PROFILE_PHOTO_MIME_TYPES as readonly string[]).includes(type);
}

export function getFileFromInput(value: unknown): File | undefined {
  if (value instanceof File) return value;
  if (typeof FileList !== "undefined" && value instanceof FileList && value.length > 0) {
    return value[0];
  }
  return undefined;
}

export type ProfilePhotoValidation =
  | { ok: true; file?: File }
  | { ok: false; message: string };

export function validateProfilePhoto(
  file: File | null | undefined,
): ProfilePhotoValidation {
  if (!file) return { ok: true };

  if (!isAllowedProfilePhotoType(file.type)) {
    return {
      ok: false,
      message: `Only ${PROFILE_PHOTO_TYPE_LABEL} images are allowed.`,
    };
  }

  if (file.size > PROFILE_PHOTO_MAX_BYTES) {
    return {
      ok: false,
      message: `Image must be ${PROFILE_PHOTO_MAX_MB} MB or smaller.`,
    };
  }

  return { ok: true, file };
}

/** Zod-friendly check for File / FileList fields from react-hook-form. */
export function validateProfilePhotoInput(value: unknown): ProfilePhotoValidation {
  return validateProfilePhoto(getFileFromInput(value));
}
