export interface DonationFormData {
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
}

export interface Donation {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
  transactionId: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface DonationResponse {
  success: boolean;
  message: string;
  data: {
    donationId: string;
    transactionId: string;
    amount: number;
    fullName: string;
  };
}

export interface DonationDetailResponse {
  success: boolean;
  message: string;
  data: Donation;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
}
