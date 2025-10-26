export default function EmergencyHeader() {
  return (
    <header className="bg-red-900 border-b border-red-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              🚨 Emergency Services Dispatch Training
            </h1>
            <p className="text-red-200 text-sm mt-1">
              Simulated emergency call training for dispatchers
            </p>
          </div>
          <div className="text-right">
            <div className="text-red-200 text-sm">
              Training Session
            </div>
            <div className="text-white font-mono text-lg">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
