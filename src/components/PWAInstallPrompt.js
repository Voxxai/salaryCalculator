import React, { useState, useEffect } from "react";
import { getTranslation } from "../utils/translations";

// PWA Install Prompt component
const PWAInstallPrompt = ({ language }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt
      setShowInstallPrompt(true);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-3 sm:p-4 rounded-lg shadow-lg z-50 safe-area-bottom">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-xl sm:text-2xl">📱</div>
          <div>
            <p className="text-sm sm:text-base font-medium">
              {language === "nl" ? "Installeer de app" : "Install the app"}
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              {language === "nl"
                ? "Voeg toe aan je startscherm voor snelle toegang"
                : "Add to your home screen for quick access"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={handleInstallClick}
            className="px-3 sm:px-4 py-2 bg-white text-blue-600 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors touch-target"
          >
            {language === "nl" ? "Installeren" : "Install"}
          </button>
          <button
            onClick={handleDismiss}
            className="px-2 sm:px-3 py-2 text-white opacity-70 hover:opacity-100 transition-opacity touch-target"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
