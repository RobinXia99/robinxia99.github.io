import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [isHovering, setIsHovering] = useState(false);

  const onHover = useCallback(() => setIsHovering(true), []);
  const onLeave = useCallback(() => setIsHovering(false), []);

  return (
    <CursorContext.Provider value={{ isHovering, onHover, onLeave }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
