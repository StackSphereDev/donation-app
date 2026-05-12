interface DonationCardProps {
  amount: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function DonationCard({ amount, isSelected, onClick }: DonationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
        isSelected
          ? 'border-primary-600 bg-primary-50 shadow-lg'
          : 'border-gray-200 bg-white hover:border-primary-300'
      }`}
    >
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-900">₹{amount.toLocaleString('en-IN')}</p>
        <p className="text-sm text-gray-600 mt-2">One-time donation</p>
      </div>
    </button>
  );
}
