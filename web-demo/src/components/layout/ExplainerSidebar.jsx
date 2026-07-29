export default function ExplainerSidebar({ currentStep, hasNextStep, nextStep, resetDemo }) {
  return (
    <div 
      data-testid="explainer-sidebar" 
      className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto flex flex-col"
    >
      {currentStep ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
          <p className="text-gray-300 mb-6 flex-grow">
            {currentStep.explanation}
          </p>
          <div className="mt-auto flex gap-4">
            {hasNextStep ? (
              <button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={resetDemo}
                data-testid="back-to-menu-btn"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Back to Menu
              </button>
            )}
            <button 
              onClick={resetDemo}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Explainer Sidebar</h2>
          <p className="text-gray-300">
            Select a scenario to begin.
          </p>
        </>
      )}
    </div>
  );
}
