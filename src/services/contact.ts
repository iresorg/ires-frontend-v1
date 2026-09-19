import api from "@/lib/api";

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message?: string;
}

export const contactService = {
  /** POST /contact — public, no auth (base URL already includes /api/v1) */
  submit: async (data: ContactRequest): Promise<ContactResponse> => {
    const payload: ContactRequest = {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    };

    const phone = data.phone?.trim();
    if (phone) {
      payload.phone = phone;
    }

    const response = await api.post<ContactResponse>("/contact", payload);
    return response.data;
  },
};
