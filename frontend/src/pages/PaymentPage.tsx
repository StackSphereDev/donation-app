import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CreditCard, Lock } from 'lucide-react';
import { donationService } from '../services/donationService';
import Button from '../components/Button';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { donationId } = useParams<{ donationId: string }>();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const donation = location.state?.donation;

  useEffect(() => {
    if (!donationId) {
      navigate('/');
    }
  }, [donationId, navigate]);

  const simulatePayment = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess && donationId) {
        await donationService.updatePaymentStatus(donationId, 'success');
        toast.success('Payment successful!');
        navigate(`/success/${donationId}`);
      } else {
        if (donationId) {
          await donationService.updatePaymentStatus(donationId, 'failed');
        }
        toast.error('Payment failed. Please try again.');
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment processing failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Payment Gateway
            </h1>
            <p className="text-gray-600">
              Secure dummy payment simulation
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Donor Name:</span>
                <span className="font-semibold text-gray-900">
                  {donation?.fullName || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Donation Amount:</span>
                <span className="font-semibold text-gray-900">
                  ₹{donation?.amount?.toLocaleString('en-IN') || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm text-gray-900">
                  {donation?.transactionId || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Dummy Payment Gateway
                </p>
                <p className="text-sm text-blue-800">
                  This is a simulated payment. Click the button below to process a dummy transaction.
                  The payment will be randomly marked as successful or failed.
                </p>
              </div>
            </div>
          </div>

          {isProcessing ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Processing Payment...
              </p>
              <p className="text-gray-600">
                Please wait while we process your transaction
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={simulatePayment}
                size="lg"
                className="w-full"
              >
                Process Dummy Payment
              </Button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
