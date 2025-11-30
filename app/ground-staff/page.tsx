'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Container, CargoItem } from '../types';

export default function GroundStaffPage() {
  const [containerNumber, setContainerNumber] = useState('');
  const [cargoName, setCargoName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [barcode, setBarcode] = useState('');
  const [destination, setDestination] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navigation />

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <div className="relative w-80 h-60 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-1 bg-red-500 shadow-[0_0_10px_red] animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
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
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-[slideIn_0.5s_ease-out]">
          <div className="bg-white rounded-full p-1">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold">登記成功</h4>
            <p className="text-sm opacity-90">貨品已成功加入系統</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">地勤人員操作介面</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 貨品裝入與登記 */}
          <Card title="貨品裝入與登記">
            <form onSubmit={handleRegisterCargo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  掃描條碼 / 輸入貨櫃編號
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={barcode || containerNumber}
                    onChange={(e) => {
                      setBarcode(e.target.value);
                      setContainerNumber(e.target.value); // Simple sync for demo
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="請掃描或輸入..."
                    required
                  />
                  <button
                    type="button"
                    onClick={handleScan}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    掃描
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    貨品名稱
                  </label>
                  <input
                    type="text"
                    value={cargoName}
                    onChange={(e) => setCargoName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="例如: 電子零件"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    數量
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="數量"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    重量 (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="重量"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    目的地
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  >
                    <option value="">請選擇目的地</option>
                    <option value="NRT">日本成田 (NRT)</option>
                    <option value="ICN">韓國仁川 (ICN)</option>
                    <option value="SIN">新加坡樟宜 (SIN)</option>
                    <option value="BKK">泰國曼谷 (BKK)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                登記貨品
              </button>
            </form>
          </Card>

          {/* 貨櫃快速查詢 */}
          <Card title="貨櫃快速查詢">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  搜尋條件
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="輸入貨櫃編號、目的地或狀態..."
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                  全部
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">
                  裝載中
                </button>
                <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200">
                  運送中
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200">
                  異常
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 text-center">
                  請輸入搜尋條件以顯示結果
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* 機場貨櫃狀態 */}
        <Card title="機場貨櫃狀態">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">貨櫃編號</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">狀態</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">位置</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">目的地</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">更新時間</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {containers.map((container) => (
                  <tr key={container.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {container.containerNumber}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={container.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{container.location.address}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{container.destination}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {container.updatedAt.toLocaleTimeString('zh-TW')}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-gray-900 hover:underline text-sm">
                        詳細資料
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
