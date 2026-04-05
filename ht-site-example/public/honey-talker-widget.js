const themes = {
  economics: {
    primary: '#10b981',
    secondary: '#059669',
    gradient: 'from-green-600 to-green-800',
    welcome: 'Xin chào! Tôi là trợ lý AI Honey Talker của Đại học Kinh tế. Tôi có thể giúp gì cho bạn?',
    buttonBg: 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900'
  },
  tech: {
    primary: '#3b82f6',
    secondary: '#8b5cf6', 
    gradient: 'from-blue-600 to-purple-600',
    welcome: 'Hi! I\'m your Tech University Honey Talker AI assistant. How can I help you?',
    buttonBg: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
  },
  law: {
    primary: '#dc2626',
    secondary: '#f59e0b',
    gradient: 'from-red-600 to-yellow-600', 
    welcome: 'Xin chào! Tôi là trợ lý AI Honey Talker của Đại học Luật. Tôi có thể giúp gì cho bạn?',
    buttonBg: 'bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700'
  },
  default: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    gradient: 'from-indigo-600 to-purple-600',
    welcome: 'Hello! I\'m your Honey Talker AI assistant. How can I help you?',
    buttonBg: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
  }
};

const getMockResponse = (message, theme) => {
  const mockResponses = {
    economics: {
      'tuyển sinh': 'Chào bạn, tuyển sinh 2024 của Đại học Kinh tế Quốc dân đang mở các ngành: Kinh tế, Tài chính, Quản trị kinh doanh, Kinh tế quốc tế. Bạn có thể đăng ký tại website: admissions.neu.edu.vn',
      'học phí': 'Học phí năm 2024 dao động từ 15-25 triệu VNĐ/năm tùy ngành. Nhà trường có nhiều chính sách học bổng và hỗ trợ sinh viên.',
      'chương trình': 'Chúng tôi có các chương trình đào tạo chất lượng cao: Kinh tế & Tài chính, Kinh tế Quốc tế, Quản trị Kinh doanh, Logistics và Quản lý chuỗi cung ứng.',
      'liên hệ': 'Bạn có thể liên hệ với chúng tôi qua: 📞 (024) 3625 5555 | 📧 info@neu.edu.vn | 📍 207 Giải Phóng, Đống Đa, Hà Nội',
      'default': 'Cảm ơn câu hỏi của bạn. Tôi là trợ lý AI Honey Talker của NEU, tôi có thể giúp bạn thông tin về tuyển sinh, chương trình đào tạo, học phí và các dịch vụ của trường.'
    },
    tech: {
      'programs': 'We offer Computer Science, Data Science, and IoT programs with cutting-edge curriculum and industry partnerships.',
      'admissions': 'Admissions for Fall 2024 are now open. Apply by June 30th for early consideration.',
      'research': 'Our research focuses on AI, machine learning, cybersecurity, and IoT innovations.',
      'default': 'I\'m your Tech University Honey Talker AI assistant. How can I help you today?'
    },
    law: {
      'chương trình': 'Chúng tôi có các chương trình Luật Đất đai, Luật Hình sự, Luật Kinh doanh với đội ngũ giảng viên hàng đầu.',
      'tuyển sinh': 'Tuyển sinh 2024 đang mở. Thời gian đăng ký từ 1/6 đến 31/7. Vui lòng truy cập website để biết chi tiết.',
      'default': 'Xin chào! Tôi là trợ lý AI Honey Talker của Đại học Luật. Tôi có thể giúp gì cho bạn?'
    },
    default: {
      'hello': 'Hello! I\'m your Honey Talker AI assistant. How can I help you today?',
      'help': 'I can help you with information about programs, admissions, and general questions. What would you like to know?',
      'default': 'Hello! I\'m your Honey Talker AI assistant. Feel free to ask me any questions!'
    }
  };

  const responses = mockResponses[theme] || mockResponses.default;
  const lowerMessage = message.toLowerCase();

  for (const [key, response] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
};

class HoneyTalkerWidgetManager {
  constructor() {
    this.container = null;
    this.root = null;
    this.currentConfig = {};
    this.isOpen = false;
    this.messages = [];
    this.isLoading = false;
    this.unreadCount = 0;
  }

  init(config = {}) {
    this.currentConfig = config;
    this.destroy();
    this.createContainer();
    this.loadStyles();
    this.renderWidget();
    this.loadMessages();
  }

  createContainer() {
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
    
    if (this.currentConfig.position === 'bottom-left') {
      this.container.style.right = 'auto';
      this.container.style.left = '20px';
    }
    
    document.body.appendChild(this.container);
  }

  loadStyles() {
    if (!document.querySelector('script[data-tailwind]')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.setAttribute('data-tailwind', 'true');
      document.head.appendChild(tailwindScript);
    }

    if (!document.querySelector('link[data-font-awesome]')) {
      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.rel = 'stylesheet';
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      fontAwesomeLink.setAttribute('data-font-awesome', 'true');
      document.head.appendChild(fontAwesomeLink);
    }

    if (!document.querySelector('link[data-inter-font]')) {
      const interFont = document.createElement('link');
      interFont.rel = 'stylesheet';
      interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      interFont.setAttribute('data-inter-font', 'true');
      document.head.appendChild(interFont);
    }
  }

  loadMessages() {
    const theme = this.currentConfig.theme || 'default';
    const savedMessages = localStorage.getItem(`honey-talker-messages-${theme}`);
    if (savedMessages) {
      try {
        this.messages = JSON.parse(savedMessages);
      } catch (error) {
        console.error('Failed to load saved messages:', error);
        this.messages = [];
      }
    }
    
    this.unreadCount = this.messages.filter(msg => msg.role === 'assistant').length;
  }

  saveMessages() {
    const theme = this.currentConfig.theme || 'default';
    if (this.messages.length > 0) {
      localStorage.setItem(`honey-talker-messages-${theme}`, JSON.stringify(this.messages));
    }
  }

  renderWidget() {
    if (!this.container) return;
    
    this.container.innerHTML = this.getWidgetHTML();
    this.attachEventListeners();
  }

  getWidgetHTML() {
    const theme = this.currentConfig.theme || 'default';
    const currentTheme = themes[theme];
    const positionClasses = this.currentConfig.position === 'bottom-left' 
      ? 'bottom-4 left-4' 
      : 'bottom-4 right-4';

    if (this.isOpen) {
      return `
        <div class="fixed ${positionClasses} z-50">
          <div class="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
            <div class="${currentTheme.gradient} text-white p-4 rounded-t-lg flex items-center justify-between">
              <div class="flex items-center">
                <i class="fas fa-comments mr-2"></i>
                <span class="font-semibold">Honey Talker AI</span>
              </div>
              <button onclick="window.HoneyTalkerWidget.close()" class="text-white hover:bg-white/20 rounded p-1 transition-colors" title="Đóng chat">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              ${this.messages.length === 0 ? `
                <div class="text-center text-gray-500 py-8">
                  <i class="fas fa-robot text-3xl mb-2 text-gray-400"></i>
                  <p class="text-sm">${currentTheme.welcome}</p>
                </div>
              ` : this.messages.map((msg, index) => `
                <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-[70%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }">
                    <p class="whitespace-pre-wrap break-words">${msg.content}</p>
                    <p class="text-xs mt-1 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}">
                      ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              `).join('')}
              
              ${this.isLoading ? `
                <div class="flex justify-start">
                  <div class="bg-white text-gray-900 border border-gray-200 p-3 rounded-lg">
                    <div class="flex space-x-1">
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
            
            <div class="p-3 border-t border-gray-200 bg-white">
              <form onsubmit="window.HoneyTalkerWidget.sendMessage(event)" class="flex space-x-2">
                <input
                  type="text"
                  id="honey-input"
                  placeholder="Nhập tin nhắn..."
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  ${this.isLoading ? 'disabled' : ''}
                />
                <button 
                  type="submit"
                  ${this.isLoading ? 'disabled' : ''}
                  class="${currentTheme.gradient} text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
                  title="Gửi tin nhắn"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="fixed ${positionClasses} z-50">
          <button
            onclick="window.HoneyTalkerWidget.open()"
            class="${currentTheme.buttonBg} text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          >
            <i class="fas fa-comments text-xl"></i>
            ${this.unreadCount > 0 ? `
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                ${this.unreadCount}
              </span>
            ` : ''}
          </button>
        </div>
      `;
    }
  }

  attachEventListeners() {
    // Event listeners are attached via onclick attributes in HTML
  }

  open() {
    this.isOpen = true;
    this.unreadCount = 0;
    this.renderWidget();
    setTimeout(() => {
      const input = document.getElementById('honey-input');
      if (input) input.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.renderWidget();
  }

  async sendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('honey-input');
    const message = input.value.trim();
    
    if (!message || this.isLoading) return;
    
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    this.messages.push(userMessage);
    this.isLoading = true;
    this.renderWidget();
    
    try {
      // Call the real chat API
      const apiUrl = this.currentConfig.apiUrl || '/api/chat';
      const orgId = this.currentConfig.orgId || '69cff40f084e71ebda388213';
      
      console.log('Calling API:', apiUrl, 'with orgId:', orgId, 'message:', message);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          org_id: orgId
        })
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      const aiResponse = data.reply || 'Xin lỗi, tôi đã gặp sự cố. Vui lòng thử lại sau.';
      
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      this.messages.push(assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to mock response if API fails
      console.log('Falling back to mock response');
      const fallbackResponse = await getMockResponse(message, this.currentConfig.theme || 'default');
      
      const errorMessage = {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString()
      };
      
      this.messages.push(errorMessage);
    } finally {
      this.isLoading = false;
      this.saveMessages();
      this.renderWidget();
      setTimeout(() => {
        const newInput = document.getElementById('honey-input');
        if (newInput) {
          newInput.focus();
          newInput.value = '';
        }
      }, 100);
    }
  }

  destroy() {
    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  updateConfig(newConfig) {
    this.init({ ...this.currentConfig, ...newConfig });
  }

  getConfig() {
    return this.currentConfig;
  }

  isInitialized() {
    return this.container !== null;
  }
}

// Create singleton instance
window.HoneyTalkerWidget = new HoneyTalkerWidgetManager();

// Auto-initialize if config is provided
if (window.HoneyTalkerWidgetConfig) {
  window.HoneyTalkerWidget.init(window.HoneyTalkerWidgetConfig);
}
