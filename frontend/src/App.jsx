// import React, { useState, useEffect } from 'react';
// import { MessageCircle, Cloud, Bug, Sprout, DollarSign, TrendingUp, Users, Activity, Send, Loader, MapPin, Phone, User, History, BarChart3, Home, Menu, X, Cpu, Zap, Brain, Wifi, CheckCircle, AlertCircle } from 'lucide-react';

// // API Configuration
// const API_BASE_URL = 'http://localhost:8000/api';

// // Utility function to clean response
// const cleanResponse = (response) => {
//   if (typeof response === 'string' && response.length > 22) {
//     // Remove first 17 characters and last 5 characters
//     return response.slice(17, -5);
//   }
//   return response;
// };

// // API Functions
// const api = {
//   processQuery: async (query, location = 'Nairobi', farmerId = null) => {
//     const payload = { query, location };
//     if (farmerId !== null) {
//       payload.farmer_id = farmerId;
//     }
    
//     const response = await fetch(`${API_BASE_URL}/query/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });
//     const data = await response.json();
    
//     // Clean the response if it contains the unwanted characters
//     if (data.response) {
//       data.response = cleanResponse(data.response);
//     }
    
//     return data;
//   },
  
//   getHistory: async (farmerId = null) => {
//     const url = farmerId ? `${API_BASE_URL}/history/?farmer_id=${farmerId}` : `${API_BASE_URL}/history/`;
//     const response = await fetch(url);
//     const data = await response.json();
    
//     // Clean responses in history
//     if (Array.isArray(data)) {
//       data.forEach(item => {
//         if (item.response_text) {
//           item.response_text = cleanResponse(item.response_text);
//         }
//       });
//     }
    
//     return data;
//   },
  
//   getDashboardStats: async () => {
//     const response = await fetch(`${API_BASE_URL}/dashboard/`);
//     return response.json();
//   },
  
//   createProfile: async (profileData) => {
//     const response = await fetch(`${API_BASE_URL}/profile/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(profileData)
//     });
//     return response.json();
//   }
// };

// // AI Status Indicator Component
// const AIStatusIndicator = () => {
//   const [status, setStatus] = useState('active');
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStatus(prev => prev === 'active' ? 'processing' : 'active');
//     }, 3000);
    
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-2 rounded-full border border-blue-200/50">
//       <div className="relative">
//         <Brain className="text-blue-600" size={16} />
//         <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
//           status === 'active' ? 'bg-green-400' : 'bg-blue-400'
//         } animate-pulse`}></div>
//       </div>
//       <span className="text-sm font-medium text-gray-700">AI Assistant {status === 'active' ? 'Ready' : 'Processing'}</span>
//     </div>
//   );
// };

