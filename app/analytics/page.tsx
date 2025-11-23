'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Card from '../components/Card';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month');

  // 模擬數據
  const lostContainersData = {
    total: 12,
    trend: -15.3, // 負數表示下降
    byMonth: [
      { month: '1月', count: 5 },
      { month: '2月', count: 3 },
      { month: '3月', count: 2 },
      { month: '4月', count: 2 },
    ],
  };

  const deliveryPerformance = {
    onTime: 142,
    delayed: 8,
    onTimeRate: 94.7,
    avgDelay: 2.5, // 小時
  };

  const containerUtilization = {
    utilized: 115,
    idle: 35,
    rate: 76.7,
  };

  const anomalyStats = {
    temperature: 18,
    humidity: 12,
    location: 8,
    impact: 5,
    delay: 15,
  };

  const topRoutes = [
    { from: '台灣桃園', to: '日本成田', count: 45, onTimeRate: 95.6 },
    { from: '台灣桃園', to: '韓國仁川', count: 38, onTimeRate: 94.7 },
    { from: '台灣桃園', to: '新加坡樟宜', count: 32, onTimeRate: 93.8 },
    { from: '台灣桃園', to: '香港國際', count: 28, onTimeRate: 96.4 },
    { from: '台灣桃園', to: '泰國曼谷', count: 22, onTimeRate: 91.0 },
  ];

  const monthlyTrend = [
    { month: '9月', containers: 120, anomalies: 8, onTimeRate: 92.5 },
    { month: '10月', containers: 135, anomalies: 6, onTimeRate: 93.3 },
    { month: '11月', containers: 142, anomalies: 5, onTimeRate: 94.4 },
    { month: '12月', containers: 150, anomalies: 5, onTimeRate: 94.7 },
    { month: '1月', containers: 158, anomalies: 4, onTimeRate: 95.2 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">數據分析報表</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDateRange('week')}
              className={`px-4 py-2 border ${dateRange === 'week' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              本週
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 border ${dateRange === 'month' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              本月
            </button>
            <button
              onClick={() => setDateRange('quarter')}
              className={`px-4 py-2 border ${dateRange === 'quarter' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              本季
            </button>
            <button
              onClick={() => setDateRange('year')}
              className={`px-4 py-2 border ${dateRange === 'year' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              本年
            </button>
          </div>
        </div>

        {/* 關鍵指標摘要 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">遺失貨櫃</div>
              <div className="text-3xl font-medium text-gray-900 mb-1">{lostContainersData.total}</div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm text-gray-600">↓ {Math.abs(lostContainersData.trend)}%</span>
                <span className="text-xs text-gray-500">vs 上月</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">準時送達率</div>
              <div className="text-3xl font-medium text-gray-900 mb-1">{deliveryPerformance.onTimeRate}%</div>
              <div className="text-sm text-gray-500">{deliveryPerformance.onTime}/{deliveryPerformance.onTime + deliveryPerformance.delayed} 次</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">貨櫃使用率</div>
              <div className="text-3xl font-medium text-gray-900 mb-1">{containerUtilization.rate}%</div>
              <div className="text-sm text-gray-500">{containerUtilization.utilized}/{containerUtilization.utilized + containerUtilization.idle} 使用中</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">平均延遲時間</div>
              <div className="text-3xl font-medium text-gray-900 mb-1">{deliveryPerformance.avgDelay}</div>
              <div className="text-sm text-gray-500">小時</div>
            </div>
          </Card>
        </div>

        {/* 遺失貨櫃趨勢分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card title="遺失貨櫃趨勢">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>月份</span>
                <span>遺失數量</span>
              </div>
              {lostContainersData.byMonth.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-700">{item.month}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 h-8 relative">
                      <div
                        className="bg-gray-700 h-8 flex items-center justify-end pr-3 text-white text-sm font-medium"
                        style={{ width: `${(item.count / 5) * 100}%` }}
                      >
                        {item.count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6 p-4 border border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-900">
                  <strong>分析洞察：</strong>遺失貨櫃數量持續下降，系統優化效果顯著
                </div>
              </div>
            </div>
          </Card>

          <Card title="異常類型分布">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border border-gray-200">
                <span className="text-sm text-gray-700">溫度異常</span>
                <span className="text-lg font-medium text-gray-900">{anomalyStats.temperature}</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200">
                <span className="text-sm text-gray-700">延遲</span>
                <span className="text-lg font-medium text-gray-900">{anomalyStats.delay}</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200">
                <span className="text-sm text-gray-700">濕度異常</span>
                <span className="text-lg font-medium text-gray-900">{anomalyStats.humidity}</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200">
                <span className="text-sm text-gray-700">位置偏離</span>
                <span className="text-lg font-medium text-gray-900">{anomalyStats.location}</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200">
                <span className="text-sm text-gray-700">碰撞衝擊</span>
                <span className="text-lg font-medium text-gray-900">{anomalyStats.impact}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* 熱門路線分析 */}
        <Card title="熱門運送路線排行" className="mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">排名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">起點</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">終點</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">運送次數</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">準時率</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">表現</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topRoutes.map((route, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-100 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{route.from}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{route.to}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{route.count}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{route.onTimeRate}%</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${route.onTimeRate > 95 ? 'bg-green-500' : route.onTimeRate > 90 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${route.onTimeRate}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 月度趨勢分析 */}
        <Card title="月度趨勢分析">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">月份</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">貨櫃數量</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">異常事件</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">準時率</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">趨勢</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {monthlyTrend.map((item, index) => {
                  const prevItem = index > 0 ? monthlyTrend[index - 1] : null;
                  const trend = prevItem ? item.containers - prevItem.containers : 0;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.month}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.containers}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.anomalies}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span className={item.onTimeRate > 94 ? 'text-green-600 font-medium' : ''}>
                          {item.onTimeRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {trend !== 0 && (
                          <div className="flex items-center gap-1">
                            <svg
                              className={`w-4 h-4 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              transform={trend > 0 ? '' : 'rotate(180)'}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {Math.abs(trend)}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-900 font-medium mb-1">成長趨勢</div>
              <div className="text-xs text-gray-600">貨櫃處理量持續增長，顯示業務擴張</div>
            </div>
            <div className="p-4 border border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-900 font-medium mb-1">效能提升</div>
              <div className="text-xs text-gray-600">準時率逐月提升，系統穩定性增強</div>
            </div>
            <div className="p-4 border border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-900 font-medium mb-1">異常減少</div>
              <div className="text-xs text-gray-600">異常事件數量下降，監控系統效果良好</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
