'use client';

import { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import WeatherWidget from '../components/WeatherWidget';
import { Container } from '../types';

export default function GroundStaffPage() {
  const [containerNumber, setContainerNumber] = useState('');
  const [cargoName, setCargoName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [barcode, setBarcode] = useState('');
  const [destination, setDestination] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 模擬貨櫃數據
  const [containers] = useState<Container[]>([
    {
      id: '1',
      containerNumber: 'CNT-2024-001',
      status: 'loading',
      location: { latitude: 25.0330, longitude: 121.5654, address: '台灣桃園機場' },
      destination: '日本成田機場',
      items: [
        {
          id: '1',
          name: '電子零件',
          description: '半導體晶片',
          quantity: 100,
          weight: 50,
          category: '電子產品',
          registeredBy: '張三',
          registeredAt: new Date('2024-01-15T10:30:00'),
        },
      ],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-15T09:00:00'),
      updatedAt: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      containerNumber: 'CNT-2024-002',
      status: 'in_transit',
      location: { latitude: 24.8, longitude: 120.9, address: '運送途中' },
      destination: '韓國仁川機場',
      departureTime: new Date('2024-01-15T08:00:00'),
      estimatedArrival: new Date('2024-01-15T14:00:00'),
      currentTemperature: 22,
      currentHumidity: 55,
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-15T07:00:00'),
      updatedAt: new Date('2024-01-15T12:00:00'),
    },
    {
      id: '3',
      containerNumber: 'CNT-2024-003',
      status: 'anomaly',
      location: { latitude: 25.0330, longitude: 121.5654, address: '台灣桃園機場倉庫B' },
      destination: '新加坡樟宜機場',
      currentTemperature: 35,
      items: [],
      hasAnomaly: true,
      anomalies: [
        {
          id: '1',
          containerId: '3',
          type: 'temperature',
          severity: 'high',
          description: '溫度超過安全範圍',
          detectedAt: new Date('2024-01-15T11:00:00'),
          status: 'open',
          notes: [],
        },
      ],
      createdAt: new Date('2024-01-14T15:00:00'),
      updatedAt: new Date('2024-01-15T11:00:00'),
    },
  ]);

  const handleRegisterCargo = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setContainerNumber('');
      setCargoName('');
      setQuantity('');
      setWeight('');
      setBarcode('');
      setDestination('');
      inputRef.current?.focus(); // Focus back to start for next item
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const handleScan = () => {
    setShowScanner(true);
    // Simulate scanning process
    setTimeout(() => {
      setShowScanner(false);
      setBarcode('849302194832');
      setContainerNumber('CNT-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'));
    }, 1500);
  };

  const destinations = [
    { code: 'NRT', name: '日本成田' },
    { code: 'ICN', name: '韓國仁川' },
    { code: 'SIN', name: '新加坡樟宜' },
    { code: 'BKK', name: '泰國曼谷' },
    { code: 'HKG', name: '香港赤鱲角' },
    { code: 'PVG', name: '上海浦東' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navigation />

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <div className="relative w-80 h-60 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-1 bg-red-500 shadow-[0_0_10px_red] animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
            {/* Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
              Scanning...
            </div>
          </div>
          <p className="text-white mt-4 animate-pulse">正在掃描條碼...</p>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-4 lg:right-10 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-4 animate-[slideIn_0.5s_ease-out]">
          <div className="bg-white/20 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-lg">登記成功</h4>
            <p className="text-sm opacity-90">貨品已成功加入系統</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">地勤人員操作介面</h1>
          <p className="text-gray-500 mt-1">快速登記與管理貨櫃狀態</p>
        </header>

        <WeatherWidget />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Registration Area - Takes up more space */}
          <div className="lg:col-span-8">
            <Card title="貨品裝入與登記" className="h-full">
              <form onSubmit={handleRegisterCargo} className="space-y-6">

                {/* Primary Action: Scan/Input */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    步驟 1: 掃描或輸入貨櫃
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zm-2 7a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zm7-9a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1zM9 9a1 1 0 011-1h1a1 1 0 110 2H10a1 1 0 01-1-1zm-1 4a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1zm4 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        ref={inputRef}
                        type="text"
                        value={barcode || containerNumber}
                        onChange={(e) => {
                          setBarcode(e.target.value);
                          setContainerNumber(e.target.value);
                        }}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                        placeholder="請掃描或輸入貨櫃編號..."
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleScan}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      掃描
                    </button>
                  </div>
                </div>

                {/* Secondary: Details */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    步驟 2: 貨品詳情
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        value={cargoName}
                        onChange={(e) => setCargoName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="貨品名稱"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="數量"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="重量 (kg)"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Destination Quick Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    步驟 3: 選擇目的地
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {destinations.map((dest) => (
                      <button
                        key={dest.code}
                        type="button"
                        onClick={() => setDestination(dest.code)}
                        className={`px-2 py-3 rounded-lg text-sm font-medium transition-all border ${destination === dest.code
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                      >
                        <div className="text-xs opacity-75">{dest.code}</div>
                        <div>{dest.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 text-lg font-medium shadow-lg hover:shadow-xl transform active:scale-[0.99]"
                  >
                    <span>確認登記</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* Quick Search - Compact Side Panel */}
          <div className="lg:col-span-4">
            <Card title="快速查詢" className="h-full bg-slate-50 border-slate-200">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="搜尋貨櫃..."
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-100">
                    所有貨櫃
                  </button>
                  <button className="px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100">
                    裝載中
                  </button>
                  <button className="px-3 py-1.5 bg-green-50 border border-green-100 text-green-600 rounded-full text-xs font-medium hover:bg-green-100">
                    運送中
                  </button>
                  <button className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-full text-xs font-medium hover:bg-red-100">
                    異常
                  </button>
                </div>

                <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-center text-gray-400 py-8">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-sm">近期沒有查詢記錄</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* List Table */}
        <Card title="今日登記記錄">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">貨櫃編號</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">狀態</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">位置</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">目的地</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">更新時間</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {containers.map((container) => (
                  <tr key={container.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 font-mono">{container.containerNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={container.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{container.location.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{container.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {container.updatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 hover:underline">
                        詳細
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
