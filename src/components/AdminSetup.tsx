import React, { useState, useEffect } from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";
import { adminAuthService } from "../utils/adminAuth";

interface AdminSetupProps {
  language: Language;
  onSetupComplete: () => void;
  onCancel: () => void;
}

const AdminSetup: React.FC<AdminSetupProps> = ({
  language,
  onSetupComplete,
  onCancel,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check if password is already configured
  useEffect(() => {
    const checkPassword = async () => {
      try {
        const isConfigured = await adminAuthService.isPasswordConfigured();
        if (isConfigured) {
          onSetupComplete();
        }
      } catch (error) {
        setError("Failed to check password configuration");
      } finally {
        setIsChecking(false);
      }
    };

    checkPassword();
  }, [onSetupComplete]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Initialize admin password
      const result = await adminAuthService.initializePassword(password);

      if (result.success) {
        onSetupComplete();
      } else {
        setError(result.error || "Failed to setup admin password");
      }
    } catch (error) {
      setError("Failed to setup admin password");
    }

    setIsLoading(false);
  };

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8 max-w-md w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking admin configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Setup</h2>
          <p className="text-gray-600 mt-2">
            Set up your admin password for the first time
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin password (min 8 characters)"
              required
              minLength={8}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm admin password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !password || !confirmPassword}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Setting up...
                </div>
              ) : (
                "Setup Admin"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This password will be securely hashed and stored in the database.
            <br />
            Make sure to remember it - there's no password recovery!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
