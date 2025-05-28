import React from 'react';
import { Activity, Cloud, Bug, Sprout, Brain } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    { 
      icon: Activity, 
      label: 'Total AI Queries', 
      value: stats.total_queries, 
      gradient: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    { 
      icon: Cloud, 
      label: 'Weather Insights', 
      value: stats.query_breakdown.weather, 
      gradient: 'from-cyan-500 to-blue-500',
      change: '+8%'
    },
    { 
      icon: Bug, 
      label: 'Pest Solutions', 
      value: stats.query_breakdown.pest, 
      gradient: 'from-red-500 to-pink-500',
      change: '+15%'
    },
    { 
      icon: Sprout, 
      label: 'Crop Guidance', 
      value: stats.query_breakdown.crop, 
      gradient: 'from-green-500 to-emerald-500',
      change: '+20%'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div className="text-right">
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400">
            <Brain size={12} className="mr-1" />
            <span>AI Powered</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;