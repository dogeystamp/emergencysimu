interface EmergencyHeaderProps {
  scenarioName?: string;
  onNewScenario?: () => void;
  onGenerateScenario?: () => void;
  isGenerating?: boolean;
}

export default function EmergencyHeader({ scenarioName, onNewScenario, onGenerateScenario, isGenerating }: EmergencyHeaderProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">
            Scenario: <span className="font-semibold text-blue-400">{scenarioName}</span>
          </h1>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onNewScenario}
              disabled={isGenerating}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>🎲</span>
              <span>New Random</span>
            </button>
            <button
              onClick={onGenerateScenario}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/20"
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
    </div>
  );
}
