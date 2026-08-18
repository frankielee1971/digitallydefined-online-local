import { useEffect, useRef, useCallback, useState } from 'react';
import { useToolState } from '../context/ToolStateContext.jsx';
import { sendToHermes } from '../lib/hermes.js';

/**
 * useHermesIntervention
 * 
 * Monitors user behavior and triggers proactive Hermes interventions when:
 * - User hesitates (no input for extended period)
 * - User shows frustration (rapid input changes)
 * - User gets concerning results (high gap, low score)
 * - User attempts to exit after poor results
 */
export function useHermesIntervention({ enabled = true } = {}) {
  const { toolState, updateToolState } = useToolState();
  const [intervention, setIntervention] = useState(null);
  const [hasintervened, setHasIntervened] = useState(false);
  
  const hesitationTimer = useRef(null);
  const inputHistory = useRef([]);
  const lastInputTime = useRef(Date.now());
  const interventionRef = useRef(null);
  
  // Track input churning (sign of frustration/confusion)
  const trackInput = useCallback((value, context = {}) => {
    if (!enabled) return;
    
    const now = Date.now();
    inputHistory.current.push({ value, timestamp: now, context });
    
    // Keep only last 10 inputs
    if (inputHistory.current.length > 10) {
      inputHistory.current.shift();
    }
    
    lastInputTime.current = now;
    
    // Detect rapid changes (frustration signal)
    if (inputHistory.current.length >= 5) {
      const recentChanges = inputHistory.current.slice(-5);
      const timeSpan = recentChanges[recentChanges.length - 1].timestamp - recentChanges[0].timestamp;
      
      // If 5+ changes in under 3 seconds, might be frustration
      if (timeSpan < 3000 && !hasintervened) {
        triggerIntervention('frustration', {
          message: "I notice you're adjusting the numbers quite a bit. Would you like help understanding how these calculations work?",
          context: { inputHistory: recentChanges }
        });
      }
    }
  }, [enabled, hasintervened]);
  
  // Trigger intervention
  const triggerIntervention = useCallback(async (type, data = {}) => {
    if (!enabled || hasintervened) return;
    
    setHasIntervened(true);
    
    let message = '';
    switch (type) {
      case 'hesitation':
        message = "Take your time! These calculators can seem complex at first. Would you like me to walk you through what each field means?";
        break;
      case 'frustration':
        message = data.message || "I notice you're adjusting the numbers quite a bit. Would you like help understanding how these calculations work?";
        break;
      case 'high_gap':
        message = "I see your retirement gap is higher than expected. This is actually really common, and the good news is you're addressing it now. Want to explore some strategies to close this gap?";
        break;
      case 'low_score':
        message = "Your niche score came in lower than hoped. Remember, this is just one data point! Many successful businesses started with scores in this range. Want to discuss ways to improve it or validate further?";
        break;
      case 'exit_intent':
        message = "Before you go, I noticed you haven't taken the next step yet. Can I help clarify anything about your results or suggest what to do next?";
        break;
      default:
        message = "Need help? I'm here to guide you through this.";
    }
    
    const interventionData = {
      type,
      message,
      timestamp: Date.now(),
      context: {
        ...data.context,
        toolState: toolState
      }
    };
    
    // Ask Hermes for personalized intervention message
    try {
      const hermesResponse = await sendToHermes(
        `The user needs a gentle intervention. Type: ${type}. Context: ${JSON.stringify(data.context)}. Provide a helpful, empathetic 1-2 sentence offer of assistance.`,
        { toolState, action: 'hermes.agent' }
      );
      
      if (hermesResponse?.response) {
        interventionData.message = hermesResponse.response;
      }
    } catch (err) {
      console.warn('Hermes intervention message failed, using fallback:', err);
    }
    
    setIntervention(interventionData);
    interventionRef.current = interventionData;
    
    // Auto-dismiss after 30 seconds if no action
    setTimeout(() => {
      if (interventionRef.current === interventionData) {
        setIntervention(null);
      }
    }, 30000);
  }, [enabled, hasintervened, toolState]);
  
  // Monitor for high-gap/low-score results
  useEffect(() => {
    if (!enabled || hasintervened) return;
    
    // Check retirement gap
    if (toolState.gap && toolState.gap > 100000) {
      triggerIntervention('high_gap', { 
        context: { gap: toolState.gap, monthlyGoal: toolState.monthlyGoal } 
      });
    }
    
    // Check niche score
    if (toolState.score !== undefined && toolState.score < 50 && toolState.analyzed) {
      triggerIntervention('low_score', { 
        context: { score: toolState.score, niche: toolState.niche } 
      });
    }
    
    // Check freedom gap
    if (toolState.gap && toolState.gap > 2000 && toolState.goalMet === false) {
      triggerIntervention('high_gap', { 
        context: { gap: toolState.gap, monthlyGoal: toolState.monthlyGoal, currentIncome: toolState.totalMonthlyIncome } 
      });
    }
  }, [toolState.gap, toolState.score, toolState.analyzed, toolState.goalMet, toolState.monthlyGoal, toolState.totalMonthlyIncome, enabled, hasintervened, triggerIntervention]);
  
  // Monitor hesitation
  useEffect(() => {
    if (!enabled || hasintervened) return;
    
    const checkHesitation = () => {
      const now = Date.now();
      const timeSinceLastInput = now - lastInputTime.current;
      
      // 45 seconds of no activity = hesitation
      if (timeSinceLastInput > 45000 && !interventionRef.current) {
        triggerIntervention('hesitation', {
          context: { timeInactive: Math.round(timeSinceLastInput / 1000) }
        });
      }
    };
    
    const interval = setInterval(checkHesitation, 10000);
    return () => clearInterval(interval);
  }, [enabled, hasintervened, triggerIntervention]);
  
  // Dismiss intervention
  const dismissIntervention = useCallback(() => {
    setIntervention(null);
    interventionRef.current = null;
  }, []);
  
  // Reset intervention state (for navigating between tools)
  const resetIntervention = useCallback(() => {
    setHasIntervened(false);
    setIntervention(null);
    interventionRef.current = null;
    inputHistory.current = [];
  }, []);
  
  return {
    intervention,
    triggerIntervention,
    dismissIntervention,
    resetIntervention,
    trackInput,
    hasintervened
  };
}

export default useHermesIntervention;
