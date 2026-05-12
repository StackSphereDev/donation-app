import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { donationSchema, DonationSchemaType } from '../utils/validation';
import { donationService } from '../services/donationService';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

export default function DonorForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const amount = location.state?.amount || 501;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationSchemaType>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount,
    },
  });

  const onSubmit = async (data: DonationSchemaType) => {
    setIsSubmitting(true);
    try {
      const response = await donationService.createDonation(data);
      toast.success('Donation details saved successfully!');
      navigate(`/payment/${response.data.donationId}`, {
        state: { donation: response.data },
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to save donation details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Donor Details
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please fill in your details to complete the donation
          </p>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-8">
            <p className="text-lg font-semibold text-gray-900">
              Donation Amount: <span className="text-primary-600">₹{amount.toLocaleString('en-IN')}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register('fullName')}
              error={errors.fullName?.message}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
              error={errors.email?.message}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="10-digit mobile number"
              {...register('phone')}
              error={errors.phone?.message}
              required
            />

            <input type="hidden" {...register('amount', { valueAsNumber: true })} />

            <Textarea
              label="Message (Optional)"
              placeholder="Share your thoughts or blessings..."
              rows={4}
              {...register('message')}
              error={errors.message?.message}
            />

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
