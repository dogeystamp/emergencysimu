export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-transparent border-l-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-b-transparent border-r-transparent border-purple-500 rounded-full animate-spin-reverse">
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🚨</span>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Loading Emergency Simulation
        </h2>
        <p className="text-slate-400">Preparing your training environment...</p>
      </div>
    </div>
  );
}
