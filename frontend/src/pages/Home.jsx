import React from 'react';
import { CheckCircle, Brain, Zap } from 'lucide-react';
import QuickQueries from '../components/QuickQueries';
import ChatInterface from '../components/ChatInterface';
import ResponseDisplay from '../components/ResponseDisplay';
import QueryHistory from '../components/QueryHistory';

const Home = ({ handleQuery, query, response, loading, location, history }) => {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Where Agriculture Meets AI
        </h2>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
          Experience the future of farming with our AI-powered assistant that provides intelligent insights on weather patterns, pest management, crop optimization, and financial guidance tailored to your needs.
        </p>
        <div className="flex items-center justify-center space-x-8 mt-8">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-medium">Real-time Weather Data</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Brain size={20} />
            <span className="font-medium">AI-Powered Insights</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-600">
            <Zap size={20} />
            <span className="font-medium">Instant Solutions</span>
          </div>
        </div>
      </div>

      <QuickQueries onQuerySelect={(text) => handleQuery(text, location)} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <ChatInterface onSubmit={handleQuery} loading={loading} />
          <ResponseDisplay response={response} query={query} location={location} />
        </div>
        
        <div>
          <QueryHistory history={history} />
        </div>
      </div>
    </div>
  );
};

export default Home;