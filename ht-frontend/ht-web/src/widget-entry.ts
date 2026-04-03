import React from 'react';
import ReactDOM from 'react-dom/client';
import HoneyTalkerWidgetSimple from './honey-widget-simple';

interface WidgetConfig {
  theme?: 'default' | 'tech' | 'law' | 'economics';
  position?: 'bottom-right' | 'bottom-left';
  welcomeMessage?: string;
  apiUrl?: string;
  orgId?: string;
}

class HoneyTalkerWidgetManager {
  private container: HTMLElement | null = null;
  private root: ReactDOM.Root | null = null;
  private currentConfig: WidgetConfig = {};

  init(config: WidgetConfig = {}) {
    this.currentConfig = config;
    this.destroy(); // Clean up existing instance
    this.createContainer();
    this.loadStyles(); // Load Tailwind CSS and Font Awesome
    this.renderWidget(config);
  }

  private createContainer() {
    // Remove existing container if present
    const existingContainer = document.getElementById('honey-talker-widget-root');
    if (existingContainer) {
      existingContainer.remove();
    }

    this.container = document.createElement('div');
    this.container.id = 'honey-talker-widget-root';
    this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: Inter, system-ui, -apple-system, sans-serif;
    `;
    
    // Apply position based on config
    if (this.currentConfig.position === 'bottom-left') {
      this.container.style.right = 'auto';
      this.container.style.left = '20px';
    }
    
    document.body.appendChild(this.container);
  }

  private loadStyles() {
    // Load Tailwind CSS if not already loaded
    if (!document.querySelector('script[data-tailwind]')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.setAttribute('data-tailwind', 'true');
      document.head.appendChild(tailwindScript);
    }

    // Load Font Awesome if not already loaded
    if (!document.querySelector('link[data-font-awesome]')) {
      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.rel = 'stylesheet';
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      fontAwesomeLink.setAttribute('data-font-awesome', 'true');
      document.head.appendChild(fontAwesomeLink);
    }

    // Load Inter font if not already loaded
    if (!document.querySelector('link[data-inter-font]')) {
      const interFont = document.createElement('link');
      interFont.rel = 'stylesheet';
      interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      interFont.setAttribute('data-inter-font', 'true');
      document.head.appendChild(interFont);
    }
  }

  private renderWidget(config: WidgetConfig) {
    if (this.container) {
      this.root = ReactDOM.createRoot(this.container);
      this.root.render(React.createElement(HoneyTalkerWidgetSimple, config));
    }
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  // Method to update widget configuration
  updateConfig(newConfig: Partial<WidgetConfig>) {
    this.init({ ...this.currentConfig, ...newConfig });
  }

  // Method to get current configuration
  getConfig(): WidgetConfig {
    return this.currentConfig;
  }

  // Method to check if widget is initialized
  isInitialized(): boolean {
    return this.container !== null && this.root !== null;
  }
}

// Global exposure
declare global {
  interface Window {
    HoneyTalkerWidget: HoneyTalkerWidgetManager;
  }
}

// Create singleton instance
(window as any).HoneyTalkerWidget = new HoneyTalkerWidgetManager();

// Auto-initialize if config is provided in window object
if ((window as any).HoneyTalkerWidgetConfig) {
  (window as any).HoneyTalkerWidget.init((window as any).HoneyTalkerWidgetConfig);
}