// // Enhanced Quick Query Buttons Component
// const QuickQueries = ({ onQuerySelect }) => {
//   const quickQueries = [
//     { 
//       icon: Cloud, 
//       text: "Weather forecast for maize", 
//       gradient: "from-blue-500 to-blue-600",
//       description: "Get AI-powered weather insights"
//     },
//     { 
//       icon: Bug, 
//       text: "Pest control for tomatoes", 
//       gradient: "from-red-500 to-red-600",
//       description: "Smart pest management solutions"
//     },
//     { 
//       icon: Sprout, 
//       text: "Fertilizer for sukuma wiki", 
//       gradient: "from-green-500 to-green-600",
//       description: "Optimize crop nutrition with AI"
//     },
//     { 
//       icon: DollarSign, 
//       text: "Loan eligibility check", 
//       gradient: "from-yellow-500 to-yellow-600",
//       description: "AI-driven financial guidance"
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//       {quickQueries.map((query, index) => (
//         <div
//           key={index}
//           onClick={() => onQuerySelect(query.text)}
//           className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden"
//         >
//           <div className={`bg-gradient-to-br ${query.gradient} p-6 relative`}>
//             <div className="absolute top-2 right-2 opacity-20">
//               <Cpu size={24} />
//             </div>
//             <query.icon className="text-white mb-3" size={32} />
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
//               <span className="text-white/80 text-xs font-medium">AI POWERED</span>
//             </div>
//           </div>
//           <div className="p-6">
//             <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
//               {query.text}
//             </h3>
//             <p className="text-gray-500 text-sm">{query.description}</p>
//             <div className="mt-4 flex items-center text-xs text-gray-400">
//               <Zap size={12} className="mr-1" />
//               <span>Instant AI Response</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Enhanced Chat Interface Component
// const ChatInterface = ({ onSubmit, loading }) => {
//   const [query, setQuery] = useState('');
//   const [location, setLocation] = useState('Nairobi');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       onSubmit(query, location);
//       setQuery('');
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50 backdrop-blur-sm">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl mr-4">
//             <MessageCircle className="text-white" size={24} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Ask AgriSafi AI</h2>
//             <p className="text-gray-500 text-sm">Powered by advanced agricultural intelligence</p>
//           </div>
//         </div>
//         <AIStatusIndicator />
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="relative">
//           <textarea
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Ask about weather patterns, pest management, crop optimization, financial guidance..."
//             className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none h-32 bg-gray-50/50"
//             disabled={loading}
//             rows={3}
//           />
//           <div className="absolute bottom-4 right-4 flex items-center space-x-2">
//             <div className="bg-blue-100 px-2 py-1 rounded-full">
//               <span className="text-xs text-blue-600 font-medium">AI</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-3 flex-1">
//             <MapPin size={20} className="text-gray-400" />
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50/50"
//               disabled={loading}
//             >
//               <option value="Nairobi">Nairobi</option>
//               <option value="Kisumu">Kisumu</option>
//               <option value="Mombasa">Mombasa</option>
//               <option value="Nakuru">Nakuru</option>
//               <option value="Eldoret">Eldoret</option>
//             </select>
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading || !query.trim()}
//             className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-8 rounded-xl flex items-center space-x-3 transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
//           >
//             {loading ? (
//               <>
//                 <Loader className="animate-spin" size={20} />
//                 <span className="font-medium">Processing...</span>
//               </>
//             ) : (
//               <>
//                 <Send size={20} />
//                 <span className="font-medium">Ask AI</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Enhanced Response Display Component
// const ResponseDisplay = ({ response, query, location }) => {
//   if (!response) return null;

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-8 mt-8 border border-gray-100/50 backdrop-blur-sm">
//       <div className="flex items-center mb-6">
//         <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl mr-4">
//           <Brain className="text-white" size={20} />
//         </div>
//         <div>
//           <h3 className="text-xl font-bold text-gray-800">AI Agricultural Insights</h3>
//           <p className="text-gray-500 text-sm">Personalized recommendations for your farm</p>
//         </div>
//       </div>
      
//       <div className="space-y-6">
//         <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-2xl border border-gray-200/50">
//           <div className="flex items-center mb-3">
//             <MapPin className="text-gray-500 mr-2" size={16} />
//             <span className="text-sm font-medium text-gray-600">Query from {location}</span>
//           </div>
//           <p className="text-gray-800 font-medium text-lg">{query}</p>
//         </div>
        
//         <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border-l-4 border-green-500 relative overflow-hidden">
//           <div className="absolute top-0 right-0 opacity-5">
//             <Cpu size={80} />
//           </div>
//           <div className="flex items-center mb-4">
//             <CheckCircle className="text-green-600 mr-2" size={16} />
//             <span className="text-sm font-medium text-green-700">AI Analysis Complete</span>
//           </div>
//           <div className="prose prose-green max-w-none">
//             {response.split('\n').map((line, index) => (
//               <p key={index} className="text-gray-800 mb-3 leading-relaxed">
//                 {line}
//               </p>
//             ))}
//           </div>
//           <div className="mt-4 pt-4 border-t border-green-200/50 flex items-center text-xs text-green-600">
//             <Zap size={12} className="mr-1" />
//             <span>Powered by Agricultural AI</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Dashboard Stats Component
// const DashboardStats = ({ stats }) => {
//   if (!stats) return null;

