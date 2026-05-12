import { z } from 'zod';

export const donationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please provide a valid email address')
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian phone number')
    .trim(),
  amount: z
    .number()
    .min(100, 'Minimum donation amount is ₹100')
    .positive('Amount must be positive'),
  message: z
    .string()
    .max(500, 'Message cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

export type DonationSchemaType = z.infer<typeof donationSchema>;
