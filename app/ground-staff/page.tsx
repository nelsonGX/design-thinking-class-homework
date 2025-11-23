'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Container, CargoItem } from '../types';

export default function GroundStaffPage() {
  const [containerNumber, setContainerNumber] = useState('');
  const [cargoName, setCargoName] = useState('');
  const [cargoQuantity, setCargoQuantity] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [cargoBarcode, setCargoBarcode] = useState('');
  const [destination, setDestination] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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
    // 這裡應該發送API請求
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCargoName('');
      setCargoQuantity('');
      setCargoWeight('');
      setCargoBarcode('');
    }, 2000);
  };

  const handleScanBarcode = () => {
    // 模擬掃描條碼
    const mockBarcode = 'BC' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setCargoBarcode(mockBarcode);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">地勤人員操作介面</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 貨品登記表單 */}
          <Card title="貨品裝入與登記">
            <form onSubmit={handleRegisterCargo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  貨櫃編號
                </label>
                <input
                  type="text"
                  value={containerNumber}
                  onChange={(e) => setContainerNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="輸入或掃描貨櫃編號"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  貨品名稱
                </label>
                <input
                  type="text"
                  value={cargoName}
                  onChange={(e) => setCargoName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="輸入貨品名稱"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    數量
                  </label>
                  <input
                    type="number"
                    value={cargoQuantity}
                    onChange={(e) => setCargoQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    重量 (kg)
                  </label>
                  <input
                    type="number"
                    value={cargoWeight}
                    onChange={(e) => setCargoWeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  條碼
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cargoBarcode}
                    onChange={(e) => setCargoBarcode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="條碼編號"
                  />
                  <button
                    type="button"
                    onClick={handleScanBarcode}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    掃描
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  目的地
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">選擇目的地</option>
                  <option value="japan">日本成田機場</option>
                  <option value="korea">韓國仁川機場</option>
                  <option value="singapore">新加坡樟宜機場</option>
                  <option value="hongkong">香港國際機場</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 font-medium"
              >
                登記貨品
              </button>

              {showSuccess && (
                <div className="p-3 border border-gray-300 bg-gray-50 text-gray-900 text-center">
                  貨品登記成功！
                </div>
              )}
            </form>
          </Card>

          {/* 快速查詢 */}
          <Card title="貨櫃快速查詢">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="輸入貨櫃編號查詢..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">快速篩選</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                    裝載中
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                    運送中
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                    異常貨櫃
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 貨櫃狀態列表 */}
        <Card title="機場貨櫃狀態">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">貨櫃編號</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">狀態</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">目的地</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">位置</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">溫度</th>
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
                    <td className="px-4 py-3 text-sm text-gray-700">{container.destination}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{container.location.address}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {container.currentTemperature ? `${container.currentTemperature}°C` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-gray-900 hover:underline text-sm">
                        查看詳情
                      </button>
                      {container.hasAnomaly && (
                        <button className="ml-2 text-gray-900 hover:underline text-sm">
                          標記異常
                        </button>
                      )}
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
