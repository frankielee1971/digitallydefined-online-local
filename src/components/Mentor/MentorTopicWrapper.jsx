import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SiteLayout from '../Layout/SiteLayout';
import { sendToHermes, buildHermesMessage } from '../../lib/hermes';
import { useToolState } from '../../context/ToolStateContext.jsx';
import {
  buildGapPrompt,
  buildFreedomPrompt,
  buildQuizPrompt,
  buildScorecardPrompt,
  buildROIPrompt,
  buildToolsPrompt,
  buildStartHerePrompt,
  buildPricingPrompt,
  buildAutomationPrompt,
  buildContactPrompt,
  buildRoadmapPrompt
} from '../../lib/buildHermesPrompt';

const CALCULATOR_ROUTES = ['/roi', '/freedom', '/gap', '/scorecard', '/tools/calculator'];

function MentorTopicWrapper({ topic, children }) {
  const { toolState } = useToolState();
  const location = useLocation();
  const isCalculatorRoute = CALCULATOR_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );
  const wasCalculated = useRef(false);

  const promptBuilders = {
    'retirement-gap': () => buildGapPrompt(toolState),
    'freedom': () => buildFreedomPrompt(toolState),
    'quiz': () => buildQuizPrompt(toolState),
    'scorecard': () => buildScorecardPrompt(toolState),
    'roi': () => buildROIPrompt(toolState),
    'tools': () => buildToolsPrompt(),
    'start-here': () => buildStartHerePrompt(),
    'pricing': () => buildPricingPrompt(),
    'automation': () => buildAutomationPrompt(),
    'contact': () => buildContactPrompt(),
    'roadmap': () => buildRoadmapPrompt(toolState),
  };

  // Reactive Hermes trigger: fire once when toolState.hasCalculated flips to true
  useEffect(() => {
    // Only fire Hermes on calculator pages
    if (!isCalculatorRoute) return;

    if (!toolState?.hasCalculated) {
      wasCalculated.current = false;
      return;
    }

    if (wasCalculated.current) return;
    wasCalculated.current = true;

    // Determine which calculator fired
    let topic = null;
    let payload = {};

    if (toolState.gapAmount !== undefined) {
      topic = 'retirement_gap';
      payload = {
        gapAmount: toolState.gapAmount,
        monthlyNeededToClose: toolState.monthlyNeededToClose,
        desiredIncome: toolState.desiredIncome,
        currentSavings: toolState.currentSavings,
        yearsToRetirement: toolState.yearsToRetirement,
        totalMonthlyIncome: toolState.totalMonthlyIncome,
      };
    }

    if (toolState.monthlyGoal !== undefined) {
      topic = 'freedom_number';
      payload = {
        monthlyGoal: toolState.monthlyGoal,
        totalMonthlyIncome: toolState.totalMonthlyIncome,
        assetCount: toolState.assetCount,
        yieldPerAsset: toolState.yieldPerAsset,
        gap: toolState.gap,
        goalMet: toolState.goalMet,
      };
    }

    if (toolState.roiClosedLeads !== undefined) {
      topic = 'tenx_roi';
      payload = {
        roiClosedLeads: toolState.roiClosedLeads,
        roiGrossRevenue: toolState.roiGrossRevenue,
        roiMonthlyRent: toolState.roiMonthlyRent,
        roiEquityCap: toolState.roiEquityCap,
        roiPpcSpend: toolState.roiPpcSpend,
        roiSavings: toolState.roiSavings,
      };
    }

    if (toolState.nicheScore !== undefined) {
      topic = 'niche_scorecard';
      payload = {
        score: toolState.nicheScore,
        category: toolState.nicheCategory,
        inputs: toolState.nicheInputs,
      };
    }

    if (topic) {
      const message = buildHermesMessage(topic, payload);
      sendToHermes(message, {
        topic,
        toolState: payload,
        page: topic,
      }).catch((err) => {
        console.error('Reactive Hermes trigger failed:', err);
      });
    }
  }, [toolState, isCalculatorRoute]);

  const systemPrompt = promptBuilders[topic] ? promptBuilders[topic]() : null;

  return (
    <SiteLayout mentorTopic={topic} systemPrompt={systemPrompt} toolState={toolState}>
      {children}
    </SiteLayout>
  );
}

export default MentorTopicWrapper;
