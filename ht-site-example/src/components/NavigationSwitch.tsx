import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavigationSwitchProps {
  onPageChange: (page: 'home1' | 'home2') => void;
  currentPage: 'home1' | 'home2';
}

const NavigationSwitch: React.FC<NavigationSwitchProps> = ({ onPageChange, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPageName = () => {
    return currentPage === 'home1' ? 'Tech University' : 'Đại học Luật';
  };

  const getPageIcon = () => {
    return currentPage === 'home1' ? '🎓' : '⚖️';
  };

  const getPageColor = () => {
    return currentPage === 'home1' ? 'bg-blue-600' : 'bg-red-600';
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow-lg border-2 border-gray-200 transition-all hover:shadow-xl ${getPageColor()}`}
        >
          <span className="text-lg">{getPageIcon()}</span>
          <span>{getPageName()}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden min-w-[200px]">
            <button
              onClick={() => {
                console.log('Clicking Tech University');
                onPageChange('home1');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentPage === 'home1' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">🎓</span>
              <div>
                <div className="font-medium">Tech University</div>
                <div className="text-xs text-gray-500">Technology & Innovation</div>
              </div>
              {currentPage === 'home1' && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </button>
            
            <button
              onClick={() => {
                console.log('Clicking Đại học Luật');
                onPageChange('home2');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100 ${
                currentPage === 'home2' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">⚖️</span>
              <div>
                <div className="font-medium">Đại học Luật</div>
                <div className="text-xs text-gray-500">Luật Hà Nội</div>
              </div>
              {currentPage === 'home2' && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NavigationSwitch;
