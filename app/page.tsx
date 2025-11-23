'use client';

import Link from 'next/link';
import Navigation from './components/Navigation';
import Card from './components/Card';

export default function Home() {
  const quickStats = {
    totalContainers: 150,
    activeContainers: 85,
    anomalyContainers: 5,
    deliveredToday: 12,
  };

  const systemModules = [
    {
      title: '地勤人員操作',
      description: '貨品裝入登記、掃描管理、機場運送追蹤',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      link: '/ground-staff',
      color: 'bg-blue-500',
    },
    {
      title: '監控系統後台',
      description: '即時監控、異常偵測、自動警報通知',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: '/monitoring',
      color: 'bg-green-500',
    },
    {
      title: '管理儀表板',
      description: '即時位置追蹤、使用率統計、效能指標',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/dashboard',
      color: 'bg-purple-500',
    },
    {
      title: '數據分析報表',
      description: '遺失統計、趨勢分析、效能報表',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/analytics',
      color: 'bg-orange-500',
    },
    {
      title: '歷史數據查詢',
      description: '運送軌跡回溯、異常事件歷史記錄',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/history',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">智慧貨櫃管理系統</h1>
          <p className="text-gray-600">全方位貨櫃追蹤與管理解決方案</p>
        </div>

        {/* 快速統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-sm text-gray-600 mb-1">總貨櫃數</div>
            <div className="text-3xl font-medium text-gray-900">{quickStats.totalContainers}</div>
          </Card>

          <Card>
            <div className="text-sm text-gray-600 mb-1">運行中</div>
            <div className="text-3xl font-medium text-gray-900">{quickStats.activeContainers}</div>
          </Card>

          <Card>
            <div className="text-sm text-gray-600 mb-1">異常貨櫃</div>
            <div className="text-3xl font-medium text-gray-900">{quickStats.anomalyContainers}</div>
          </Card>

          <Card>
            <div className="text-sm text-gray-600 mb-1">今日送達</div>
            <div className="text-3xl font-medium text-gray-900">{quickStats.deliveredToday}</div>
          </Card>
        </div>

        {/* 系統模組 */}
        <Card title="系統功能模組" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemModules.map((module, index) => (
              <Link key={index} href={module.link}>
                <div className="p-5 border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  <h3 className="text-base font-medium text-gray-900 mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* 系統特色 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h4 className="font-medium text-gray-900 mb-2">即時監控</h4>
            <p className="text-sm text-gray-600">24/7 全天候貨櫃狀態追蹤</p>
          </Card>

          <Card>
            <h4 className="font-medium text-gray-900 mb-2">智能警報</h4>
            <p className="text-sm text-gray-600">自動異常偵測與通知系統</p>
          </Card>

          <Card>
            <h4 className="font-medium text-gray-900 mb-2">數據分析</h4>
            <p className="text-sm text-gray-600">深度洞察與趨勢預測</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
