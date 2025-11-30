'use client';

import { useState, useEffect } from 'react';

export default function AIDemoSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">AI Core Beta</div>
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          未來智能實驗室
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RouteOptimizationDemo />
        <SmartLoadingDemo />
        <AnomalyDetectionDemo />
      </div>
    </div>
  );
}

function RouteOptimizationDemo() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [stats, setStats] = useState({ time: 45, distance: 120 });
  const [path, setPath] = useState<'normal' | 'optimized'>('normal');

  const handleOptimize = () => {
    setIsOptimizing(true);
    setPath('normal');

    // Simulate calculation
    setTimeout(() => {
      setPath('optimized');
      setStats({ time: 32, distance: 98 });
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-purple-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-50 rounded-full blur-2xl group-hover:bg-purple-100 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">AI 動態路徑預測</h3>
          </div>
          {isOptimizing && <span className="text-xs font-mono text-purple-600 animate-pulse">CALCULATING...</span>}
        </div>

        {/* Map Visualization */}
        <div className="relative h-48 bg-gray-50 rounded-lg border border-gray-200 mb-4 overflow-hidden p-4">
          <svg className="w-full h-full" viewBox="0 0 200 120">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Nodes */}
            <circle cx="20" cy="100" r="4" className="fill-gray-400" /> {/* Start */}
            <circle cx="180" cy="20" r="4" className="fill-gray-400" /> {/* End */}
            <circle cx="80" cy="40" r="3" className="fill-gray-300" />
            <circle cx="120" cy="90" r="3" className="fill-gray-300" />
            <circle cx="100" cy="60" r="3" className="fill-gray-300" />

            {/* Normal Path (Traffic) */}
            <path
              d="M 20 100 Q 80 40 100 60 T 180 20"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4 4"
              className={`transition-all duration-500 ${path === 'optimized' ? 'opacity-30' : 'opacity-100'}`}
            />

            {/* Optimized Path */}
            <path
              d="M 20 100 Q 120 90 180 20"
              fill="none"
              stroke="#9333ea"
              strokeWidth="3"
              strokeLinecap="round"
              className={`transition-all duration-1000 ${path === 'optimized' ? 'opacity-100' : 'opacity-0'}`}
              style={{ strokeDasharray: 200, strokeDashoffset: path === 'optimized' ? 0 : 200 }}
            />

            {/* Moving Dot */}
            {path === 'optimized' && (
              <circle r="3" fill="#ec4899">
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path="M 20 100 Q 120 90 180 20"
                />
              </circle>
            )}
          </svg>

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs border border-gray-200 shadow-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">預估時間</span>
              <span className={`font-mono font-bold ${path === 'optimized' ? 'text-green-600' : 'text-gray-900'}`}>
                {stats.time} min
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isOptimizing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              正在分析路況...
            </>
          ) : (
            '執行路徑優化'
          )}
        </button>
      </div>
    </div>
  );
}

function SmartLoadingDemo() {
  const [items, setItems] = useState<Array<{ id: number, w: number, color: string }>>([]);
  const [isPacking, setIsPacking] = useState(false);
  const [efficiency, setEfficiency] = useState(65);

  const generateItems = () => {
    setIsPacking(true);
    setItems([]);
    setEfficiency(65);

    let count = 0;
    const interval = setInterval(() => {
      if (count >= 12) {
        clearInterval(interval);
        setIsPacking(false);
        setEfficiency(94);
        return;
      }

      setItems(prev => [...prev, {
        id: Math.random(),
        w: Math.random() > 0.5 ? 2 : 1,
        color: ['bg-blue-400', 'bg-blue-500', 'bg-indigo-400', 'bg-cyan-400'][Math.floor(Math.random() * 4)]
      }]);
      setEfficiency(prev => Math.min(94, prev + 2));
      count++;
    }, 150);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-blue-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">3D 智慧裝載</h3>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">空間利用率</div>
            <div className={`font-mono font-bold ${efficiency > 90 ? 'text-green-600' : 'text-blue-600'}`}>
              {efficiency}%
            </div>
          </div>
        </div>

        {/* Container Visualization */}
        <div className="relative h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 mb-4 p-2 flex flex-wrap content-end gap-1 overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-10 rounded shadow-sm border border-white/20 animate-[bounce_0.5s]`}
              style={{ width: item.w === 2 ? 'calc(50% - 4px)' : 'calc(25% - 4px)' }}
            ></div>
          ))}
          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              等待裝載...
            </div>
          )}
        </div>

        <button
          onClick={generateItems}
          disabled={isPacking}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {isPacking ? '正在計算最佳堆疊...' : '開始模擬裝載'}
        </button>
      </div>
    </div>
  );
}

function AnomalyDetectionDemo() {
  const [isScanning, setIsScanning] = useState(true);
  const [anomalyDetected, setAnomalyDetected] = useState(false);

  const toggleSimulation = () => {
    setAnomalyDetected(false);
    setIsScanning(true);

    // Randomly trigger anomaly after 1-3 seconds
    setTimeout(() => {
      setAnomalyDetected(true);
    }, Math.random() * 2000 + 1000);
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white border p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ${anomalyDetected ? 'border-red-500 ring-2 ring-red-100' : 'border-red-100'}`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-50 rounded-full blur-2xl group-hover:bg-red-100 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors ${anomalyDetected ? 'bg-red-600 text-white animate-pulse' : 'bg-red-100 text-red-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">異常行為預警</h3>
          </div>
          {anomalyDetected && <span className="text-xs font-bold text-red-600 animate-ping">ALERT</span>}
        </div>

        {/* Camera Feed Visualization */}
        <div className="relative h-48 bg-black rounded-lg mb-4 overflow-hidden group-hover:shadow-inner">
          {/* Static Noise / Background */}
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {/* Scanning Line */}
          {!anomalyDetected && (
            <div className="absolute top-0 w-full h-1 bg-green-400/50 shadow-[0_0_15px_rgba(74,222,128,0.5)] animate-[scan_3s_linear_infinite]"></div>
          )}

          {/* Anomaly Box */}
          {anomalyDetected && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-red-500 bg-red-500/10 flex items-center justify-center">
              <div className="absolute -top-6 left-0 bg-red-600 text-white text-[10px] px-1 py-0.5 font-mono">
                CONFIDENCE: 99.8%
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500"></div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-green-500">
            CAM_04_GATE_A • {new Date().toLocaleTimeString()}
          </div>
        </div>

        <button
          onClick={toggleSimulation}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${anomalyDetected ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-red-600 hover:bg-red-700 text-white'}`}
        >
          {anomalyDetected ? '重置系統' : '模擬入侵測試'}
        </button>
      </div>
    </div>
  );
}
