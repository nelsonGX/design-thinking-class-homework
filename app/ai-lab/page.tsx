'use client';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import AIDemoSection from '../components/AIDemoSection';

export default function AILabPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">未來智能實驗室</h1>
          </div>
          <p className="text-gray-600 ml-9">探索下一代貨櫃管理技術，體驗 AI 驅動的物流革命</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">關於智能實驗室</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              這裡是我們測試與展示最新 AI 技術的實驗場域。我們運用深度學習、電腦視覺與強化學習演算法，
              致力於解決物流產業最棘手的挑戰。以下展示的功能目前處於 Beta 測試階段，即將導入核心系統。
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                系統運作中
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                版本 v2.4.0-beta
              </div>
            </div>
          </div>
        </div>

        <AIDemoSection />
      </div>
    </div>
  );
}
