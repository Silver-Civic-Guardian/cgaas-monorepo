import ExplainerSidebar from './ExplainerSidebar';
import { useTranslation } from '../../hooks/useTranslation';

export default function DemoLayout({ children, currentStep, hasNextStep, nextStep, resetDemo }) {
  const { currentLang, changeLanguage } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-100">
      <div 
        data-testid="app-stage" 
        className="flex-1 lg:w-2/3 flex flex-col relative"
      >
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
        {children}
      </div>
      
      <div className="lg:w-1/3 h-screen sticky top-0 border-l border-gray-800">
        <ExplainerSidebar 
          currentStep={currentStep} 
          hasNextStep={hasNextStep}
          nextStep={nextStep} 
          resetDemo={resetDemo} 
        />
      </div>
    </div>
  );
}
