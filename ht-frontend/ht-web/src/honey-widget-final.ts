import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface WidgetConfig {
  theme?: 'default' | 'tech' | 'law' | 'economics';
  position?: 'bottom-right' | 'bottom-left';
  welcomeMessage?: string;
  apiUrl?: string;
  orgId?: string;
}

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

const ChatButton = ({ theme, onClick, unreadCount }: { theme: string; onClick: () => void; unreadCount: number }) => (
  <button
    onClick={onClick}
    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 ${themes[theme as keyof typeof themes].buttonBg} text-white`}
  >
    <i className="fas fa-comments text-xl"></i>
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        {unreadCount}
      </span>
    )}
  </button>
);

const ChatPanel = ({
  theme,
  messages,
  onClose,
  onSendMessage,
  isLoading
}: {
  theme: string;
  messages: Message[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentTheme = themes[theme as keyof typeof themes];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
      <div className={`${currentTheme.gradient} text-white p-4 rounded-t-lg flex items-center justify-between`}>
        <div className="flex items-center">
          <i className="fas fa-comments mr-2"></i>
          <span className="font-semibold">Honey Talker AI</span>
        </div>
        <button 
          onClick={onClose} 
          className="text-white hover:bg-white/20 rounded p-1 transition-colors"
          title="Đóng chat"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <i className="fas fa-robot text-3xl mb-2 text-gray-400"></i>
            <p className="text-sm">{currentTheme.welcome}</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`${currentTheme.gradient} text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md`}
            title="Gửi tin nhắn"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

const HoneyTalkerWidget = ({
  theme = 'default',
  position = 'bottom-right',
  orgId = 'test_org',
  welcomeMessage,
  apiUrl = 'http://localhost:8020/chat'
}: WidgetConfig) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const savedMessages = localStorage.getItem(`honey-talker-messages-${theme}`);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load saved messages:', error);
      }
    }
  }, [theme]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`honey-talker-messages-${theme}`, JSON.stringify(messages));
    }
  }, [messages, theme]);

  useEffect(() => {
    if (!isOpen) {
      const assistantMessages = messages.filter(msg => msg.role === 'assistant');
      setUnreadCount(assistantMessages.length);
    } else {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getMockResponse(message, theme);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Xin lỗi, tôi đã gặp sự cố. Vui lòng thử lại sau.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {isOpen ? (
        <ChatPanel
          theme={theme}
          messages={messages}
          onClose={handleClose}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      ) : (
        <ChatButton
          theme={theme}
          onClick={() => setIsOpen(true)}
          unreadCount={unreadCount}
        />
      )}
    </div>
  );
};

const getMockResponse = (message: string, theme: string): string => {
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

  const responses = mockResponses[theme as keyof typeof mockResponses] || mockResponses.default;
  const lowerMessage = message.toLowerCase();

  for (const [key, response] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
};

class HoneyTalkerWidgetManager {
  private container: HTMLElement | null = null;
  private root: ReactDOM.Root | null = null;
  private currentConfig: WidgetConfig = {};

  init(config: WidgetConfig = {}) {
    this.currentConfig = config;
    this.destroy();
    this.createContainer();
    this.loadStyles();
    this.renderWidget(config);
  }

  private createContainer() {
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

  private loadStyles() {
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

  private renderWidget(config: WidgetConfig) {
    if (this.container) {
      this.root = ReactDOM.createRoot(this.container);
      this.root.render(React.createElement(HoneyTalkerWidget, config));
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

  updateConfig(newConfig: Partial<WidgetConfig>) {
    this.init({ ...this.currentConfig, ...newConfig });
  }

  getConfig(): WidgetConfig {
    return this.currentConfig;
  }

  isInitialized(): boolean {
    return this.container !== null && this.root !== null;
  }
}

declare global {
  interface Window {
    HoneyTalkerWidget: HoneyTalkerWidgetManager;
  }
}

(window as any).HoneyTalkerWidget = new HoneyTalkerWidgetManager();

if ((window as any).HoneyTalkerWidgetConfig) {
  (window as any).HoneyTalkerWidget.init((window as any).HoneyTalkerWidgetConfig);
}

export default HoneyTalkerWidget;
