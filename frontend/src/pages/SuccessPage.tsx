import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Home, Download } from 'lucide-react';
import { donationService } from '../services/donationService';
import { Donation } from '../types/donation';
import Button from '../components/Button';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { donationId } = useParams<{ donationId: string }>();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      if (!donationId) {
        navigate('/');
        return;
      }

      try {
        const response = await donationService.getDonationById(donationId);
        setDonation(response.data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch donation details');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonation();
  }, [donationId, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!donation) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-6 sm:py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 sm:p-8 text-center text-white">
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Thank You!</h1>
            <p className="text-lg sm:text-xl">Your donation has been received successfully</p>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <p className="text-lg text-green-900">
                Your generous contribution will help us serve nutritious meals to pilgrims
                on their sacred Char Dham Yatra. May your kindness be blessed.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                Donation Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Donor Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {donation.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {donation.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {donation.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Donation Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{donation.amount.toLocaleString('en-IN')}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-2 rounded">
                    {donation.transactionId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {donation.paymentStatus.toUpperCase()}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(donation.createdAt)}
                  </p>
                </div>

                {donation.message && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Your Message</p>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                      {donation.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
              <p className="text-sm text-yellow-900">
                <strong>Note:</strong> A confirmation email has been sent to {donation.email}.
                Please save your transaction ID for future reference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/')}
                variant="primary"
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
              <Button
                onClick={() => window.print()}
                variant="outline"
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Print Receipt
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>Thank you for your support! 🙏</p>
        </div>
      </div>
    </div>
  );
}