//   const statCards = [
//     { 
//       icon: Activity, 
//       label: 'Total AI Queries', 
//       value: stats.total_queries, 
//       gradient: 'from-blue-500 to-blue-600',
//       change: '+12%'
//     },
//     { 
//       icon: Cloud, 
//       label: 'Weather Insights', 
//       value: stats.query_breakdown.weather, 
//       gradient: 'from-cyan-500 to-blue-500',
//       change: '+8%'
//     },
//     { 
//       icon: Bug, 
//       label: 'Pest Solutions', 
//       value: stats.query_breakdown.pest, 
//       gradient: 'from-red-500 to-pink-500',
//       change: '+15%'
//     },
//     { 
//       icon: Sprout, 
//       label: 'Crop Guidance', 
//       value: stats.query_breakdown.crop, 
//       gradient: 'from-green-500 to-emerald-500',
//       change: '+20%'
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//       {statCards.map((stat, index) => (
//         <div key={index} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
//           <div className="flex items-center justify-between mb-4">
//             <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
//               <stat.icon className="text-white" size={24} />
//             </div>
//             <div className="text-right">
//               <span className="text-green-600 text-sm font-medium">{stat.change}</span>
//             </div>
//           </div>
//           <div>
//             <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
//             <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
//           </div>
//           <div className="mt-4 flex items-center text-xs text-gray-400">
//             <Brain size={12} className="mr-1" />
//             <span>AI Powered</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Enhanced Query History Component
// const QueryHistory = ({ history }) => {
//   if (!history || history.length === 0) {
//     return (
//       <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
//         <div className="flex items-center mb-6">
//           <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-2xl mr-4">
//             <History className="text-white" size={20} />
//           </div>
//           <h3 className="text-xl font-bold text-gray-800">AI Query History</h3>
//         </div>
//         <div className="text-center py-12">
//           <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <MessageCircle className="text-gray-400" size={32} />
//           </div>
//           <p className="text-gray-500 text-lg">No queries yet</p>
//           <p className="text-gray-400 text-sm">Start by asking your AI assistant a question!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
//       <div className="flex items-center mb-6">
//         <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-2xl mr-4">
//           <History className="text-white" size={20} />
//         </div>
//         <h3 className="text-xl font-bold text-gray-800">Recent AI Interactions</h3>
//       </div>
//       <div className="space-y-6">
//         {history.slice(0, 5).map((item, index) => (
//           <div key={index} className="border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all bg-gradient-to-r from-gray-50/50 to-blue-50/30">
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="bg-blue-100 px-3 py-1 rounded-full">
//                   <span className="text-blue-700 text-xs font-medium">{item.query_type || 'AI Query'}</span>
//                 </div>
//                 <span className="text-gray-500 text-sm">{item.location}</span>
//               </div>
//               <span className="text-gray-400 text-xs">
//                 {new Date(item.created_at).toLocaleDateString()}
//               </span>
//             </div>
//             <div className="space-y-3">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-2">Question:</p>
//                 <p className="text-gray-800 bg-white/80 p-3 rounded-xl border border-gray-200/50">
//                   {item.query_text}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-2">AI Response:</p>
//                 <p className="text-gray-700 bg-green-50/80 p-3 rounded-xl border-l-4 border-green-500">
//                   {item.response_text}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const AgriSafiApp = () => {
//   const [currentView, setCurrentView] = useState('home');
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState('Nairobi');
//   const [history, setHistory] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       const [historyData, statsData] = await Promise.all([
//         api.getHistory(),
//         api.getDashboardStats()
//       ]);
//       setHistory(historyData);
//       setStats(statsData);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//     }
//   };

//   const handleQuery = async (queryText, queryLocation) => {
//     setLoading(true);
//     setQuery(queryText);
//     setLocation(queryLocation);
//     setResponse(null);

