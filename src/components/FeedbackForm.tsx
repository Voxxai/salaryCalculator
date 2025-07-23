import React, { useState } from "react";
import { getTranslation } from "../utils/translations";
import { feedbackService } from "../utils/supabase";
import { Language } from "../types";

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

// Rate limiting utility
const RATE_LIMIT_KEY = "feedback_rate_limit";
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3; // Max 3 submissions per minute

const checkRateLimit = (): boolean => {
  const now = Date.now();
  const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);

  if (!rateLimitData) {
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ count: 1, firstSubmission: now })
    );
    return true;
  }

  const { count, firstSubmission } = JSON.parse(rateLimitData);

  // Reset if window has passed
  if (now - firstSubmission > RATE_LIMIT_WINDOW) {
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ count: 1, firstSubmission: now })
    );
    return true;
  }

  // Check if limit exceeded
  if (count >= MAX_SUBMISSIONS) {
    return false;
  }

  // Increment count
  localStorage.setItem(
    RATE_LIMIT_KEY,
    JSON.stringify({ count: count + 1, firstSubmission })
  );
  return true;
};

const FeedbackForm: React.FC<FeedbackFormProps> = React.memo(
  ({ language, onClose }) => {
    const [feedback, setFeedback] = useState<FeedbackData>({
      type: "feature",
      title: "",
      description: "",
      priority: "medium",
      contactEmail: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      setError("");

      // Check rate limit
      if (!checkRateLimit()) {
        setError(
          "Too many submissions. Please wait a minute before trying again."
        );
        return;
      }

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
          localStorage.setItem(
            "user_feedback",
            JSON.stringify(existingFeedback)
          );

          setIsSubmitted(true);
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          // Fallback to localStorage only if Supabase fails
          const existingFeedback = JSON.parse(
            localStorage.getItem("user_feedback") || "[]"
          );
          existingFeedback.push({
            ...feedback,
            timestamp: new Date().toISOString(),
            id: Date.now(),
          });
          localStorage.setItem(
            "user_feedback",
            JSON.stringify(existingFeedback)
          );

          setIsSubmitted(true);
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } catch (error) {
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
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
      >
        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                id="feedback-title"
                className="text-2xl font-bold text-gray-900"
              >
                {getTranslation("feedbackTitle", language)}
              </h2>
              <p className="text-gray-600 mt-1">
                {getTranslation("feedbackSubtitle", language)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close feedback form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                {getTranslation("feedbackType", language)}
              </legend>
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
                  <button
                    key={type.value}
                    type="button"
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      feedback.type === type.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleInputChange("type", type.value)}
                    aria-pressed={feedback.type === type.value}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1" aria-hidden="true">
                        {type.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {getTranslation(type.label, language)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Title */}
            <div>
              <label
                htmlFor="feedback-title-input"
                className="block text-sm font-medium text-gray-700 mb-2 text-center"
              >
                {getTranslation("feedbackTitleLabel", language)}
              </label>
              <div className="flex justify-center">
                <input
                  id="feedback-title-input"
                  type="text"
                  value={feedback.title}
                  onChange={e => handleInputChange("title", e.target.value)}
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={getTranslation(
                    "feedbackTitlePlaceholder",
                    language
                  )}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="feedback-description"
                className="block text-sm font-medium text-gray-700 mb-2 text-center"
              >
                {getTranslation("feedbackDescription", language)}
              </label>
              <div className="flex justify-center">
                <textarea
                  id="feedback-description"
                  value={feedback.description}
                  onChange={e =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={getTranslation(
                    "feedbackDescriptionPlaceholder",
                    language
                  )}
                  required
                />
              </div>
            </div>

            {/* Priority */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-3 text-center">
                {getTranslation("feedbackPriority", language)}
              </legend>
              <div className="flex justify-center space-x-3">
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
                    onClick={() =>
                      handleInputChange("priority", priority.value)
                    }
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      feedback.priority === priority.value
                        ? `border-${priority.color}-500 bg-${priority.color}-50 text-${priority.color}-700`
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                    aria-pressed={feedback.priority === priority.value}
                  >
                    {getTranslation(priority.label, language)}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Contact Email (Optional) */}
            <div>
              <label
                htmlFor="feedback-email"
                className="block text-sm font-medium text-gray-700 mb-2 text-center"
              >
                {getTranslation("feedbackEmail", language)}
              </label>
              <div className="flex justify-center">
                <input
                  id="feedback-email"
                  type="email"
                  value={feedback.contactEmail}
                  onChange={e =>
                    handleInputChange("contactEmail", e.target.value)
                  }
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={getTranslation(
                    "feedbackEmailPlaceholder",
                    language
                  )}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center" role="alert">
                {error}
              </div>
            )}

            {/* Privacy Notice */}
            <div
              className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"
              role="note"
            >
              <p className="text-blue-800 text-xs leading-relaxed">
                {getTranslation("privacyDisclaimer", language)}
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {getTranslation("cancel", language)}
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting || !feedback.title || !feedback.description
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                      aria-hidden="true"
                    ></div>
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
  }
);

FeedbackForm.displayName = "FeedbackForm";

export default FeedbackForm;
