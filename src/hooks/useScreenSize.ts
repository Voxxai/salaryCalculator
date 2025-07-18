import { useState, useEffect } from "react";

interface ScreenSizeReturn {
  isMobile: boolean;
  isDesktop: boolean;
}

// Custom hook to detect screen size and determine layout
export const useScreenSize = (): ScreenSizeReturn => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkScreenSize = (): void => {
      // Use lg breakpoint (1024px) as the threshold
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile, isDesktop: !isMobile };
};
