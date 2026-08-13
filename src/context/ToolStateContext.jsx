import React, { createContext, useContext, useState, useCallback } from 'react';

const ToolStateContext = createContext({});

export function ToolStateProvider({ children }) {
  const [toolState, setToolState] = useState({});

  const updateToolState = useCallback((updates) => {
    setToolState(prev => ({
      ...prev,
      ...updates,
      _lastUpdated: Date.now(),
    }));
  }, []);

  const clearToolState = useCallback(() => {
    setToolState({});
  }, []);

  return (
    <ToolStateContext.Provider value={{ toolState, updateToolState, clearToolState }}>
      {children}
    </ToolStateContext.Provider>
  );
}

export function useToolState() {
  return useContext(ToolStateContext);
}
