import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home1' | 'home2'>('home1');

  const handlePageChange = (page: 'home1' | 'home2') => {
    console.log('Changing page to:', page);
    setCurrentPage(page);
  };

  console.log('Current page:', currentPage);

  return (
    <div className="min-h-screen">
      {/* Navigation Dropdown */}
      <div className="fixed top-20 right-4 z-50">
        <div className="relative">
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(e.target.value as 'home1' | 'home2')}
            className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 pr-8 shadow-lg appearance-none cursor-pointer"
          >
            <option value="home1">🎓 Tech University</option>
            <option value="home2">⚖️ Đại học Luật</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      {currentPage === 'home1' ? (
        <div className="bg-blue-50 min-h-screen">
          {/* Tech University Content */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Shape the Future
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Through Technology
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  Join the world's leading technology university and transform your ideas into reality
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">25,000+</div>
                  <div className="text-gray-600 font-medium">Students Worldwide</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">1,200+</div>
                  <div className="text-gray-600 font-medium">Faculty Researchers</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">150+</div>
                  <div className="text-gray-600 font-medium">Tech Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">98%</div>
                  <div className="text-gray-600 font-medium">Tech Employment Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cutting-Edge Programs</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Master the technologies that will define tomorrow's world through our comprehensive and innovative programs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-8 w-8 text-white flex items-center justify-center font-bold">💻</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Computer Science & AI</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Dive deep into machine learning, artificial intelligence, quantum computing, and advanced software engineering
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-center">• Machine Learning Engineering</li>
                    <li className="flex items-center">• Quantum Computing</li>
                    <li className="flex items-center">• Cybersecurity</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-8 w-8 text-white flex items-center justify-center font-bold">📊</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Science & Analytics</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Master big data, predictive analytics, data visualization, and statistical modeling for real-world applications
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-center">• Big Data Engineering</li>
                    <li className="flex items-center">• Predictive Analytics</li>
                    <li className="flex items-center">• Data Visualization</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-8 w-8 text-white flex items-center justify-center font-bold">🌐</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">IoT & Embedded Systems</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Design and develop smart devices, embedded systems, and connected solutions for the Internet of Things
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-center">• Smart Device Design</li>
                    <li className="flex items-center">• Embedded Programming</li>
                    <li className="flex items-center">• IoT Security</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Research Section */}
          <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Research & Innovation Hub</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Pioneering breakthrough technologies that shape the future of humanity
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">$50M+</div>
                  <div className="text-gray-300">Research Funding</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
                  <div className="text-gray-300">Active Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-green-400 mb-2">85</div>
                  <div className="text-gray-300">Patents Filed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">12</div>
                  <div className="text-gray-300">Research Labs</div>
                </div>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Tech Events</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join us for hackathons, tech talks, and innovation summits
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    Hackathon
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    AI Innovation Challenge 2024
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">48-hour hackathon focused on developing AI solutions for real-world problems</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">$50,000 in prizes</span>
                    <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Register →</a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    Tech Talk
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    Quantum Computing Revolution
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Industry experts discuss the future of quantum computing and its applications</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Free Entry</span>
                    <a href="#" className="text-purple-600 font-semibold hover:text-purple-700">Attend →</a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    Summit
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    IoT & Smart Cities Summit
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">International conference on IoT innovations and smart city solutions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">500+ Attendees</span>
                    <a href="#" className="text-green-600 font-semibold hover:text-green-700">Join →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Innovate the Future?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of innovators, entrepreneurs, and tech leaders who are shaping tomorrow's world at Tech University
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
                  🚀 Start Your Journey
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105">
                  🌐 Download Brochure
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 mr-3">
                      <div className="h-6 w-6 text-white flex items-center justify-center font-bold">🔬</div>
                    </div>
                    <div>
                      <span className="text-xl font-bold">Tech University</span>
                      <span className="text-xs text-gray-400 block">Innovation Since 1960</span>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Leading the world in technology education, research, and innovation for over 60 years.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-lg">Academics</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Programs</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Innovation Labs</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-lg">Campus Life</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Student Portal</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Clubs</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Career Services</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-lg">Connect</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center">
                      📍 123 Tech Boulevard, Silicon Valley, CA 94025
                    </li>
                    <li className="flex items-center">
                      📞 (555) 123-TECH
                    </li>
                    <li className="flex items-center">
                      📧 info@techuniversity.edu
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Tech University. All rights reserved. | Privacy Policy | Terms of Service</p>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div className="bg-red-50 min-h-screen">
          {/* Law University Content */}
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-yellow-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Vì Công lý và
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    Sự thật
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  Đào tạo những nhà luật học tài năng, xây dựng xã hội pháp chế, bảo vệ công lý và quyền con người
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2">20,000+</div>
                  <div className="text-gray-600 font-medium">Sinh viên</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2">800+</div>
                  <div className="text-gray-600 font-medium">Giảng viên</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Chương trình đào tạo</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2">95%</div>
                  <div className="text-gray-600 font-medium">Tỷ lệ có việc làm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Chương trình Đào tạo</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Các chương trình đào tạo luật chất lượng cao, đáp ứng nhu cầu xã hội và quốc tế
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-8 w-8 text-white flex items-center justify-center font-bold">⚖️</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Luật Đất đai</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Đào tạo chuyên sâu về luật đất đai, quản lý tài nguyên và môi trường
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-center">• Luật Đất đai</li>
                    <li className="flex items-center">• Quản lý tài nguyên</li>
                    <li className="flex items-center">• Môi trường</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-8 w-8 text-white flex items-center justify-center font-bold">🛡️</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Luật Hình sự</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Chuyên sâu về luật hình sự, tố tụng hình sự và bảo vệ công lý
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-center">• Luật Hình sự</li>
                    <li className="flex items-center">• Tố tụng hình sự</li>
                    <li className="flex items-center">• Khoa học hình sự</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-8 w-8 text-white flex items-center justify-center font-bold">📄</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Luật Kinh doanh</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Đào tạo về luật kinh doanh, doanh nghiệp và thương mại quốc tế
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-center">• Luật Doanh nghiệp</li>
                    <li className="flex items-center">• Luật Thương mại</li>
                    <li className="flex items-center">• Đầu tư quốc tế</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Research Section */}
          <section className="py-20 bg-gradient-to-br from-gray-900 to-red-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Nghiên cứu Khoa học</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Trung tâm nghiên cứu luật hàng đầu, đóng góp vào sự phát triển pháp luật Việt Nam
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
                  <div className="text-gray-300">Đề tài nghiên cứu</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-orange-400 mb-2">50+</div>
                  <div className="text-gray-300">Bài báo khoa học</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-red-400 mb-2">15</div>
                  <div className="text-gray-300">Tạp chí chuyên ngành</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
                  <div className="text-gray-300">Trung tâm nghiên cứu</div>
                </div>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sự kiện & Hoạt động</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Các sự kiện học thuật, hội thảo và hoạt động ngoại khóa
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-r from-red-600 to-yellow-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    Hội thảo
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    Hội thảo Luật Đất đai 2024
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Hội thảo quốc tế về các vấn đề mới trong luật đất đai Việt Nam</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">500+ tham dự</span>
                    <a href="#" className="text-red-600 font-semibold hover:text-red-700">Đăng ký →</a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    Lễ tốt nghiệp
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    Lễ tốt nghiệp Khóa 2024
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Trao bằng tốt nghiệp cho hơn 2,000 sinh viên khóa 2024</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Nhà hát lớn</span>
                    <a href="#" className="text-yellow-600 font-semibold hover:text-yellow-700">Xem chi tiết →</a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    Cuộc thi
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Olympic Luật học 2024
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Cuộc thi Olympic luật học toàn quốc lần thứ 15</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">64 đội tham gia</span>
                    <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Theo dõi →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-red-600 via-yellow-600 to-orange-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sẵn sàng trở thành Nhà luật học?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Hãy gia nhập cộng đồng những nhà luật học tài năng, góp phần xây dựng xã hội pháp chế Việt Nam
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
                  🎓 Đăng ký tuyển sinh
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-red-900 transition-all transform hover:scale-105">
                  📄 Tải thông tin
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg p-2 mr-3">
                      <div className="h-6 w-6 text-white flex items-center justify-center font-bold">⚖️</div>
                    </div>
                    <div>
                      <span className="text-xl font-bold">Đại học Luật Hà Nội</span>
                      <span className="text-xs text-gray-400 block">Vì công lý và sự thật</span>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Trường Đại học Luật Hà Nội - Trung tâm đào tạo luật học hàng đầu Việt Nam
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-lg">Giáo dục</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Đào tạo đại học</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Đào tạo sau đại học</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Nghiên cứu khoa học</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Thư viện</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-lg">Đời sống sinh viên</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Cổng sinh viên</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Hội thảo</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Câu lạc bộ</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Hỗ trợ sinh viên</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4 text-lg">Liên hệ</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center">
                      📍 123 Nguyễn Trãi, Thanh Xuân, Hà Nội
                    </li>
                    <li className="flex items-center">
                      📞 (024) 1234 5678
                    </li>
                    <li className="flex items-center">
                      📧 info@hlu.edu.vn
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Đại học Luật Hà Nội. Bản quyền được bảo lưu. | Chính sách bảo mật | Điều khoản sử dụng</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
