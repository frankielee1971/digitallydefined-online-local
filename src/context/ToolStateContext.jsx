import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * ToolStateContext
 * Stores structured context for Hermes so it can give high‑value answers.
 *
 * This version adds:
 * - Structured channels (scorecard, quiz, roi, freedom, niche)
 * - Safe merging of nested objects
 * - Automatic timestamps
 * - A "stage" indicator for user journey
 * - A "lastAction" field so Hermes can respond naturally
 * - A "snapshot" field Hermes can use for deeper reasoning
 */

const ToolStateContext = createContext({});

export function ToolStateProvider({ children }) {
  const [toolState, setToolState] = useState({
    stage: "idle",          // where the user is in the journey
    lastAction: null,       // last meaningful user action
    snapshot: {},           // Hermes uses this for deeper reasoning
    scorecard: {},          // niche, score, recommendation, strengths, weaknesses
    quiz: {},               // persona, superpower, confidenceScore
    roi: {},                // lead flow, conversion, revenue
    freedom: {},            // income target, asset model
    niche: {},              // niche analysis results
    _lastUpdated: null
  });

  /**
   * Deep merge utility — ensures nested objects merge safely
   */
  const mergeDeep = (target, updates) => {
    const output = { ...target };
    for (const key of Object.keys(updates)) {
      if (
        typeof updates[key] === "object" &&
        updates[key] !== null &&
        !Array.isArray(updates[key])
      ) {
        output[key] = mergeDeep(target[key] || {}, updates[key]);
      } else {
        output[key] = updates[key];
      }
    }
    return output;
  };

  /**
   * updateToolState
   * Allows partial updates while preserving structure.
   */
  const updateToolState = useCallback((updates) => {
    setToolState(prev => {
      const merged = mergeDeep(prev, updates);

      return {
        ...merged,
        _lastUpdated: Date.now(),
        lastAction: updates.lastAction || prev.lastAction || null,
        snapshot: {
          ...merged.snapshot,
          updatedAt: Date.now(),
          stage: merged.stage,
          scorecard: merged.scorecard,
          quiz: merged.quiz,
          niche: merged.niche,
          roi: merged.roi,
          freedom: merged.freedom
        }
      };
    });
  }, []);

  /**
   * clearToolState
   * Resets everything except the structure.
   */
  const clearToolState = useCallback(() => {
    setToolState({
      stage: "idle",
      lastAction: null,
      snapshot: {},
      scorecard: {},
      quiz: {},
      roi: {},
      freedom: {},
      niche: {},
      _lastUpdated: Date.now()
    });
  }, []);

  /**
   * clearChannel
   * Allows clearing a specific tool (scorecard, quiz, roi, etc.)
   */
  const clearChannel = useCallback((channel) => {
    if (!toolState[channel]) return;
    setToolState(prev => ({
      ...prev,
      [channel]: {},
      _lastUpdated: Date.now(),
      lastAction: `cleared_${channel}`
    }));
  }, [toolState]);

  return (
    <ToolStateContext.Provider
      value={{
        toolState,
        updateToolState,
        clearToolState,
        clearChannel
      }}
    >
      {children}
    </ToolStateContext.Provider>
  );
}

export function useToolState() {
  return useContext(ToolStateContext);
}
