import ExplainerSidebar from './ExplainerSidebar';

export default function DemoLayout({ children, currentStep, hasNextStep, nextStep, resetDemo }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-100">
      <div 
        data-testid="app-stage" 
        className="flex-1 lg:w-2/3 flex flex-col relative"
      >
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
