interface EmergencyHeaderProps {
  scenarioName?: string;
  onNewScenario?: () => void;
}

export default function EmergencyHeader({ scenarioName, onNewScenario }: EmergencyHeaderProps) {
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
            {scenarioName && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="bg-red-800 text-red-100 px-3 py-1 rounded-full text-xs font-medium">
                  📋 Scenario: {scenarioName}
                </span>
                {onNewScenario && (
                  <button
                    onClick={onNewScenario}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  >
                    🎲 New Scenario
                  </button>
                )}
              </div>
            )}
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
