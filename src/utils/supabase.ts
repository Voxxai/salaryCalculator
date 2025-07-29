import { createClient } from "@supabase/supabase-js";

// Input sanitization function to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove < and > characters
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim(); // Remove leading/trailing whitespace
};

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  // Database features will be disabled silently
}

// Create Supabase client (only if credentials are available)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Feedback data interface
export interface FeedbackData {
  id?: number;
  type: "feature" | "bug" | "improvement" | "other";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  contact_email?: string | null;
  created_at?: string;
  device_info?: string;
  user_agent?: string;
}

// Feedback service functions
export const feedbackService = {
  // Submit new feedback
  async submitFeedback(
    feedback: Omit<FeedbackData, "id" | "created_at">
  ): Promise<{ success: boolean; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      return { success: false, error: "Database not configured" };
    }

    try {
      // Sanitize user input
      const sanitizedFeedback = {
        ...feedback,
        title: sanitizeInput(feedback.title),
        description: sanitizeInput(feedback.description),
        contact_email: null, // Always use null for email
        device_info: `${window.screen.width}x${window.screen.height}`,
        user_agent: navigator.userAgent,
      };

      const { data, error } = await supabase
        .from("feedback")
        .insert([sanitizedFeedback])
        .select();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to submit feedback" };
    }
  },
};
