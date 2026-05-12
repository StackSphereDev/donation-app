import { Router } from 'express';
import {
  createDonation,
  getDonationById,
  updatePaymentStatus,
  getAllDonations
} from '../controllers/donationController';
import {
  createDonationValidator,
  updatePaymentStatusValidator
} from '../validators/donationValidator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.post(
  '/create',
  createDonationValidator,
  validateRequest,
  createDonation
);

router.get('/:id', getDonationById);

router.patch(
  '/:id/payment-status',
  updatePaymentStatusValidator,
  validateRequest,
  updatePaymentStatus
);

router.get('/', getAllDonations);

export default router;
