import React from 'react';
import { History, MessageCircle, User, Brain, MapPin } from 'lucide-react';

const QueryHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-2xl mr-4">
            <History className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">AI Query History</h3>
        </div>
        <div className="text-center py-12">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500 text-lg">No queries yet</p>
          <p className="text-gray-400 text-sm">Start by asking your AI assistant a question!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-2xl mr-4">
          <History className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Recent AI Interactions</h3>
      </div>
      <div className="space-y-6">
        {history.slice(0, 5).map((item, index) => (
          <div key={index} className="border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all bg-gradient-to-r from-gray-50/50 to-blue-50/30">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-blue-700 text-xs font-medium">{item.query_type || 'AI Query'}</span>
                </div>
                </div>
              <span className="text-gray-400 text-xs">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Question:</p>
                <p className="text-gray-800 bg-white/80 p-3 rounded-xl border border-gray-200/50">
                  {item.query_text}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">AI Response:</p>
                <p className="text-gray-700 bg-green-50/80 p-3 rounded-xl border-l-4 border-green-500">
                  {item.response_text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryHistory;