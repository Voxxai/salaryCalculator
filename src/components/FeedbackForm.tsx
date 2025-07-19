import React, { useState } from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";
import { feedbackService } from "../utils/supabase";

interface FeedbackFormProps {
  language: Language;
  onClose: () => void;
}

interface FeedbackData {
  type: "feature" | "bug" | "improvement" | "other";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  contactEmail?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ language, onClose }) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: "feature",
    title: "",
    description: "",
    priority: "medium",
    contactEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try to submit to Supabase first
      const result = await feedbackService.submitFeedback({
        type: feedback.type,
        title: feedback.title,
        description: feedback.description,
        priority: feedback.priority,
        contact_email: feedback.contactEmail || undefined,
      });

      if (result.success) {
        // Also store in localStorage as backup
        const existingFeedback = JSON.parse(
          localStorage.getItem("user_feedback") || "[]"
        );
        existingFeedback.push({
          ...feedback,
          timestamp: new Date().toISOString(),
          id: Date.now(),
        });
        localStorage.setItem("user_feedback", JSON.stringify(existingFeedback));

        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        // Fallback to localStorage only if Supabase fails
        console.warn("Supabase failed, using localStorage:", result.error);
        const existingFeedback = JSON.parse(
          localStorage.getItem("user_feedback") || "[]"
        );
        existingFeedback.push({
          ...feedback,
          timestamp: new Date().toISOString(),
          id: Date.now(),
        });
        localStorage.setItem("user_feedback", JSON.stringify(existingFeedback));

        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Fallback to localStorage
      const existingFeedback = JSON.parse(
        localStorage.getItem("user_feedback") || "[]"
      );
      existingFeedback.push({
        ...feedback,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      });
      localStorage.setItem("user_feedback", JSON.stringify(existingFeedback));

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof FeedbackData,
    value: string | number
  ): void => {
    setFeedback(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getTranslation("feedbackSubmitted", language)}
          </h2>
          <p className="text-gray-600">
            {getTranslation("feedbackThankYou", language)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {getTranslation("feedbackTitle", language)}
            </h2>
            <p className="text-gray-600 mt-1">
              {getTranslation("feedbackSubtitle", language)}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getTranslation("feedbackType", language)}
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  value: "feature" as const,
                  label: "featureRequest" as const,
                  icon: "💡",
                },
                {
                  value: "bug" as const,
                  label: "bugReport" as const,
                  icon: "🐛",
                },
                {
                  value: "improvement" as const,
                  label: "improvement" as const,
                  icon: "⚡",
                },
                {
                  value: "other" as const,
                  label: "other" as const,
                  icon: "💬",
                },
              ].map(type => (
                <div
                  key={type.value}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    feedback.type === type.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleInputChange("type", type.value)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {getTranslation(type.label, language)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation("feedbackTitleLabel", language)}
            </label>
            <input
              type="text"
              value={feedback.title}
              onChange={e => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={getTranslation("feedbackTitlePlaceholder", language)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation("feedbackDescription", language)}
            </label>
            <textarea
              value={feedback.description}
              onChange={e => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={getTranslation(
                "feedbackDescriptionPlaceholder",
                language
              )}
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getTranslation("feedbackPriority", language)}
            </label>
            <div className="flex space-x-3">
              {[
                {
                  value: "low" as const,
                  label: "low" as const,
                  color: "green",
                },
                {
                  value: "medium" as const,
                  label: "medium" as const,
                  color: "yellow",
                },
                {
                  value: "high" as const,
                  label: "high" as const,
                  color: "red",
                },
              ].map(priority => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => handleInputChange("priority", priority.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    feedback.priority === priority.value
                      ? `border-${priority.color}-500 bg-${priority.color}-50 text-${priority.color}-700`
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {getTranslation(priority.label, language)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Email (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation("feedbackEmail", language)} (
              {getTranslation("optional", language)})
            </label>
            <input
              type="email"
              value={feedback.contactEmail}
              onChange={e => handleInputChange("contactEmail", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={getTranslation("feedbackEmailPlaceholder", language)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {getTranslation("cancel", language)}
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting || !feedback.title || !feedback.description
              }
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {getTranslation("submitting", language)}
                </div>
              ) : (
                getTranslation("submitFeedback", language)
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
