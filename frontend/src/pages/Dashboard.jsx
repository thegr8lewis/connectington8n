import React from 'react';
import { BarChart3 } from 'lucide-react';
import DashboardStats from '../components/DashboardStats';

const Dashboard = ({ stats }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Agricultural AI Dashboard
        </h2>
        <p className="text-gray-600 text-lg">
          Monitor your farming insights and AI interactions
        </p>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-green-500 p-3 rounded-2xl mr-4">
            <BarChart3 className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Detailed Analytics</h3>
        </div>
        
        {stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50/50 to-green-50/50 p-6 rounded-2xl border border-gray-200/50">
              <h4 className="font-semibold text-gray-800 mb-4">Query Distribution</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weather Queries</span>
                  <span className="font-medium text-blue-600">{stats.query_breakdown.weather}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pest Management</span>
                  <span className="font-medium text-red-600">{stats.query_breakdown.pest}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Crop Guidance</span>
                  <span className="font-medium text-green-600">{stats.query_breakdown.crop}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Financial Queries</span>
                  <span className="font-medium text-yellow-600">{stats.query_breakdown.financial}</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-6 rounded-2xl border border-gray-200/50">
              <h4 className="font-semibold text-gray-800 mb-4">User Engagement</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-medium text-purple-600">{stats.active_users}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Queries/User</span>
                  <span className="font-medium text-purple-600">{stats.avg_queries_per_user}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium text-purple-600">{stats.avg_response_time}s</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="text-blue-600" size={40} />
            </div>
            <p className="text-gray-500 text-xl mb-2">No analytics available</p>
            <p className="text-gray-400">Start interacting with AgriSafi AI to see your stats!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;