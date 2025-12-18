
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error("Critical: Could not find root element '#root'");
      return;
    }

    // Clear existing content to avoid hydration issues if any
    rootElement.innerHTML = '';

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("English Master initialized successfully");
  } catch (error) {
    console.error("Failed to render App:", error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 40px; text-align: center; font-family: sans-serif;">
          <h1 style="color: #e11d48;">Initialization Error</h1>
          <p style="color: #4b5563;">Please refresh the page or check the console logs.</p>
          <pre style="background: #f3f4f6; padding: 10px; border-radius: 8px; font-size: 12px; display: inline-block; text-align: left;">${String(error)}</pre>
        </div>
      `;
    }
  }
};

// Handle both initial load and potential race conditions
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mountApp();
} else {
  document.addEventListener('DOMContentLoaded', mountApp);
}
