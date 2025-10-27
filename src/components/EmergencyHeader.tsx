interface EmergencyHeaderProps {
  scenarioName?: string;
  onNewScenario?: () => void;
  onGenerateScenario?: () => void;
  isGenerating?: boolean;
}

export default function EmergencyHeader({ scenarioName, onNewScenario, onGenerateScenario, isGenerating }: EmergencyHeaderProps) {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <span className="text-xl">🚨</span>
            </div>
            <h1 className="text-md font-bold text-white">
              Scenario: <span className="font-semibold">{scenarioName}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onNewScenario}
              disabled={isGenerating}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <span>🎲</span>
              <span>New Random</span>
            </button>
            <button
              onClick={onGenerateScenario}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 flex items-center gap-1.5 shadow-lg shadow-purple-500/20"
            >
              {isGenerating ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
