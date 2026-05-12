import { Request, Response, NextFunction } from 'express';
import { Donation } from '../models/Donation';
import { generateTransactionId } from '../utils/generateTransactionId';
import { ApiResponse } from '../utils/apiResponse';

export const createDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fullName, email, phone, amount, message } = req.body;

    const transactionId = generateTransactionId();

    const donation = await Donation.create({
      fullName,
      email,
      phone,
      amount,
      message,
      transactionId,
      paymentStatus: 'pending'
    });

    ApiResponse.success(
      res,
      {
        donationId: donation._id,
        transactionId: donation.transactionId,
        amount: donation.amount,
        fullName: donation.fullName
      },
      'Donation created successfully',
      201
    );
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      ApiResponse.error(res, 'Validation failed', 400, error.errors);
    } else {
      next(error);
    }
  }
};

export const getDonationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const donation = await Donation.findById(id);

    if (!donation) {
      ApiResponse.error(res, 'Donation not found', 404);
      return;
    }

    ApiResponse.success(res, donation, 'Donation retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!donation) {
      ApiResponse.error(res, 'Donation not found', 404);
      return;
    }

    ApiResponse.success(res, donation, 'Payment status updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getAllDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments();

    ApiResponse.success(res, {
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Donations retrieved successfully');
  } catch (error) {
    next(error);
  }
};
