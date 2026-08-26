import React, { useRef, useCallback } from 'react';

/**
 * Hook to track cursor position on a card element for spotlight gradient effects.
 */
export function useSpotlight() {
  const cardRef = useRef<HTMLDivElement | HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.setProperty('--spotlight-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--spotlight-opacity', '0');
  }, []);

  return {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
  };
}
