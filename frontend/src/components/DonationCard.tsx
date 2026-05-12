interface DonationCardProps {
  amount: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function DonationCard({ amount, isSelected, onClick }: DonationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
        isSelected
          ? 'border-primary-600 bg-primary-50 shadow-lg'
          : 'border-gray-200 bg-white hover:border-primary-300'
      }`}
    >
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">₹{amount.toLocaleString('en-IN')}</p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">One-time donation</p>
      </div>
    </button>
  );
}
