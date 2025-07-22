import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

// Admin authentication service with database-only storage and bcrypt hashing
export const adminAuthService = {
  // Verify admin password against database using bcrypt
  async verifyPassword(
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      return { success: false, error: "Database not configured" };
    }

    try {
      // Get hashed password from database
      const { data, error } = await supabase
        .from("admin_config")
        .select("password_hash")
        .eq("key", "admin_password")
        .single();

      if (error) {
        return {
          success: false,
          error: "Authentication failed - database error",
        };
      }

      if (!data || !data.password_hash) {
        return { success: false, error: "No admin password configured" };
      }

      // Compare password with bcrypt hash
      const isValid = await bcrypt.compare(password, data.password_hash);

      if (isValid) {
        return { success: true };
      } else {
        return { success: false, error: "Invalid password" };
      }
    } catch (error) {
      return { success: false, error: "Authentication failed" };
    }
  },

  // Change admin password with bcrypt hashing
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    // First verify current password
    const verifyResult = await this.verifyPassword(currentPassword);
    if (!verifyResult.success) {
      return { success: false, error: "Current password is incorrect" };
    }

    // Check if Supabase is configured
    if (!supabase) {
      return { success: false, error: "Database not configured" };
    }

    try {
      // Hash the new password with bcrypt (salt rounds: 12)
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password in database
      const { error } = await supabase.from("admin_config").upsert({
        key: "admin_password",
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to change password" };
    }
  },

  // Initialize admin password (first time setup)
  async initializePassword(
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      return { success: false, error: "Database not configured" };
    }

    try {
      // Check if password already exists
      const { data: existingData } = await supabase
        .from("admin_config")
        .select("password_hash")
        .eq("key", "admin_password")
        .single();

      if (existingData && existingData.password_hash) {
        return { success: false, error: "Admin password already configured" };
      }

      // Hash the password with bcrypt (salt rounds: 12)
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert new password
      const { error } = await supabase.from("admin_config").insert({
        key: "admin_password",
        password_hash: hashedPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to initialize password" };
    }
  },

  // Check if admin password is configured
  async isPasswordConfigured(): Promise<boolean> {
    if (!supabase) {
      return false;
    }

    try {
      const { data } = await supabase
        .from("admin_config")
        .select("password_hash")
        .eq("key", "admin_password")
        .single();

      return !!(data && data.password_hash);
    } catch (error) {
      return false;
    }
  },

  // Check if admin is authenticated (using localStorage for session)
  isAuthenticated(): boolean {
    return localStorage.getItem("admin_authenticated") === "true";
  },

  // Set authentication status
  setAuthenticated(status: boolean): void {
    if (status) {
      localStorage.setItem("admin_authenticated", "true");
      // Set expiration (24 hours)
      localStorage.setItem(
        "admin_expires",
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      );
    } else {
      localStorage.removeItem("admin_authenticated");
      localStorage.removeItem("admin_expires");
    }
  },

  // Check if session is expired
  isSessionExpired(): boolean {
    const expires = localStorage.getItem("admin_expires");
    if (!expires) return true;

    return new Date(expires) < new Date();
  },

  // Logout admin
  logout(): void {
    this.setAuthenticated(false);
  },
};
