import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import WeeklyFeatures from '../pages/WeeklyFeatures';

const MainLayout = ({
  currentView,
  setCurrentView,
  handleQuery,
  query,
  response,
  loading,
  location,
  history,
  stats,
  weeklyWeather,
  calendarEvents,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'home' && (
          <Home
            handleQuery={handleQuery}
            query={query}
            response={response}
            loading={loading}
            location={location}
            history={history}
          />
        )}
        {currentView === 'dashboard' && (
          <Dashboard stats={stats} />
        )}
        {currentView === 'history' && (
          <History history={history} />
        )}
        {currentView === 'weekly' && (
          <WeeklyFeatures
            weeklyWeather={weeklyWeather}
            calendarEvents={calendarEvents}
            location={location}
          />
        )}
      </main>
      
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
};

export default MainLayout;