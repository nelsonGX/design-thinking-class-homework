'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Container, Anomaly, SensorReading, Notification } from '../types';

export default function MonitoringPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'anomaly',
      title: '溫度異常警報',
      message: '貨櫃 CNT-2024-003 溫度超過安全範圍 (35°C)',
      severity: 'error',
      read: false,
      createdAt: new Date('2024-01-15T11:00:00'),
      containerId: '3',
    },
    {
      id: '2',
      type: 'arrival',
      title: '貨櫃即將抵達',
      message: '貨櫃 CNT-2024-002 預計在30分鐘後抵達',
      severity: 'info',
      read: false,
      createdAt: new Date('2024-01-15T13:30:00'),
      containerId: '2',
    },
  ]);

  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: '1',
      containerId: 'CNT-2024-003',
      type: 'temperature',
      severity: 'high',
      description: '貨櫃溫度持續上升，目前為 35°C',
      detectedAt: new Date('2024-01-15T11:00:00'),
      status: 'open',
      notes: [],
      sensorData: {
        temperature: 35,
      },
    },
    {
      id: '2',
      containerId: 'CNT-2024-005',
      type: 'humidity',
      severity: 'medium',
      description: '濕度超過標準值 (85%)',
      detectedAt: new Date('2024-01-15T10:30:00'),
      status: 'investigating',
      assignedTo: '李四',
      notes: ['已通知現場人員檢查'],
      sensorData: {
        humidity: 85,
      },
    },
    {
      id: '3',
      containerId: 'CNT-2024-007',
      type: 'location',
      severity: 'critical',
      description: '貨櫃偏離預定路線',
      detectedAt: new Date('2024-01-15T09:15:00'),
      status: 'open',
      notes: [],
    },
  ]);

  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([
    {
      containerId: 'CNT-2024-001',
      timestamp: new Date(),
      temperature: 22,
      humidity: 55,
      location: { latitude: 25.0330, longitude: 121.5654 },
      batteryLevel: 85,
    },
    {
      containerId: 'CNT-2024-002',
      timestamp: new Date(),
      temperature: 24,
      humidity: 60,
      location: { latitude: 24.8, longitude: 120.9 },
      batteryLevel: 70,
    },
  ]);

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // 模擬即時數據更新
      setSensorReadings((prev) =>
        prev.map((reading) => ({
          ...reading,
          temperature: reading.temperature + (Math.random() - 0.5),
          humidity: reading.humidity + (Math.random() - 0.5),
          timestamp: new Date(),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleResolveAnomaly = (id: string) => {
    setAnomalies((prev) =>
      prev.map((anomaly) =>
        anomaly.id === id
          ? { ...anomaly, status: 'resolved' as const, resolvedAt: new Date() }
          : anomaly
      )
    );
  };

  const handleAssignAnomaly = (id: string) => {
    const assignee = prompt('指派給:');
    if (assignee) {
      setAnomalies((prev) =>
        prev.map((anomaly) =>
          anomaly.id === id
            ? { ...anomaly, status: 'investigating' as const, assignedTo: assignee }
            : anomaly
        )
      );
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">自動監控系統後台</h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">自動刷新</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">即時監控中</span>
            </div>
          </div>
        </div>

        {/* 系統狀態概覽 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-medium text-gray-900">{sensorReadings.length}</div>
              <div className="text-sm text-gray-600 mt-1">監控中貨櫃</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-medium text-gray-900">
                {anomalies.filter((a) => a.status === 'open').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">待處理異常</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-medium text-gray-900">
                {anomalies.filter((a) => a.status === 'investigating').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">處理中</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-medium text-gray-900">
                {notifications.filter((n) => !n.read).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">未讀通知</div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 即時感測器數據 */}
          <Card
            title="即時感測器數據"
            action={
              <span className="text-xs text-gray-500">
                更新於 {new Date().toLocaleTimeString('zh-TW')}
              </span>
            }
          >
            <div className="space-y-4">
              {sensorReadings.map((reading) => (
                <div key={reading.containerId} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2">{reading.containerId}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">溫度:</span>
                      <span className="ml-2 font-medium text-gray-700">{reading.temperature.toFixed(1)}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-600">濕度:</span>
                      <span className="ml-2 font-medium text-gray-700">{reading.humidity.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">電池:</span>
                      <span className="ml-2 font-medium text-gray-700">{reading.batteryLevel}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">位置:</span>
                      <span className="ml-2 font-medium text-xs text-gray-700">
                        {reading.location.latitude.toFixed(4)}, {reading.location.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 通知中心 */}
          <Card title="即時通知">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center text-gray-500 py-8">目前無通知</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 border border-gray-200 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800">{notification.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          {notification.createdAt.toLocaleString('zh-TW')}
                        </div>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() =>
                            setNotifications((prev) =>
                              prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
                            )
                          }
                          className="text-xs text-gray-900 hover:underline"
                        >
                          標記已讀
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* 異常事件追蹤 */}
        <Card title="異常事件追蹤與處理">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">貨櫃編號</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">異常類型</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">嚴重程度</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">說明</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">狀態</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">負責人</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {anomalies.map((anomaly) => (
                  <tr key={anomaly.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {anomaly.containerId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {anomaly.type === 'temperature'
                        ? '溫度'
                        : anomaly.type === 'humidity'
                        ? '濕度'
                        : anomaly.type === 'location'
                        ? '位置'
                        : anomaly.type}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          anomaly.severity
                        )}`}
                      >
                        {anomaly.severity === 'critical'
                          ? '嚴重'
                          : anomaly.severity === 'high'
                          ? '高'
                          : anomaly.severity === 'medium'
                          ? '中'
                          : '低'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{anomaly.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(anomaly.status)}`}>
                        {anomaly.status === 'open'
                          ? '待處理'
                          : anomaly.status === 'investigating'
                          ? '處理中'
                          : '已解決'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {anomaly.assignedTo || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {anomaly.status !== 'resolved' && (
                          <>
                            <button
                              onClick={() => handleAssignAnomaly(anomaly.id)}
                              className="text-gray-900 hover:underline text-sm"
                            >
                              指派
                            </button>
                            <button
                              onClick={() => handleResolveAnomaly(anomaly.id)}
                              className="text-gray-900 hover:underline text-sm"
                            >
                              解決
                            </button>
                          </>
                        )}
                        <button className="text-gray-900 hover:underline text-sm">
                          詳情
                        </button>
                      </div>
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
