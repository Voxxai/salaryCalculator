import React, { useEffect } from "react";

// Simple analytics component that only tracks page views
const SimpleAnalytics: React.FC = () => {
  useEffect(() => {
    // Track page view when component mounts
    const trackPageView = () => {
      try {
        // Get existing page views
        const pageViews = parseInt(localStorage.getItem("page_views") || "0");

        // Increment page views
        const newPageViews = pageViews + 1;

        // Save back to localStorage
        localStorage.setItem("page_views", newPageViews.toString());

        // Also save timestamp of last visit
        localStorage.setItem("last_visit", new Date().toISOString());

        console.log("📊 Page view tracked:", newPageViews);
      } catch (error) {
        console.error("Analytics error:", error);
      }
    };

    trackPageView();
  }, []);

  return null; // This component doesn't render anything
};

export default SimpleAnalytics;
