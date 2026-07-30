import { useTranslation } from '../../hooks/useTranslation';

export default function ExplainerSidebar({ currentStep, hasNextStep, nextStep, resetDemo }) {
  const { t } = useTranslation();

  return (
    <div 
      data-testid="explainer-sidebar" 
      className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto flex flex-col"
    >
      {currentStep ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{t(currentStep.titleKey)}</h2>
          <p className="text-gray-300 mb-6 flex-grow">
            {t(currentStep.expKey)}
          </p>
          <div className="mt-auto flex gap-4">
            {hasNextStep ? (
              <button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {t('nextStepBtn')}
              </button>
            ) : (
              <button 
                onClick={resetDemo}
                data-testid="back-to-menu-btn"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {t('backToMenuBtn')}
              </button>
            )}
            <button 
              onClick={resetDemo}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              {t('resetBtn')}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{t('explainerSidebar')}</h2>
          <p className="text-gray-300">
            {t('selectScenario')}
          </p>
        </>
      )}
    </div>
  );
}
