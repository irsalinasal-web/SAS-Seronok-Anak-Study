import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-amber-50 p-6">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 text-center border-4 border-amber-300 shadow-xl">
            <div className="text-6xl mb-3">😊</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">
              Alamak, ada sedikit masalah!
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Jangan risau, tekan butang di bawah untuk memulakan semula aplikasi S.A.S.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-lg rounded-2xl shadow-md border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all"
            >
              🔄 Muat Semula S.A.S
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
