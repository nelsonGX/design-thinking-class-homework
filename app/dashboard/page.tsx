'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Container, Statistics } from '../types';

export default function DashboardPage() {
  const [statistics] = useState<Statistics>({
    totalContainers: 150,
    activeContainers: 85,
    deliveredContainers: 60,
    anomalyContainers: 5,
    utilizationRate: 76.5,
    onTimeDeliveryRate: 94.2,
    averageDeliveryTime: 8.5,
  });

  const [containers] = useState<Container[]>([
    {
      id: '1',
      containerNumber: 'CNT-2024-001',
      status: 'in_transit',
      location: { latitude: 25.0330, longitude: 121.5654, address: '台灣桃園機場' },
      destination: '日本成田機場',
      departureTime: new Date('2024-01-15T08:00:00'),
      estimatedArrival: new Date('2024-01-15T12:00:00'),
      currentTemperature: 22,
      currentHumidity: 55,
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-15T07:00:00'),
      updatedAt: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      containerNumber: 'CNT-2024-002',
      status: 'in_transit',
      location: { latitude: 24.8, longitude: 120.9, address: '運送途中' },
      destination: '韓國仁川機場',
      currentTemperature: 23,
      currentHumidity: 58,
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-15T06:00:00'),
      updatedAt: new Date('2024-01-15T10:00:00'),
    },
    {
      id: '3',
      containerNumber: 'CNT-2024-003',
      status: 'anomaly',
      location: { latitude: 25.0330, longitude: 121.5654, address: '台灣桃園機場倉庫B' },
      destination: '新加坡樟宜機場',
      currentTemperature: 35,
      currentHumidity: 65,
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
    {
      id: '4',
      containerNumber: 'CNT-2024-004',
      status: 'at_airport',
      location: { latitude: 35.7720, longitude: 140.3929, address: '日本成田機場' },
      destination: '日本成田機場',
      actualArrival: new Date('2024-01-15T11:30:00'),
      currentTemperature: 20,
      currentHumidity: 50,
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-14T18:00:00'),
      updatedAt: new Date('2024-01-15T11:30:00'),
    },
    {
      id: '5',
      containerNumber: 'CNT-2024-005',
      status: 'loading',
      location: { latitude: 25.0330, longitude: 121.5654, address: '台灣桃園機場倉庫A' },
      destination: '泰國曼谷機場',
      currentTemperature: 21,
      currentHumidity: 52,
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-15T09:00:00'),
      updatedAt: new Date('2024-01-15T10:00:00'),
    },
  ]);

  const statusDistribution = {
    loading: containers.filter((c) => c.status === 'loading').length,
    in_transit: containers.filter((c) => c.status === 'in_transit').length,
    at_airport: containers.filter((c) => c.status === 'at_airport').length,
    delivered: containers.filter((c) => c.status === 'delivered').length,
    anomaly: containers.filter((c) => c.status === 'anomaly').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">管理層視覺化儀表板</h1>

        {/* KPI 指標卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="text-sm text-gray-600 mb-1">總貨櫃數</div>
            <div className="text-3xl font-medium text-gray-900">{statistics.totalContainers}</div>
          </Card>

          <Card>
            <div className="text-sm text-gray-600 mb-1">運行中貨櫃</div>
            <div className="text-3xl font-medium text-gray-900">{statistics.activeContainers}</div>
          </Card>

          <Card>
            <div className="text-sm text-gray-600 mb-1">異常貨櫃</div>
            <div className="text-3xl font-medium text-gray-900">{statistics.anomalyContainers}</div>
          </Card>

          <Card>
            <div className="text-sm text-gray-600 mb-1">使用率</div>
            <div className="text-3xl font-medium text-gray-900">{statistics.utilizationRate}%</div>
          </Card>
        </div>

        {/* 效能指標 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">準時送達率</div>
              <div className="text-4xl font-medium text-gray-900 mb-2">{statistics.onTimeDeliveryRate}%</div>
              <div className="w-full bg-gray-200 h-1.5">
                <div
                  className="bg-gray-900 h-1.5"
                  style={{ width: `${statistics.onTimeDeliveryRate}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">平均運送時間</div>
              <div className="text-4xl font-medium text-gray-900 mb-2">{statistics.averageDeliveryTime}</div>
              <div className="text-sm text-gray-500">小時</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">已送達貨櫃</div>
              <div className="text-4xl font-medium text-gray-900 mb-2">{statistics.deliveredContainers}</div>
              <div className="text-sm text-gray-500">本月累計</div>
            </div>
          </Card>
        </div>

        {/* 貨櫃狀態分佈 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card title="貨櫃狀態分佈">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">裝載中</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">{statusDistribution.loading}</span>
                  <div className="w-32 bg-gray-200 h-1.5">
                    <div
                      className="bg-gray-700 h-1.5"
                      style={{ width: `${(statusDistribution.loading / containers.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">運送中</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">{statusDistribution.in_transit}</span>
                  <div className="w-32 bg-gray-200 h-1.5">
                    <div
                      className="bg-gray-700 h-1.5"
                      style={{ width: `${(statusDistribution.in_transit / containers.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">機場中</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">{statusDistribution.at_airport}</span>
                  <div className="w-32 bg-gray-200 h-1.5">
                    <div
                      className="bg-gray-700 h-1.5"
                      style={{ width: `${(statusDistribution.at_airport / containers.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">已送達</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">{statusDistribution.delivered}</span>
                  <div className="w-32 bg-gray-200 h-1.5">
                    <div
                      className="bg-gray-900 h-1.5"
                      style={{ width: `${(statusDistribution.delivered / containers.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">異常</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">{statusDistribution.anomaly}</span>
                  <div className="w-32 bg-gray-200 h-1.5">
                    <div
                      className="bg-gray-900 h-1.5"
                      style={{ width: `${(statusDistribution.anomaly / containers.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="即時貨櫃位置">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm">地圖視圖</p>
                <p className="text-xs text-gray-500 mt-1">(整合 Google Maps API)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 即時貨櫃監控列表 */}
        <Card title="即時貨櫃狀態">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">貨櫃編號</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">狀態</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">當前位置</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">目的地</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">溫度</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">濕度</th>
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
                      <span className={container.currentTemperature && container.currentTemperature > 30 ? 'text-gray-900 font-medium' : ''}>
                        {container.currentTemperature ? `${container.currentTemperature}°C` : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {container.currentHumidity ? `${container.currentHumidity}%` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-gray-900 hover:underline text-sm">
                        查看軌跡
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
