// import React, { useState } from 'react';
// import { Calendar, Sun, CloudRain, Wind, Droplet } from 'lucide-react';

// const WeeklyFeatures = ({ weeklyWeather, calendarEvents, location }) => {
//   const [optimizedPlan, setOptimizedPlan] = useState([]);

//   // Simple AI optimization logic (replace with xAI API or custom algorithm in production)
//   const optimizeWeeklyPlan = () => {
//     const tasks = [
//       { id: 1, name: 'Planting Maize', duration: 2, weatherPreference: ['Clear', 'Clouds'] },
//       { id: 2, name: 'Fertilizer Application', duration: 2, weatherPreference: ['Clear', 'Clouds'] },
//       { id: 3, name: 'Pest Control', duration: 1, weatherPreference: ['Clear'] },
//       { id: 4, name: 'Irrigation', duration: 1, weatherPreference: ['Clouds', 'Rain'] },
//     ];

//     const plan = [];
//     const days = weeklyWeather.map((day) => ({
//       date: day.date,
//       weather: day.weather,
//       availableSlots: [
//         { start: '08:00', end: '12:00' },
//         { start: '13:00', end: '17:00' },
//       ],
//     }));

//     // Remove occupied slots from calendar events
//     calendarEvents.forEach((event) => {
//       const eventDate = event.date;
//       const day = days.find((d) => d.date === eventDate);
//       if (day) {
//         day.availableSlots = day.availableSlots.filter(
//           (slot) => slot.start >= event.end || slot.end <= event.start
//         );
//       }
//     });

//     // Assign tasks to suitable days and slots
//     tasks.forEach((task) => {
//       for (let i = 0; i < days.length; i++) {
//         const day = days[i];
//         if (task.weatherPreference.includes(day.weather)) {
//           const slot = day.availableSlots.find(
//             (s) =>
//               (parseInt(s.end.split(':')[0]) - parseInt(s.start.split(':')[0])) >= task.duration
//           );
//           if (slot) {
//             plan.push({
//               task: task.name,
//               date: day.date,
//               start: slot.start,
//               end: `${parseInt(slot.start.split(':')[0]) + task.duration}:00`,
//               weather: day.weather,
//             });
//             // Update available slots
//             day.availableSlots = day.availableSlots.filter((s) => s !== slot);
//             break;
//           }
//         }
//       }
//     });

//     setOptimizedPlan(plan);
//   };

//   // Run optimization on mount or when data changes
//   React.useEffect(() => {
//     optimizeWeeklyPlan();
//   }, [weeklyWeather, calendarEvents]);

//   return (
//     <div>
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
//           Weekly Farming Plan
//         </h2>
//         <p className="text-gray-600 text-lg">
//           AI-optimized schedule based on your calendar and {location} weather forecast
//         </p>
//       </div>

//       {/* Weather Forecast */}
//       <div className="mb-12">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//           <Sun className="mr-2" size={24} />
//           7-Day Weather Forecast for {location}
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {weeklyWeather.length > 0 ? (
//             weeklyWeather.map((day, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100/50"
//               >
//                 <p className="font-semibold text-gray-800">{day.date}</p>
//                 <div className="flex items-center space-x-2 mt-2">
//                   {day.weather === 'Rain' ? (
//                     <CloudRain className="text-blue-500" size={20} />
//                   ) : day.weather === 'Clear' ? (
//                     <Sun className="text-yellow-500" size={20} />
//                   ) : (
//                     <Wind className="text-gray-500" size={20} />
//                   )}
//                   <p className="text-gray-600">{day.description}</p>
//                 </div>
//                 <p className="text-gray-500 mt-2">Temp: {day.temp}°C</p>
//                 <p className="text-gray-500">Humidity: {day.humidity}%</p>
//                 <p className="text-gray-500">Wind: {day.wind} m/s</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No weather data available</p>
//           )}
//         </div>
//       </div>

//       {/* Optimized Plan */}
//       <div>
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//           <Calendar className="mr-2" size={24} />
//           Optimized Weekly Plan
//         </h3>
//         {optimizedPlan.length > 0 ? (
//           <div className="space-y-6">
//             {optimizedPlan.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-l-4 border-green-500"
//               >
//                 <p className="font-semibold text-gray-800">{item.task}</p>
//                 <p className="text-gray-600">
//                   {item.date} | {item.start} - {item.end}
//                 </p>
//                 <p className="text-gray-500">Weather: {item.weather}</p>
//                 <button
//                   className="mt-4 bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition-all"
//                   onClick={() => alert(`Task ${item.task} added to calendar!`)} // Replace with actual calendar API integration
//                 >
//                   Add to Calendar
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="bg-gradient-to-br from-green-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Calendar className="text-green-600" size={40} />
//             </div>
//             <p className="text-gray-500 text-xl mb-2">No optimized plan available</p>
//             <p className="text-gray-400">Add tasks or update your calendar to generate a plan.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeeklyFeatures;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeeklyFeatures = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/weekly-features/');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">AgriSafi Weekly Features</h1>
      
      {/* Daily Stats */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Today's Weather in Nairobi</h2>
        <p>Temperature: {data.daily_stats?.temperature}°C</p>
        <p>Humidity: {data.daily_stats?.humidity}%</p>
        <p>Rainfall: {data.daily_stats?.rainfall} mm</p>
        <p>Description: {data.daily_stats?.description}</p>
      </div>

      {/* Weekly Stats */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Weekly Weather Overview</h2>
        <p>Week Start: {data.weekly_stats?.weekStart}</p>
        <p>Average Temperature: {data.weekly_stats?.avgTemp}°C</p>
        <p>Total Rainfall: {data.weekly_stats?.totalRainfall} mm</p>
        <p>Description: {data.weekly_stats?.description}</p>
      </div>

      {/* Weekly Plan */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your Weekly Farming Plan</h2>
        {data.weekly_plan?.length > 0 ? (
          <ul className="list-disc pl-5">
            {data.weekly_plan.map((event, index) => (
              <li key={index}>
                {event.summary} on {new Date(event.start).toLocaleDateString()} - {event.description || 'No details'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled this week.</p>
        )}
      </div>

      {/* AI Advice */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Farming Advice</h2>
        <p>{data.advice}</p>
      </div>
    </div>
  );
};

export default WeeklyFeatures;