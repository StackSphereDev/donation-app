import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import DonationCard from '../components/DonationCard';

const PRESET_AMOUNTS = [501, 1100, 2100, 5100];

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleDonate = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount;
    if (amount && amount >= 100) {
      navigate('/donate', { state: { amount } });
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Divine Annadaan Seva
          </h1>
          <p className="text-xl text-gray-600">
            Nourishing the Soul of the Char Dham Yatra
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
          <div className="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <Heart className="w-20 h-20 mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-4">
                  Feed the Pilgrims, Nourish the Soul
                </h2>
                <p className="text-xl max-w-2xl mx-auto">
                  Support our mission to provide nutritious meals to thousands of pilgrims
                  on their sacred journey through the Char Dham
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-primary-50 rounded-xl">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50,000+</h3>
                <p className="text-gray-600">Pilgrims Served</p>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl">
                <Heart className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
                <p className="text-gray-600">Pure Vegetarian</p>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Daily</h3>
                <p className="text-gray-600">Fresh Meals</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Choose Your Donation Amount
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {PRESET_AMOUNTS.map((amount) => (
                  <DonationCard
                    key={amount}
                    amount={amount}
                    isSelected={selectedAmount === amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount(amount.toString());
                    }}
                  />
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount (min ₹100)"
                    className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                {customAmount && parseInt(customAmount) < 100 && (
                  <p className="mt-2 text-sm text-red-600">
                    Minimum donation amount is ₹100
                  </p>
                )}
              </div>

              <Button
                onClick={handleDonate}
                size="lg"
                className="w-full"
                disabled={
                  (!selectedAmount && !customAmount) ||
                  (!!customAmount && parseInt(customAmount) < 100)
                }
              >
                Proceed to Donate
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">About Our Mission</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Char Dham Yatra is one of the most sacred pilgrimages in Hinduism, taking devotees
            through the four holy sites of Yamunotri, Gangotri, Kedarnath, and Badrinath. This
            arduous journey through the Himalayas tests both body and spirit.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our Annadaan Seva provides nutritious, freshly prepared vegetarian meals to pilgrims,
            ensuring they have the strength and nourishment needed for their spiritual journey.
            Your donation helps us continue this sacred service of feeding those on the path to
            divine enlightenment.
          </p>
        </div>

        <footer className="text-center text-gray-600">
          <p>&copy; 2026 CharanVandan. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
