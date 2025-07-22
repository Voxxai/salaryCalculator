import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";
import {
  feedbackService,
  FeedbackData as SupabaseFeedbackData,
} from "../utils/supabase";

// Local interface that includes both Supabase and localStorage fields
interface FeedbackData extends SupabaseFeedbackData {
  timestamp?: string;
  contactEmail?: string;
}

interface FeedbackAdminProps {
  language: Language;
  onClose: () => void;
}

const FeedbackAdmin: React.FC<FeedbackAdminProps> = React.memo(
  ({ language, onClose }) => {
    const [feedback, setFeedback] = useState<FeedbackData[]>([]);
    const [filter, setFilter] = useState<
      "all" | "feature" | "bug" | "improvement" | "other"
    >("all");
    const [sortBy, setSortBy] = useState<"date" | "priority">("date");

    useEffect(() => {
      // Load feedback from Supabase and localStorage
      const loadFeedback = async () => {
        try {
          // Try to load from Supabase first
          const supabaseResult = await feedbackService.getAllFeedback();

          if (supabaseResult.data) {
            // Transform Supabase data to match our format
            const transformedData = supabaseResult.data.map(item => ({
              id: item.id,
              type: item.type,
              title: item.title,
              description: item.description,
              priority: item.priority,
              contactEmail: item.contact_email,
              timestamp: item.created_at || new Date().toISOString(),
            }));
            setFeedback(transformedData);
          } else {
            // Fallback to localStorage
            const storedFeedback = JSON.parse(
              localStorage.getItem("user_feedback") || "[]"
            );
            setFeedback(storedFeedback);
          }
        } catch (error) {
          // Fallback to localStorage
          const storedFeedback = JSON.parse(
            localStorage.getItem("user_feedback") || "[]"
          );
          setFeedback(storedFeedback);
        }
      };

      loadFeedback();
    }, []);

    // Memoize filtered and sorted feedback
    const filteredFeedback = useMemo(() => {
      return feedback
        .filter(item => filter === "all" || item.type === filter)
        .sort((a, b) => {
          if (sortBy === "date") {
            return (
              new Date(b.created_at || b.timestamp || "").getTime() -
              new Date(a.created_at || a.timestamp || "").getTime()
            );
          } else {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
        });
    }, [feedback, filter, sortBy]);

    const handleDelete = useCallback(
      async (id: number): Promise<void> => {
        try {
          // Try to delete from Supabase first
          const result = await feedbackService.deleteFeedback(id);

          if (result.success) {
            // Also update localStorage
            const updatedFeedback = feedback.filter(item => item.id !== id);
            setFeedback(updatedFeedback);
            localStorage.setItem(
              "user_feedback",
              JSON.stringify(updatedFeedback)
            );
          } else {
            // Fallback to localStorage only
            const updatedFeedback = feedback.filter(item => item.id !== id);
            setFeedback(updatedFeedback);
            localStorage.setItem(
              "user_feedback",
              JSON.stringify(updatedFeedback)
            );
          }
        } catch (error) {
          // Fallback to localStorage only
          const updatedFeedback = feedback.filter(item => item.id !== id);
          setFeedback(updatedFeedback);
          localStorage.setItem(
            "user_feedback",
            JSON.stringify(updatedFeedback)
          );
        }
      },
      [feedback]
    );

    const getPriorityColor = useCallback((priority: string): string => {
      switch (priority) {
        case "high":
          return "text-red-600 bg-red-50 border-red-200";
        case "medium":
          return "text-yellow-600 bg-yellow-50 border-yellow-200";
        case "low":
          return "text-green-600 bg-green-50 border-green-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    }, []);

    const getTypeIcon = (type: string): string => {
      switch (type) {
        case "feature":
          return "💡";
        case "bug":
          return "🐛";
        case "improvement":
          return "⚡";
        case "other":
          return "💬";
        default:
          return "📝";
      }
    };

    const formatDate = (timestamp: string): string => {
      return new Date(timestamp).toLocaleDateString(
        language === "nl" ? "nl-NL" : "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {getTranslation("feedbackAdminTitle", language)}
              </h2>
              <p className="text-gray-600 mt-1">
                {getTranslation("feedbackAdminSubtitle", language)} (
                {filteredFeedback.length})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation("filterByType", language)}
              </label>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">
                  {getTranslation("allTypes", language)}
                </option>
                <option value="feature">
                  {getTranslation("featureRequest", language)}
                </option>
                <option value="bug">
                  {getTranslation("bugReport", language)}
                </option>
                <option value="improvement">
                  {getTranslation("improvement", language)}
                </option>
                <option value="other">
                  {getTranslation("other", language)}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation("sortBy", language)}
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">
                  {getTranslation("sortByDate", language)}
                </option>
                <option value="priority">
                  {getTranslation("sortByPriority", language)}
                </option>
              </select>
            </div>
          </div>

          {/* Feedback List */}
          <div className="overflow-y-auto max-h-[60vh] space-y-4">
            {filteredFeedback.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <p className="text-gray-600">
                  {getTranslation("noFeedback", language)}
                </p>
              </div>
            ) : (
              filteredFeedback.map(item => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {getTypeIcon(item.type)}
                        </span>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {getTranslation(item.priority, language)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {formatDate(item.created_at || item.timestamp || "")}
                        </span>
                        {item.contactEmail && (
                          <span>📧 {item.contactEmail}</span>
                        )}
                        <span className="capitalize">
                          {getTranslation(
                            item.type === "feature"
                              ? "featureRequest"
                              : item.type === "bug"
                                ? "bugReport"
                                : item.type,
                            language
                          )}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => item.id && handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-4"
                      title={getTranslation("deleteFeedback", language)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={async () => {
                if (
                  window.confirm(getTranslation("clearAllFeedback", language))
                ) {
                  try {
                    // Try to clear from Supabase first
                    const result = await feedbackService.clearAllFeedback();

                    if (result.success) {
                      setFeedback([]);
                      localStorage.removeItem("user_feedback");
                    } else {
                      // Fallback to localStorage only
                      setFeedback([]);
                      localStorage.removeItem("user_feedback");
                    }
                  } catch (error) {
                    // Fallback to localStorage only
                    setFeedback([]);
                    localStorage.removeItem("user_feedback");
                  }
                }
              }}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              {getTranslation("clearAllFeedback", language)}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {getTranslation("close", language)}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FeedbackAdmin.displayName = "FeedbackAdmin";

export default FeedbackAdmin;
