import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [isHovering, setIsHovering] = useState(false);

  const onHover = useCallback(() => setIsHovering(true), []);
  const onLeave = useCallback(() => setIsHovering(false), []);

  const value = useMemo(() => ({ isHovering, onHover, onLeave }), [isHovering, onHover, onLeave]);

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
