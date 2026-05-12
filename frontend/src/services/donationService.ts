import { axiosInstance } from '../lib/axios';
import { 
  DonationFormData, 
  DonationResponse, 
  DonationDetailResponse 
} from '../types/donation';

export const donationService = {
  createDonation: async (data: DonationFormData): Promise<DonationResponse> => {
    const response = await axiosInstance.post<DonationResponse>(
      '/donations/create',
      data
    );
    return response.data;
  },

  getDonationById: async (id: string): Promise<DonationDetailResponse> => {
    const response = await axiosInstance.get<DonationDetailResponse>(
      `/donations/${id}`
    );
    return response.data;
  },

  updatePaymentStatus: async (
    id: string,
    status: 'pending' | 'success' | 'failed'
  ): Promise<DonationDetailResponse> => {
    const response = await axiosInstance.patch<DonationDetailResponse>(
      `/donations/${id}/payment-status`,
      { paymentStatus: status }
    );
    return response.data;
  },
};
