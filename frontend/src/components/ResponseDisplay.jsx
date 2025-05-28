import React from 'react';
import { Brain, MapPin, CheckCircle, Cpu } from 'lucide-react';

const ResponseDisplay = ({ response, query, location }) => {
  if (!response) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8 border border-gray-100/50 backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl mr-4">
          <Brain className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">AI Agricultural Insights</h3>
          <p className="text-gray-500 text-sm">Personalized recommendations for your farm</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-2xl border border-gray-200/50">
          <div className="flex items-center mb-3">
            <MapPin className="text-gray-500 mr-2" size={16} />
            <span className="text-sm font-medium text-gray-600">Query from {location}</span>
          </div>
          <p className="text-gray-800 font-medium text-lg">{query}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border-l-4 border-green-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5">
            <Cpu size={80} />
          </div>
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-600 mr-2" size={16} />
            <span className="text-sm font-medium text-green-700">AI Analysis Complete</span>
          </div>
          <div className="prose prose-green max-w-none">
            {response.split('\n').map((line, index) => (
              <p key={index} className="text-gray-800 mb-3 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-green-200/50 flex items-center text-xs text-green-600">
            <CheckCircle size={12} className="mr-1" />
            <span>Powered by Agricultural AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseDisplay;