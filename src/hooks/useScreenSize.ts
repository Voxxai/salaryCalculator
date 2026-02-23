'use client';

import { useState, useEffect, useCallback } from "react";

interface ScreenSizeReturn {
  isMobile: boolean;
  isDesktop: boolean;
}

// Debounce utility function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Custom hook to detect screen size and determine layout
export const useScreenSize = (): ScreenSizeReturn => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Memoize the check function to prevent unnecessary re-renders
  const checkScreenSize = useCallback((): void => {
    // Use lg breakpoint (1024px) as the threshold
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Debounced version of checkScreenSize
  const debouncedCheckScreenSize = useCallback(debounce(checkScreenSize, 100), [
    checkScreenSize,
  ]);

  useEffect(() => {
    // Check on mount
    checkScreenSize();

    // Add event listener for window resize with debouncing
    window.addEventListener("resize", debouncedCheckScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", debouncedCheckScreenSize);
  }, [checkScreenSize, debouncedCheckScreenSize]);

  return { isMobile, isDesktop: !isMobile };
};
