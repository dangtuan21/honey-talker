import React from 'react';
import { 
  Award, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  GraduationCap,
  Scale,
  Shield,
  FileText
} from 'lucide-react';

const HomePage2: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-50">
      {/* Debug Header */}
      <div className="bg-red-600 text-white p-4 text-center font-bold text-xl">
        🏛️ ĐẠI HỌC LUẬT HÀ NỘI - Trang 2
      </div>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg p-2 mr-3">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">Đại học Luật Hà Nội</span>
                  <span className="text-xs text-gray-500 block">Trung tâm đào tạo luật hàng đầu</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">Trang chủ</a>
              <a href="#" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">Giới thiệu</a>
              <a href="#" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">Đào tạo</a>
              <a href="#" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">Nghiên cứu</a>
              <a href="#" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">Tuyển sinh</a>
              <a href="#" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">Tin tức</a>
            </div>
            <div className="flex space-x-3">
              <button className="border border-red-600 text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-50 transition-colors">
                Cổng thông tin
              </button>
              <button className="bg-gradient-to-r from-red-600 to-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-red-700 hover:to-yellow-700 transition-all">
                Tuyển sinh 2024
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-yellow-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Award className="h-4 w-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Top 1 Trường Luật hàng đầu Việt Nam</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Vì Công lý và
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Sự thật
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Đào tạo những nhà luật học tài năng, xây dựng xã hội pháp chế, bảo vệ công lý và quyền con người
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Xem chương trình đào tạo
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-red-900 transition-all transform hover:scale-105">
                Đăng ký tư vấn
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
              <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">20,000+</div>
              <div className="text-gray-600 font-medium">Sinh viên</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">800+</div>
              <div className="text-gray-600 font-medium">Giảng viên</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-gray-600 font-medium">Chương trình đào tạo</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">95%</div>
              <div className="text-gray-600 font-medium">Tỷ lệ có việc làm</div>
            </div>
          </div>
        </div>
      </section>

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
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Luật Đất đai</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Đào tạo chuyên sâu về luật đất đai, quản lý tài nguyên và môi trường
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-red-600" />Luật Đất đai</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-red-600" />Quản lý tài nguyên</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-red-600" />Môi trường</li>
              </ul>
              <a href="#" className="text-red-600 font-bold hover:text-red-700 flex items-center group">
                Tìm hiểu thêm <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Luật Hình sự</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chuyên sâu về luật hình sự, tố tụng hình sự và bảo vệ công lý
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-yellow-600" />Luật Hình sự</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-yellow-600" />Tố tụng hình sự</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-yellow-600" />Khoa học hình sự</li>
              </ul>
              <a href="#" className="text-yellow-600 font-bold hover:text-yellow-700 flex items-center group">
                Tìm hiểu thêm <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Luật Kinh doanh</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Đào tạo về luật kinh doanh, doanh nghiệp và thương mại quốc tế
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-600" />Luật Doanh nghiệp</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-600" />Luật Thương mại</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-600" />Đầu tư quốc tế</li>
              </ul>
              <a href="#" className="text-blue-600 font-bold hover:text-blue-700 flex items-center group">
                Tìm hiểu thêm <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
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
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm text-gray-500">15/03/2024</span>
              </div>
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
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm text-gray-500">22/03/2024</span>
              </div>
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
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-500">28/03/2024</span>
              </div>
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
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-white rounded-full filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sẵn sàng trở thành Nhà luật học?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Hãy gia nhập cộng đồng những nhà luật học tài năng, góp phần xây dựng xã hội pháp chế Việt Nam
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
              <GraduationCap className="inline mr-2 h-5 w-5" />
              Đăng ký tuyển sinh
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-red-900 transition-all transform hover:scale-105">
              <FileText className="inline mr-2 h-5 w-5" />
              Tải thông tin
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
                  <Scale className="h-6 w-6 text-white" />
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
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Nguyễn Trãi, Thanh Xuân, Hà Nội
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (024) 1234 5678
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@hlu.edu.vn
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
  );
};

export default HomePage2;