//     try {
//       const result = await api.processQuery(queryText, queryLocation);
//       if (result.success) {
//         setResponse(result.response);
//         loadDashboardData();
//       } else {
//         setResponse('Sorry, there was an error processing your query. Please try again.');
//       }
//     } catch (error) {
//       setResponse('Connection error. Please check your internet connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigation = [
//     { name: 'Home', view: 'home', icon: Home },
//     { name: 'History', view: 'history', icon: History },
//     { name: 'Dashboard', view: 'dashboard', icon: BarChart3 },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
//       {/* Enhanced Header */}
//       <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl mr-4 shadow-lg">
//                 <Sprout className="text-white" size={32} />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                   AgriSafi
//                 </h1>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-500">Smart Farming Assistant</span>
//                   <div className="flex items-center space-x-1">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                     <span className="text-xs text-green-600 font-medium">AI Powered</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-2">
//               {navigation.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => setCurrentView(item.view)}
//                   className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all font-medium ${
//                     currentView === item.view
//                       ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
//                       : 'text-gray-700 hover:bg-gray-100/80 hover:scale-105'
//                   }`}
//                 >
//                   <item.icon size={20} />
//                   <span>{item.name}</span>
//                 </button>
//               ))}
//             </nav>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-gray-700 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100/80 transition-all"
//               >
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
//             <nav className="px-4 py-4 space-y-2">
//               {navigation.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => {
//                     setCurrentView(item.view);
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`flex items-center space-x-3 w-full px-4 py-3 rounded-2xl transition-all ${
//                     currentView === item.view
//                       ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
//                       : 'text-gray-700 hover:bg-gray-100/80'
//                   }`}
//                 >
//                   <item.icon size={20} />
//                   <span className="font-medium">{item.name}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {currentView === 'home' && (
//           <div>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
//                 Where Agriculture Meets AI
//               </h2>
//               <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
//                 Experience the future of farming with our AI-powered assistant that provides intelligent insights on weather patterns, pest management, crop optimization, and financial guidance tailored to your needs.
//               </p>
//               <div className="flex items-center justify-center space-x-8 mt-8">
//                 <div className="flex items-center space-x-2 text-green-600">
//                   <CheckCircle size={20} />
//                   <span className="font-medium">Real-time Weather Data</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-blue-600">
//                   <Brain size={20} />
//                   <span className="font-medium">AI-Powered Insights</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-purple-600">
//                   <Zap size={20} />
//                   <span className="font-medium">Instant Solutions</span>
//                 </div>
//               </div>
//             </div>

//             <QuickQueries onQuerySelect={(text) => handleQuery(text, location)} />
            
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               <div>
//                 <ChatInterface onSubmit={handleQuery} loading={loading} />
//                 <ResponseDisplay response={response} query={query} location={location} />
//               </div>
              
//               <div>
//                 <QueryHistory history={history} />
//               </div>
//             </div>
//           </div>
//         )}

//         {currentView === 'history' && (
//           <div>
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
//                 AI Interaction History
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 Review your conversations with AgriSafi AI and track your agricultural insights
//               </p>
//             </div>
            
//             <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
//               {history.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <History className="text-purple-600" size={40} />
//                   </div>
//                   <p className="text-gray-500 text-xl mb-2">No queries yet</p>
//                   <p className="text-gray-400">Start by asking your AI assistant a question!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8">
//                   {history.map((item, index) => (
//                     <div key={index} className="border border-gray-200/50 rounded-3xl p-8 hover:shadow-lg transition-all bg-gradient-to-r from-gray-50/50 to-blue-50/30">
//                       <div className="flex justify-between items-start mb-6">
//                         <div className="flex items-center space-x-4">
//                           <div className="bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2 rounded-full">
//                             <span className="text-white text-sm font-medium">{item.query_type || 'AI Query'}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-gray-500">
//                             <MapPin size={16} />
//                             <span className="text-sm font-medium">{item.location}</span>
//                           </div>
//                         </div>
//                         <span className="text-gray-400 text-sm">
//                           {new Date(item.created_at).toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="space-y-6">
//                         <div>
//                           <p className="font-semibold text-gray-800 mb-3 flex items-center">
//                             <User className="mr-2" size={16} />
//                             Your Question:
//                           </p>
//                           <p className="text-gray-700 bg-white/80 p-4 rounded-2xl border border-gray-200/50 leading-relaxed">
//                             {item.query_text}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-800 mb-3 flex items-center">
//                             <Brain className="mr-2" size={16} />
//                             AI Response:
//                           </p>
//                           <div className="text-gray-700 bg-green-50/80 p-4 rounded-2xl border-l-4 border-green-500 leading-relaxed">
//                             {item.response_text.split('\n').map((line, lineIndex) => (
//                               <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//                 {currentView === 'dashboard' && (
//           <div>
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
//                 Agricultural AI Dashboard
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 Monitor your farming insights and AI interactions
//               </p>
//             </div>
            
//             <DashboardStats stats={stats} />
            
//             <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
//               <div className="flex items-center mb-6">
//                 <div className="bg-gradient-to-br from-blue-500 to-green-500 p-3 rounded-2xl mr-4">
//                   <BarChart3 className="text-white" size={20} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800">Detailed Analytics</h3>
//               </div>
              
