import React, { useState } from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";
import { adminAuthService } from "../utils/adminAuth";

interface AdminLoginProps {
  language: Language;
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = React.memo(
  ({ language, onLogin, onCancel }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        // Verify password using the admin auth service
        const result = await adminAuthService.verifyPassword(password);

        if (result.success) {
          // Set authentication status with expiration
          adminAuthService.setAuthenticated(true);
          onLogin();
        } else {
          setError(
            result.error || getTranslation("incorrectPassword", language)
          );
        }
      } catch (error) {
        setError(getTranslation("incorrectPassword", language));
      }

      setIsLoading(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-900">
              {getTranslation("adminLogin", language)}
            </h2>
            <p className="text-gray-600 mt-2">
              {getTranslation("adminLoginSubtitle", language)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {getTranslation("password", language)}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={getTranslation("enterPassword", language)}
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
                {getTranslation("cancel", language)}
              </button>
              <button
                type="submit"
                disabled={isLoading || !password}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {getTranslation("loggingIn", language)}
                  </div>
                ) : (
                  getTranslation("login", language)
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

AdminLogin.displayName = "AdminLogin";

export default AdminLogin;
