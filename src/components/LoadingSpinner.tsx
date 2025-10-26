export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Loading Emergency Simulation</h2>
        <p className="text-gray-400">Fetching training configuration...</p>
      </div>
    </div>
  );
}
