import './App.css'
import DemoLayout from './components/layout/DemoLayout'
import ChatUI from './components/chat/ChatUI'
import Dashboard from './components/dashboard/Dashboard'
import { useDemoOrchestrator } from './hooks/useDemoOrchestrator'
import { useTranslation } from './hooks/useTranslation'

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

  const { t, currentLang, changeLanguage } = useTranslation();

  if (!activeScenarioId) {
    return (
      <div data-testid="landing-page" className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
        <div className="absolute top-4 right-4 z-50">
          <select 
            value={currentLang} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
          >
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-gray-800">{t('demoTitle')}</h1>
        <div className="flex flex-col gap-4 w-64">
          <button 
            onClick={() => startScenario('SCAM')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg w-full"
          >
            {t('scamLinkBtn')}
          </button>
          <button 
            onClick={() => startScenario('RUMOR')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded text-lg w-full"
          >
            {t('healthRumorBtn')}
          </button>
          <button 
            onClick={() => startScenario('DASHBOARD')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg w-full"
          >
            {t('adminDashboardBtn')}
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
