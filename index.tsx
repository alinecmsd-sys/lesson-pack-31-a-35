
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
      rootElement.innerHTML = `<div style="padding: 20px; color: red;">Error loading application. Check console for details.</div>`;
    }
  }
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
