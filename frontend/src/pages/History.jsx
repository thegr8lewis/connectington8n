import React from 'react';
import { History as HistoryIcon, User, Brain, MapPin } from 'lucide-react'; // Alias History icon as HistoryIcon

const History = ({ history }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          AI Interaction History
        </h2>
        <p className="text-gray-600 text-lg">
          Review your conversations with AgriSafi AI and track your agricultural insights
        </p>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
        {history.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <HistoryIcon className="text-purple-600" size={40} /> {/* Use HistoryIcon instead of History */}
            </div>
            <p className="text-gray-500 text-xl mb-2">No queries yet</p>
            <p className="text-gray-400">Start by asking your AI assistant a question!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {history.map((item, index) => (
              <div key={index} className="border border-gray-200/50 rounded-3xl p-8 hover:shadow-lg transition-all bg-gradient-to-r from-gray-50/50 to-blue-50/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 rounded-full">
                      <span className="text-white text-sm font-medium">{item.query_type || 'AI Query'}</span>
                    </div>
                   
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="mr-2" size={16} />
                      Your Question:
                    </p>
                    <p className="text-gray-700 bg-white/80 p-4 rounded-2xl border border-gray-200/50 leading-relaxed">
                      {item.query_text}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Brain className="mr-2" size={16} />
                      AI Response:
                    </p>
                    <div className="text-gray-700 bg-green-50/80 p-4 rounded-2xl border-l-4 border-green-500 leading-relaxed">
                      {item.response_text.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;