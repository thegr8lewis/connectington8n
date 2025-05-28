import React, { useState } from 'react';
import { MessageCircle, MapPin, Send, Loader } from 'lucide-react';
import AIStatusIndicator from './AIStatusIndicator';

const ChatInterface = ({ onSubmit, loading }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Nairobi');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query, location);
      setQuery('');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl mr-4">
            <MessageCircle className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ask AgriSafi AI</h2>
            <p className="text-gray-500 text-sm">Powered by advanced agricultural intelligence</p>
          </div>
        </div>
        <AIStatusIndicator />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about weather patterns, pest management, crop optimization, financial guidance..."
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none h-32 bg-gray-50/50"
            disabled={loading}
            rows={3}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <div className="bg-blue-100 px-2 py-1 rounded-full">
              <span className="text-xs text-blue-600 font-medium">AI</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">  
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-8 rounded-xl flex items-center space-x-3 transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span className="font-medium">Processing...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span className="font-medium">Ask AI</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;