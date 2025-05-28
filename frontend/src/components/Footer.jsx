import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const Footer = ({ setCurrentView }) => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">AgriSafi AI</h3>
            <p className="text-gray-500 text-sm">
              Empowering farmers with AI-driven insights for smarter agriculture
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setCurrentView('home')}>Home</button></li>
              <li><button className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setCurrentView('history')}>History</button></li>
              <li><button className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setCurrentView('dashboard')}>Dashboard</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+254 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200/50 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AgriSafi. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Powered by Advanced AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;