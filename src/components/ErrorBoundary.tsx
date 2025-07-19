import React, { Component, ErrorInfo, ReactNode } from "react";
import { getTranslation } from "../utils/translations";
import { Language } from "../types";

interface Props {
  children: ReactNode;
  language: Language;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorType?: "calculation" | "storage" | "network" | "general";
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Determine error type based on error message or name
    let errorType: "calculation" | "storage" | "network" | "general" =
      "general";

    if (
      error.message.includes("calculation") ||
      error.message.includes("NaN")
    ) {
      errorType = "calculation";
    } else if (
      error.message.includes("localStorage") ||
      error.message.includes("storage")
    ) {
      errorType = "storage";
    } else if (
      error.message.includes("fetch") ||
      error.message.includes("network")
    ) {
      errorType = "network";
    }

    return { hasError: true, error, errorType };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Silent error handling - no console logs in any environment
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleClearStorage = (): void => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      window.location.reload();
    }
  };

  getErrorMessage = (): string => {
    const { errorType } = this.state;

    switch (errorType) {
      case "calculation":
        return getTranslation("calculationError", this.props.language);
      case "storage":
        return getTranslation("storageError", this.props.language);
      case "network":
        return getTranslation("networkError", this.props.language);
      default:
        return getTranslation("errorMessage", this.props.language);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {getTranslation("errorTitle", this.props.language)}
            </h1>
            <p className="text-gray-600 mb-6">{this.getErrorMessage()}</p>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {getTranslation("reloadPage", this.props.language)}
              </button>

              {this.state.errorType === "storage" && (
                <button
                  onClick={this.handleClearStorage}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {getTranslation("clearStorageAndReload", this.props.language)}
                </button>
              )}
            </div>

            {/* Error details removed for production */}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
