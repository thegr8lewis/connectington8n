import React from 'react';
import { Sprout, Home, History as HistoryIcon, BarChart3, Calendar, Menu, X } from 'lucide-react';

const Header = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigation = [
    { name: 'Home', view: 'home', icon: Home },
    { name: 'History', view: 'history', icon: HistoryIcon },
    { name: 'Dashboard', view: 'dashboard', icon: BarChart3 },
    { name: 'Weekly Features', view: 'weekly', icon: Calendar },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl mr-4 shadow-lg">
              <Sprout className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AgriSafi
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Smart Farming Assistant</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all font-medium ${
                  currentView === item.view
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100/80 hover:scale-105'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100/80 transition-all"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentView(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-2xl transition-all ${
                  currentView === item.view
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100/80'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;