import React, { useState, useEffect } from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

// Simple analytics page that only shows page views
const SimpleAnalyticsPage: React.FC<{ language: Language }> = ({
  language,
}) => {
  const [pageViews, setPageViews] = useState<number>(0);
  const [lastVisit, setLastVisit] = useState<string>("");

  useEffect(() => {
    // Load page views from localStorage
    const loadPageViews = () => {
      try {
        const views = parseInt(localStorage.getItem("page_views") || "0");
        const lastVisitTime = localStorage.getItem("last_visit") || "";

        setPageViews(views);
        setLastVisit(lastVisitTime);
      } catch (error) {
        console.error("Error loading page views:", error);
      }
    };

    loadPageViews();
  }, []);

  const clearPageViews = () => {
    if (window.confirm("Weet je zeker dat je alle page views wilt wissen?")) {
      localStorage.removeItem("page_views");
      localStorage.removeItem("last_visit");
      setPageViews(0);
      setLastVisit("");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Nooit";
    return new Date(dateString).toLocaleString("nl-NL");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Page Views
              </h1>
              <p className="text-gray-600">
                Eenvoudige statistieken van je app
              </p>
            </div>
            <button
              onClick={clearPageViews}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              🗑️ Wissen
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Views Card */}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {pageViews.toLocaleString("nl-NL")}
          </h2>
          <p className="text-lg text-gray-600 mb-6">Totaal aantal page views</p>

          {/* Last Visit */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Laatste bezoek:</p>
            <p className="text-lg font-medium text-gray-900">
              {formatDate(lastVisit)}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            ℹ️ Hoe werkt dit?
          </h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Elke keer dat iemand de app opent wordt dit geteld</li>
            <li>• Data wordt lokaal opgeslagen in je browser</li>
            <li>• Geen externe tracking of cookies</li>
            <li>• Volledig privacy-vriendelijk</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleAnalyticsPage;
