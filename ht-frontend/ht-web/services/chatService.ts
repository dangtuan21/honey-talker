export class ChatService {
  private apiUrl: string;
  private orgId: string;

  constructor(apiUrl: string = 'http://localhost:8020/chat', orgId: string = 'test_org') {
    this.apiUrl = apiUrl;
    this.orgId = orgId;
  }

  async sendMessage(message: string, theme: string): Promise<string> {
    // Try real API first
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, org_id: this.orgId })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.reply;
      }
    } catch (error) {
      console.warn('API unavailable, using mock response');
    }

    // Fallback to mock responses
    return this.getMockResponse(message, theme);
  }

  private getMockResponse(message: string, theme: string): string {
    const mockResponses = {
      economics: {
        'tuyển sinh': 'Chào bạn, tuyển sinh 2024 của Đại học Kinh tế Quốc dân đang mở các ngành: Kinh tế, Tài chính, Quản trị kinh doanh, Kinh tế quốc tế. Bạn có thể đăng ký tại website: admissions.neu.edu.vn',
        'học phí': 'Học phí năm 2024 dao động từ 15-25 triệu VNĐ/năm tùy ngành. Nhà trường có nhiều chính sách học bổng và hỗ trợ sinh viên.',
        'chương trình': 'Chúng tôi có các chương trình đào tạo chất lượng cao: Kinh tế & Tài chính, Kinh tế Quốc tế, Quản trị Kinh doanh, Logistics và Quản lý chuỗi cung ứng.',
        'liên hệ': 'Bạn có thể liên hệ với chúng tôi qua: 📞 (024) 3625 5555 | 📧 info@neu.edu.vn | 📍 207 Giải Phóng, Đống Đa, Hà Nội',
        'địa chỉ': 'Đại học Kinh tế Quốc dân tọa lạc tại 207 Giải Phóng, Đống Đa, Hà Nội.',
        'điện thoại': 'Số điện thoại liên hệ: (024) 3625 5555',
        'email': 'Email liên hệ: info@neu.edu.vn',
        'default': 'Cảm ơn câu hỏi của bạn. Tôi là trợ lý AI Honey Talker của NEU, tôi có thể giúp bạn thông tin về tuyển sinh, chương trình đào tạo, học phí và các dịch vụ của trường.'
      },
      tech: {
        'programs': 'We offer Computer Science, Data Science, and IoT programs with cutting-edge curriculum and industry partnerships.',
        'admissions': 'Admissions for Fall 2024 are now open. Apply by June 30th for early consideration.',
        'research': 'Our research focuses on AI, machine learning, cybersecurity, and IoT innovations.',
        'faculty': 'Our faculty includes leading researchers and industry experts in technology fields.',
        'facilities': 'We provide state-of-the-art labs, computing resources, and collaborative spaces.',
        'default': 'I\'m your Tech University Honey Talker AI assistant. How can I help you today?'
      },
      law: {
        'chương trình': 'Chúng tôi có các chương trình Luật Đất đai, Luật Hình sự, Luật Kinh doanh với đội ngũ giảng viên hàng đầu.',
        'tuyển sinh': 'Tuyển sinh 2024 đang mở. Thời gian đăng ký từ 1/6 đến 31/7. Vui lòng truy cập website để biết chi tiết.',
        'giảng viên': 'Đội ngũ giảng viên của chúng tôi bao gồm các giáo sư, phó giáo sư và luật sư hàng đầu.',
        'cơ sở vật chất': 'Trường có thư viện pháp luật hiện đại, phòng học thông minh và không gian học tập chuyên nghiệp.',
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

    // Check for specific keywords first
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  }
}
