import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️  Supabase credentials not found in environment variables. Database features will be disabled."
  );
  console.warn(
    "💡 Make sure you have a .env file with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY"
  );
}

// Create Supabase client (only if credentials are available)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Feedback table interface
export interface FeedbackData {
  id?: number;
  type: "feature" | "bug" | "improvement" | "other";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  contact_email?: string;
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
      const { data, error } = await supabase
        .from("feedback")
        .insert([
          {
            ...feedback,
            device_info: `${window.screen.width}x${window.screen.height}`,
            user_agent: navigator.userAgent,
          },
        ])
        .select();

      if (error) {
        console.error("Error submitting feedback:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting feedback:", error);
      return { success: false, error: "Failed to submit feedback" };
    }
  },

  // Get all feedback (for admin)
  async getAllFeedback(): Promise<{
    data: FeedbackData[] | null;
    error?: string;
  }> {
    // Check if Supabase is configured
    if (!supabase) {
      return { data: null, error: "Database not configured" };
    }

    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching feedback:", error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return { data: null, error: "Failed to fetch feedback" };
    }
  },

  // Delete feedback (for admin)
  async deleteFeedback(
    id: number
  ): Promise<{ success: boolean; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      return { success: false, error: "Database not configured" };
    }

    try {
      const { error } = await supabase.from("feedback").delete().eq("id", id);

      if (error) {
        console.error("Error deleting feedback:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting feedback:", error);
      return { success: false, error: "Failed to delete feedback" };
    }
  },

  // Clear all feedback (for admin)
  async clearAllFeedback(): Promise<{ success: boolean; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      return { success: false, error: "Database not configured" };
    }

    try {
      const { error } = await supabase.from("feedback").delete().neq("id", 0); // Delete all records

      if (error) {
        console.error("Error clearing feedback:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Error clearing feedback:", error);
      return { success: false, error: "Failed to clear feedback" };
    }
  },
};
