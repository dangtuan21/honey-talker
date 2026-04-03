import React from 'react';
import { 
  Microscope, 
  Laptop, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Zap, 
  Cpu, 
  Wifi, 
  Rocket,
  Globe
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Debug Header */}
      <div className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        🎓 TECH UNIVERSITY - Trang 1
      </div>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 mr-3">
                  <Microscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">Tech University</span>
                  <span className="text-xs text-gray-500 block">Innovation & Excellence</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Programs</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Research</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Innovation</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Admissions</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Campus</a>
            </div>
            <div className="flex space-x-3">
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                Portal Login
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Ranking #1 Technology University 2024</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Shape the Future
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Through Technology
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Join the world's leading technology university and transform your ideas into reality through cutting-edge research, innovation, and hands-on learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center">
                <Rocket className="mr-2 h-5 w-5" />
                Explore Programs
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">25,000+</div>
              <div className="text-gray-600 font-medium">Students Worldwide</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">1,200+</div>
              <div className="text-gray-600 font-medium">Faculty Researchers</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">150+</div>
              <div className="text-gray-600 font-medium">Tech Programs</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">98%</div>
              <div className="text-gray-600 font-medium">Tech Employment Rate</div>
            </div>
          </div>
        </div>
      </section>

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
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Computer Science & AI</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dive deep into machine learning, artificial intelligence, quantum computing, and advanced software engineering
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-600" />Machine Learning Engineering</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-600" />Quantum Computing</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-600" />Cybersecurity</li>
              </ul>
              <a href="#" className="text-blue-600 font-bold hover:text-blue-700 flex items-center group">
                Explore Program <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Laptop className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Science & Analytics</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Master big data, predictive analytics, data visualization, and statistical modeling for real-world applications
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-purple-600" />Big Data Engineering</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-purple-600" />Predictive Analytics</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-purple-600" />Data Visualization</li>
              </ul>
              <a href="#" className="text-purple-600 font-bold hover:text-purple-700 flex items-center group">
                Explore Program <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Wifi className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IoT & Embedded Systems</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Design and develop smart devices, embedded systems, and connected solutions for the Internet of Things
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-green-600" />Smart Device Design</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-green-600" />Embedded Programming</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-green-600" />IoT Security</li>
              </ul>
              <a href="#" className="text-green-600 font-bold hover:text-green-700 flex items-center group">
                Explore Program <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
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
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-500">March 15-17, 2024</span>
              </div>
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
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-500">March 22, 2024</span>
              </div>
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
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-500">March 28-30, 2024</span>
              </div>
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
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-white rounded-full filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Innovate the Future?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of innovators, entrepreneurs, and tech leaders who are shaping tomorrow's world at Tech University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
              <Rocket className="inline mr-2 h-5 w-5" />
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105">
              <Globe className="inline mr-2 h-5 w-5" />
              Download Brochure
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
                  <Microscope className="h-6 w-6 text-white" />
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
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Tech Boulevard, Silicon Valley, CA 94025
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-TECH
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@techuniversity.edu
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
  );
};

export default HomePage;
