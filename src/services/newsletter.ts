import api from "@/lib/api";

export interface SubscribeNewsletterRequest {
  email: string;
}

export interface SubscribeNewsletterResponse {
  message: string;
}

export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (
    data: SubscribeNewsletterRequest
  ): Promise<SubscribeNewsletterResponse> => {
    const response = await api.post<SubscribeNewsletterResponse>(
      "/newsletter/subscribe",
      {
        email: data.email,
      }
    );
    return response.data;
  },
};

