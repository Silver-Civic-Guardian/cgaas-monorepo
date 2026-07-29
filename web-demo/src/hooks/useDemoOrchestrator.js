import { useState, useCallback, useMemo } from 'react';
import { SCENARIOS } from '../config/scenarios';

export function useDemoOrchestrator() {
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [appState, setAppState] = useState(null);

  const currentScenario = useMemo(() => {
    if (!activeScenarioId) return null;
    return SCENARIOS[activeScenarioId];
  }, [activeScenarioId]);

  const currentStep = useMemo(() => {
    if (!currentScenario || !currentScenario.steps) return null;
    return currentScenario.steps[currentStepIndex] || null;
  }, [currentScenario, currentStepIndex]);

  const startScenario = useCallback((scenarioId) => {
    const scenario = SCENARIOS[scenarioId];
    if (scenario && scenario.steps && scenario.steps.length > 0) {
      setActiveScenarioId(scenarioId);
      setCurrentStepIndex(0);
      setAppState(scenario.steps[0].uiState);
    } else {
      console.error(`Scenario ${scenarioId} not found or has no steps.`);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (!currentScenario) return;
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < currentScenario.steps.length) {
      setCurrentStepIndex(nextIndex);
      setAppState(currentScenario.steps[nextIndex].uiState);
    } else {
      console.log('Scenario finished');
    }
  }, [currentScenario, currentStepIndex]);

  const resetDemo = useCallback(() => {
    setActiveScenarioId(null);
    setCurrentStepIndex(0);
    setAppState(null);
  }, []);

  const hasNextStep = useMemo(() => {
    if (!currentScenario || !currentScenario.steps) return false;
    return currentStepIndex < currentScenario.steps.length - 1;
  }, [currentScenario, currentStepIndex]);

  return {
    activeScenarioId,
    currentStepIndex,
    appState,
    currentScenario,
    currentStep,
    hasNextStep,
    startScenario,
    nextStep,
    resetDemo
  };
}
