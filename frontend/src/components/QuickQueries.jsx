import React from 'react';
import { Cloud, Bug, Sprout, DollarSign, Cpu, Zap } from 'lucide-react';

const QuickQueries = ({ onQuerySelect }) => {
  const quickQueries = [
    { 
      icon: Cloud, 
      text: "Weather forecast for maize", 
      gradient: "from-blue-500 to-blue-600",
      description: "Get AI-powered weather insights"
    },
    { 
      icon: Bug, 
      text: "Pest control for tomatoes", 
      gradient: "from-red-500 to-red-600",
      description: "Smart pest management solutions"
    },
    { 
      icon: Sprout, 
      text: "Fertilizer for sukuma wiki", 
      gradient: "from-green-500 to-green-600",
      description: "Optimize crop nutrition with AI"
    },
    { 
      icon: DollarSign, 
      text: "Loan eligibility check", 
      gradient: "from-yellow-500 to-yellow-600",
      description: "AI-driven financial guidance"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {quickQueries.map((query, index) => (
        <div
          key={index}
          onClick={() => onQuerySelect(query.text)}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden"
        >
          <div className={`bg-gradient-to-br ${query.gradient} p-6 relative`}>
            <div className="absolute top-2 right-2 opacity-20">
              <Cpu size={24} />
            </div>
            <query.icon className="text-white mb-3" size={32} />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs font-medium">AI POWERED</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
              {query.text}
            </h3>
            <p className="text-gray-500 text-sm">{query.description}</p>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <Zap size={12} className="mr-1" />
              <span>Instant AI Response</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickQueries;