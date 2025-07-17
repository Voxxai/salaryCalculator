import { useState, useEffect } from "react";

// Custom hook to detect screen size and determine layout
export const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkScreenSize = () => {
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
