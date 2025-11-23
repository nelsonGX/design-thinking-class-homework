'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Container, Anomaly } from '../types';

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  // 模擬歷史數據
  const [historicalContainers] = useState<Container[]>([
    {
      id: '1',
      containerNumber: 'CNT-2024-001',
      status: 'delivered',
      location: { latitude: 35.7720, longitude: 140.3929, address: '日本成田機場' },
      destination: '日本成田機場',
      departureTime: new Date('2024-01-10T08:00:00'),
      estimatedArrival: new Date('2024-01-10T12:00:00'),
      actualArrival: new Date('2024-01-10T11:45:00'),
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-10T07:00:00'),
      updatedAt: new Date('2024-01-10T11:45:00'),
    },
    {
      id: '2',
      containerNumber: 'CNT-2024-002',
      status: 'delivered',
      location: { latitude: 37.4602, longitude: 126.4407, address: '韓國仁川機場' },
      destination: '韓國仁川機場',
      departureTime: new Date('2024-01-11T09:00:00'),
      estimatedArrival: new Date('2024-01-11T13:00:00'),
      actualArrival: new Date('2024-01-11T13:20:00'),
      items: [],
      hasAnomaly: true,
      anomalies: [
        {
          id: '1',
          containerId: '2',
          type: 'delay',
          severity: 'low',
          description: '輕微延遲抵達',
          detectedAt: new Date('2024-01-11T13:00:00'),
          resolvedAt: new Date('2024-01-11T13:20:00'),
          status: 'resolved',
          notes: ['天氣因素導致'],
        },
      ],
      createdAt: new Date('2024-01-11T08:00:00'),
      updatedAt: new Date('2024-01-11T13:20:00'),
    },
    {
      id: '3',
      containerNumber: 'CNT-2024-003',
      status: 'delivered',
      location: { latitude: 1.3644, longitude: 103.9915, address: '新加坡樟宜機場' },
      destination: '新加坡樟宜機場',
      departureTime: new Date('2024-01-12T10:00:00'),
      estimatedArrival: new Date('2024-01-12T15:00:00'),
      actualArrival: new Date('2024-01-12T14:50:00'),
      items: [],
      hasAnomaly: false,
      anomalies: [],
      createdAt: new Date('2024-01-12T09:00:00'),
      updatedAt: new Date('2024-01-12T14:50:00'),
    },
    {
      id: '4',
      containerNumber: 'CNT-2024-004',
      status: 'anomaly',
      location: { latitude: 25.0330, longitude: 121.5654, address: '台灣桃園機場' },
      destination: '香港國際機場',
      departureTime: new Date('2024-01-13T07:00:00'),
      items: [],
      hasAnomaly: true,
      anomalies: [
        {
          id: '1',
          containerId: '4',
          type: 'temperature',
          severity: 'high',
          description: '溫度持續過高',
          detectedAt: new Date('2024-01-13T08:30:00'),
          status: 'resolved',
          resolvedAt: new Date('2024-01-13T10:00:00'),
          notes: ['冷卻系統故障', '已維修完成'],
        },
      ],
      createdAt: new Date('2024-01-13T06:00:00'),
      updatedAt: new Date('2024-01-13T10:00:00'),
    },
  ]);

  const [trackingHistory] = useState([
    {
      timestamp: new Date('2024-01-10T08:00:00'),
      location: '台灣桃園機場',
      event: '貨櫃離港',
      status: 'in_transit',
    },
    {
      timestamp: new Date('2024-01-10T09:30:00'),
      location: '飛行中',
      event: '正常運送',
      status: 'in_transit',
    },
    {
      timestamp: new Date('2024-01-10T11:00:00'),
      location: '日本成田機場空域',
      event: '即將抵達',
      status: 'in_transit',
    },
    {
      timestamp: new Date('2024-01-10T11:45:00'),
      location: '日本成田機場',
      event: '貨櫃抵達',
      status: 'delivered',
    },
  ]);

  const filteredContainers = historicalContainers.filter((container) => {
    const matchesSearch = container.containerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         container.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || container.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (container: Container) => {
    setSelectedContainer(container);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">歷史數據查詢</h1>

        {/* 搜尋與篩選 */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">搜尋貨櫃</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="貨櫃編號或目的地"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">狀態篩選</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部狀態</option>
                <option value="delivered">已送達</option>
                <option value="in_transit">運送中</option>
                <option value="anomaly">異常</option>
                <option value="loading">裝載中</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">開始日期</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">結束日期</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800">
              查詢
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
                setDateFrom('');
                setDateTo('');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              重置
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
              匯出報表
            </button>
          </div>
        </Card>

        {/* 歷史記錄列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title={`歷史記錄 (${filteredContainers.length} 筆)`}>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredContainers.map((container) => (
                <div
                  key={container.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewDetails(container)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">{container.containerNumber}</div>
                    <StatusBadge status={container.status} />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>目的地:</span>
                      <span className="text-gray-900">{container.destination}</span>
                    </div>
                    {container.departureTime && (
                      <div className="flex justify-between">
                        <span>出發:</span>
                        <span className="text-gray-900">
                          {container.departureTime.toLocaleString('zh-TW', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    )}
                    {container.actualArrival && (
                      <div className="flex justify-between">
                        <span>抵達:</span>
                        <span className="text-gray-900">
                          {container.actualArrival.toLocaleString('zh-TW', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    )}
                    {container.hasAnomaly && (
                      <div className="mt-2 text-gray-900 text-xs font-medium">
                        {container.anomalies.length} 個異常事件
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 詳細資訊面板 */}
          {selectedContainer ? (
            <Card
              title={`貨櫃詳細資訊: ${selectedContainer.containerNumber}`}
              action={
                <button
                  onClick={() => setSelectedContainer(null)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  關閉
                </button>
              }
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">基本資訊</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">貨櫃編號:</span>
                      <span className="text-gray-900 font-medium">{selectedContainer.containerNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">目的地:</span>
                      <span className="text-gray-900">{selectedContainer.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">當前狀態:</span>
                      <StatusBadge status={selectedContainer.status} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">當前位置:</span>
                      <span className="text-gray-900">{selectedContainer.location.address}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-2">運送軌跡</h4>
                  <div className="space-y-3">
                    {trackingHistory.map((track, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            index === trackingHistory.length - 1
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          }`}></div>
                          {index < trackingHistory.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="text-sm font-medium text-gray-900">{track.event}</div>
                          <div className="text-xs text-gray-600">{track.location}</div>
                          <div className="text-xs text-gray-500">
                            {track.timestamp.toLocaleString('zh-TW')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedContainer.anomalies.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">異常事件記錄</h4>
                    <div className="space-y-2">
                      {selectedContainer.anomalies.map((anomaly) => (
                        <div key={anomaly.id} className="p-3 border border-gray-200 bg-gray-50">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {anomaly.type === 'temperature' ? '溫度異常' :
                               anomaly.type === 'humidity' ? '濕度異常' :
                               anomaly.type === 'delay' ? '延遲' : anomaly.type}
                            </span>
                            <span className={`text-xs px-2 py-1 border ${
                              anomaly.status === 'resolved'
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-900 border-gray-300'
                            }`}>
                              {anomaly.status === 'resolved' ? '已解決' : '處理中'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-700">{anomaly.description}</div>
                          {anomaly.notes.length > 0 && (
                            <div className="mt-2 text-xs text-gray-600">
                              備註: {anomaly.notes.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800">
                  下載完整報告
                </button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="h-96 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>選擇貨櫃以查看詳細資訊</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* 統計摘要 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900">{filteredContainers.length}</div>
              <div className="text-sm text-gray-600 mt-1">查詢結果</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900">
                {filteredContainers.filter((c) => c.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">已完成運送</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900">
                {filteredContainers.filter((c) => c.hasAnomaly).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">曾發生異常</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
