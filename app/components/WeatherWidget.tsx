import React from 'react';

export default function WeatherWidget() {
  // Mock data - in a real app this would come from an API
  const weather = {
    temp: 28,
    condition: 'Cloudy',
    windSpeed: 12, // knots
    windDirection: 'NE',
    humidity: 65,
    tarmacStatus: 'Dry',
    visibility: '10km'
  };

  const getTarmacStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'dry': return 'bg-green-100 text-green-700 border-green-200';
      case 'wet': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'icy': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Main Weather Info */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            {/* Sun/Cloud Icon */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{weather.temp}°C</div>
            <div className="text-sm text-gray-500 font-medium">{weather.condition}</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto">

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Wind</span>
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-gray-700">{weather.windSpeed} kts {weather.windDirection}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Humidity</span>
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="font-semibold text-gray-700">{weather.humidity}%</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Visibility</span>
            <span className="font-semibold text-gray-700 mt-1">{weather.visibility}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tarmac</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mt-1 w-fit ${getTarmacStatusColor(weather.tarmacStatus)}`}>
              {weather.tarmacStatus}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
