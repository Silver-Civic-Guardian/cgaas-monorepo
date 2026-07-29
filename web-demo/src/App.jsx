import './App.css'
import DemoLayout from './components/layout/DemoLayout'
import ChatUI from './components/chat/ChatUI'
import Dashboard from './components/dashboard/Dashboard'
import { useDemoOrchestrator } from './hooks/useDemoOrchestrator'

function App() {
  const {
    activeScenarioId,
    appState,
    currentStep,
    hasNextStep,
    startScenario,
    nextStep,
    resetDemo
  } = useDemoOrchestrator();

  if (!activeScenarioId) {
    return (
      <div data-testid="landing-page" className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Civic Guardian Demo</h1>
        <div className="flex flex-col gap-4 w-64">
          <button 
            onClick={() => startScenario('SCAM')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg w-full"
          >
            The Scam Link
          </button>
          <button 
            onClick={() => startScenario('RUMOR')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded text-lg w-full"
          >
            The Health Rumor
          </button>
          <button 
            onClick={() => startScenario('DASHBOARD')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg w-full"
          >
            The Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <DemoLayout 
      currentStep={currentStep} 
      hasNextStep={hasNextStep}
      nextStep={nextStep} 
      resetDemo={resetDemo}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {activeScenarioId === 'DASHBOARD' ? (
          <Dashboard {...(appState || {})} />
        ) : (
          <ChatUI {...(appState || {})} />
        )}
      </div>
    </DemoLayout>
  )
}

export default App
