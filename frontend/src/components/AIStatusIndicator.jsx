import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

const AIStatusIndicator = () => {
  const [status, setStatus] = useState('active');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'active' ? 'processing' : 'active');
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-2 rounded-full border border-blue-200/50">
      <div className="relative">
        <Brain className="text-blue-600" size={16} />
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
          status === 'active' ? 'bg-green-400' : 'bg-blue-400'
        } animate-pulse`}></div>
      </div>
      <span className="text-sm font-medium text-gray-700">AI Assistant {status === 'active' ? 'Ready' : 'Processing'}</span>
    </div>
  );
};

export default AIStatusIndicator;