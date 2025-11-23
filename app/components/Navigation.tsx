'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-medium text-gray-900">
              智慧貨櫃系統
            </Link>

            <div className="flex gap-1">
              <Link
                href="/ground-staff"
                className={`px-3 py-2 text-sm ${isActive('/ground-staff') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                地勤操作
              </Link>
              <Link
                href="/monitoring"
                className={`px-3 py-2 text-sm ${isActive('/monitoring') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                監控後台
              </Link>
              <Link
                href="/dashboard"
                className={`px-3 py-2 text-sm ${isActive('/dashboard') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                管理儀表板
              </Link>
              <Link
                href="/analytics"
                className={`px-3 py-2 text-sm ${isActive('/analytics') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                數據分析
              </Link>
              <Link
                href="/history"
                className={`px-3 py-2 text-sm ${isActive('/history') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                歷史查詢
              </Link>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">管理員</span>
            <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-sm text-gray-700">
              登出
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
