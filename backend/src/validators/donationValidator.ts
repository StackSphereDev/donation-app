import { body } from 'express-validator';

export const createDonationValidator = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number'),
  
  body('amount')
    .notEmpty()
    .withMessage('Donation amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .custom((value) => {
      if (value < 100) {
        throw new Error('Minimum donation amount is ₹100');
      }
      return true;
    }),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
];

export const updatePaymentStatusValidator = [
  body('paymentStatus')
    .notEmpty()
    .withMessage('Payment status is required')
    .isIn(['pending', 'success', 'failed'])
    .withMessage('Invalid payment status')
];