//               {stats ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <div className="bg-gradient-to-r from-blue-50/50 to-green-50/50 p-6 rounded-2xl border border-gray-200/50">
//                     <h4 className="font-semibold text-gray-800 mb-4">Query Distribution</h4>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Weather Queries</span>
//                         <span className="font-medium text-blue-600">{stats.query_breakdown.weather}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Pest Management</span>
//                         <span className="font-medium text-red-600">{stats.query_breakdown.pest}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Crop Guidance</span>
//                         <span className="font-medium text-green-600">{stats.query_breakdown.crop}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Financial Queries</span>
//                         <span className="font-medium text-yellow-600">{stats.query_breakdown.financial}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-6 rounded-2xl border border-gray-200/50">
//                     <h4 className="font-semibold text-gray-800 mb-4">User Engagement</h4>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Active Users</span>
//                         <span className="font-medium text-purple-600">{stats.active_users}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Average Queries/User</span>
//                         <span className="font-medium text-purple-600">{stats.avg_queries_per_user}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Response Time</span>
//                         <span className="font-medium text-purple-600">{stats.avg_response_time}s</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-16">
//                   <div className="bg-gradient-to-br from-blue-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <BarChart3 className="text-blue-600" size={40} />
//                   </div>
//                   <p className="text-gray-500 text-xl mb-2">No analytics available</p>
//                   <p className="text-gray-400">Start interacting with AgriSafi AI to see your stats!</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-4">AgriSafi AI</h3>
//               <p className="text-gray-500 text-sm">
//                 Empowering farmers with AI-driven insights for smarter agriculture
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><button className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setCurrentView('home')}>Home</button></li>
//                 <li><button className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setCurrentView('history')}>History</button></li>
//                 <li><button className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setCurrentView('dashboard')}>Dashboard</button></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
//               <div className="space-y-2 text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <Phone size={16} />
//                   <span>+254 123 456 789</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <MapPin size={16} />
//                   <span>Nairobi, Kenya</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-12 pt-8 border-t border-gray-200/50 text-center">
//             <p className="text-gray-500 text-sm">
//               &copy; {new Date().getFullYear()} AgriSafi. All rights reserved.
//             </p>
//             <div className="flex items-center justify-center space-x-2 mt-2">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-xs text-gray-400">Powered by Advanced AI</span>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AgriSafiApp;


import React, { useState, useEffect } from 'react';
import MainLayout from './layout/MainLayout';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Utility function to clean response
const cleanResponse = (response) => {
  if (typeof response === 'string' && response.length > 22) {
    return response.slice(17, -5);
  }
  return response;
};

// API Functions
const api = {
  processQuery: async (query, location = 'Nairobi', farmerId = null) => {
    const payload = { query, location };
    if (farmerId !== null) {
      payload.farmer_id = farmerId;
    }
    
    const response = await fetch(`${API_BASE_URL}/query/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    if (data.response) {
      data.response = cleanResponse(data.response);
    }
    
    return data;
  },
  
  getHistory: async (farmerId = null) => {
    const url = farmerId ? `${API_BASE_URL}/history/?farmer_id=${farmerId}` : `${API_BASE_URL}/history/`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.response_text) {
          item.response_text = cleanResponse(item.response_text);
        }
      });
    }
    
    return data;
  },
  
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/`);
    return response.json();
  },
  
  createProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return response.json();
  }
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Nairobi');
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [historyData, statsData] = await Promise.all([
        api.getHistory(),
        api.getDashboardStats()
      ]);
      setHistory(historyData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleQuery = async (queryText, queryLocation) => {
    setLoading(true);
    setQuery(queryText);
    setLocation(queryLocation);
    setResponse(null);

    try {
      const result = await api.processQuery(queryText, queryLocation);
      if (result.success) {
        setResponse(result.response);
        loadDashboardData();
      } else {
        setResponse('Sorry, there was an error processing your query. Please try again.');
      }
    } catch (error) {
      setResponse('Connection error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      currentView={currentView}
      setCurrentView={setCurrentView}
      handleQuery={handleQuery}
      query={query}
      response={response}
      loading={loading}
      location={location}
      history={history}
      stats={stats}
    />
  );
};

export default App;