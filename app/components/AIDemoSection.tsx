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
  const [stats, setStats] = useState({ time: 45, distance: 120, co2: 15.2, fuel: 8.5 });
  const [path, setPath] = useState<'normal' | 'optimized'>('normal');
  const [selectedMode, setSelectedMode] = useState<'fastest' | 'eco' | 'safe'>('fastest');
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'stormy'>('sunny');
  const [traffic, setTraffic] = useState<'low' | 'medium' | 'high'>('medium');

  const handleOptimize = () => {
    setIsOptimizing(true);
    setPath('normal');

    // Simulate calculation based on factors
    setTimeout(() => {
      setPath('optimized');
      let baseTime = 30;
      let baseCo2 = 10;

      // Weather impact
      if (weather === 'rainy') { baseTime *= 1.2; baseCo2 *= 1.1; }
      if (weather === 'stormy') { baseTime *= 1.5; baseCo2 *= 1.3; }

      // Traffic impact
      if (traffic === 'medium') { baseTime *= 1.3; baseCo2 *= 1.4; }
      if (traffic === 'high') { baseTime *= 1.8; baseCo2 *= 2.0; }

      // Mode impact
      if (selectedMode === 'fastest') {
        setStats({
          time: Math.round(baseTime),
          distance: 98,
          co2: parseFloat((baseCo2 * 1.2).toFixed(1)),
          fuel: 7.2
        });
      } else if (selectedMode === 'eco') {
        setStats({
          time: Math.round(baseTime * 1.2),
          distance: 95,
          co2: parseFloat((baseCo2).toFixed(1)),
          fuel: 6.1
        });
      } else {
        setStats({
          time: Math.round(baseTime * 1.1),
          distance: 105,
          co2: parseFloat((baseCo2 * 1.1).toFixed(1)),
          fuel: 7.5
        });
      }
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-purple-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-50 rounded-full blur-2xl group-hover:bg-purple-100 transition-colors"></div>

      <div className="relative z-10 flex-1 flex flex-col">
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

        {/* Controls */}
        <div className="space-y-3 mb-4">
          {/* Mode Selection */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'fastest', label: '最快' },
              { id: 'eco', label: '節能' },
              { id: 'safe', label: '安全' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id as any)}
                className={`flex-1 py-1 rounded-md text-xs font-medium transition-all ${selectedMode === mode.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Environment Factors */}
          <div className="grid grid-cols-2 gap-2">
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value as any)}
              className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-600 focus:outline-none focus:border-purple-400"
            >
              <option value="sunny">☀️ 晴朗</option>
              <option value="rainy">🌧️ 雨天</option>
              <option value="stormy">⛈️ 暴雨</option>
            </select>
            <select
              value={traffic}
              onChange={(e) => setTraffic(e.target.value as any)}
              className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-600 focus:outline-none focus:border-purple-400"
            >
              <option value="low">🟢 車流順暢</option>
              <option value="medium">🟡 車流普通</option>
              <option value="high">🔴 車流壅塞</option>
            </select>
          </div>
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

            {/* Weather Overlay */}
            {weather !== 'sunny' && (
              <rect width="100%" height="100%" fill={weather === 'stormy' ? 'rgba(0,0,50,0.1)' : 'rgba(0,0,20,0.05)'} />
            )}

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
              stroke={traffic === 'high' ? '#fca5a5' : traffic === 'medium' ? '#fcd34d' : '#cbd5e1'}
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
            <div className="flex flex-col gap-1">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">預估時間</span>
                <span className={`font-mono font-bold ${path === 'optimized' ? 'text-green-600' : 'text-gray-900'}`}>
                  {stats.time} min
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">碳排放</span>
                <span className={`font-mono font-bold ${path === 'optimized' ? 'text-green-600' : 'text-gray-900'}`}>
                  {stats.co2} kg
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
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
    </div>
  );
}

function SmartLoadingDemo() {
  const [items, setItems] = useState<Array<{ id: number, w: number, color: string, type: string }>>([]);
  const [isPacking, setIsPacking] = useState(false);
  const [efficiency, setEfficiency] = useState(65);
  const [balance, setBalance] = useState(50); // 50 is perfect center
  const [containerType, setContainerType] = useState<'20ft' | '40ft'>('20ft');

  const generateItems = () => {
    setIsPacking(true);
    setItems([]);
    setEfficiency(65);
    setBalance(50);

    let count = 0;
    const maxItems = containerType === '20ft' ? 12 : 20;
    const targetEfficiency = containerType === '20ft' ? 94 : 96;

    const interval = setInterval(() => {
      if (count >= maxItems) {
        clearInterval(interval);
        setIsPacking(false);
        setEfficiency(targetEfficiency);
        setBalance(48 + Math.random() * 4); // Random final balance close to 50
        return;
      }

      const isHeavy = Math.random() > 0.7;
      const isFragile = Math.random() > 0.8;

      let color = 'bg-blue-400';
      if (isHeavy) color = 'bg-slate-600';
      if (isFragile) color = 'bg-amber-400';

      setItems(prev => [...prev, {
        id: Math.random(),
        w: Math.random() > 0.5 ? 2 : 1,
        color: color,
        type: isHeavy ? 'heavy' : isFragile ? 'fragile' : 'standard'
      }]);

      setEfficiency(prev => Math.min(targetEfficiency, prev + (targetEfficiency - 65) / maxItems));
      count++;
    }, 150);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-blue-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>

      <div className="relative z-10 flex-1 flex flex-col">
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
              {efficiency.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Container Type Selection */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setContainerType('20ft')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${containerType === '20ft' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            20呎標準櫃
          </button>
          <button
            onClick={() => setContainerType('40ft')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${containerType === '40ft' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            40呎高櫃
          </button>
        </div>

        {/* Legend */}
        <div className="flex gap-3 mb-2 text-[10px] text-gray-500">
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded"></div>一般</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-600 rounded"></div>重物(底部)</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-400 rounded"></div>易碎(頂部)</div>
        </div>

        {/* Container Visualization */}
        <div className="relative h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 mb-4 p-2 flex flex-wrap content-end gap-1 overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-10 rounded shadow-sm border border-white/20 animate-[bounce_0.5s] flex items-center justify-center text-[10px] text-white/80`}
              style={{ width: item.w === 2 ? 'calc(50% - 4px)' : 'calc(25% - 4px)' }}
            >
              {item.type === 'heavy' && '⚖️'}
              {item.type === 'fragile' && '🥚'}
            </div>
          ))}
          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              等待裝載...
            </div>
          )}

          {/* Balance Indicator */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              className={`h-full transition-all duration-300 ${Math.abs(balance - 50) < 5 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: '10%', left: `${balance - 5}%`, position: 'absolute' }}
            ></div>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={generateItems}
            disabled={isPacking}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isPacking ? '正在計算最佳堆疊...' : '開始模擬裝載'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AnomalyDetectionDemo() {
  const [isScanning, setIsScanning] = useState(true);
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [camera, setCamera] = useState('CAM_01');
  const [sensitivity, setSensitivity] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!anomalyDetected) {
        setLogs(prev => [`掃描正常 - ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 3));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [anomalyDetected]);

  const toggleSimulation = () => {
    setAnomalyDetected(false);
    setIsScanning(true);
    setLogs([]);

    // Randomly trigger anomaly after 1-3 seconds
    setTimeout(() => {
      setAnomalyDetected(true);
      setLogs(prev => [`⚠️ 偵測到異常活動 (${camera}) - ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 3));
    }, Math.random() * 2000 + 1000);
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white border p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full ${anomalyDetected ? 'border-red-500 ring-2 ring-red-100' : 'border-red-100'}`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-50 rounded-full blur-2xl group-hover:bg-red-100 transition-colors"></div>

      <div className="relative z-10 flex-1 flex flex-col">
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

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <select
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-600 flex-1"
          >
            <option value="CAM_01">CAM_01 大門入口</option>
            <option value="CAM_02">CAM_02 倉庫B區</option>
            <option value="CAM_03">CAM_03 卸貨碼頭</option>
          </select>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>敏銳度:</span>
            <input
              type="range"
              min="50"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-16 accent-red-500"
            />
          </div>
        </div>

        {/* Logs */}
        <div className="mb-4 bg-gray-50 rounded p-2 text-xs font-mono text-gray-500 h-16 overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className={log.includes('⚠️') ? 'text-red-600 font-bold' : ''}>{log}</div>
          ))}
          {logs.length === 0 && <div>系統待命中...</div>}
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
                CONFIDENCE: {(sensitivity + Math.random() * 5).toFixed(1)}%
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
            {camera} • {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={toggleSimulation}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${anomalyDetected ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            {anomalyDetected ? '重置系統' : '模擬入侵測試'}
          </button>
        </div>
      </div>
    </div>
  );
}
