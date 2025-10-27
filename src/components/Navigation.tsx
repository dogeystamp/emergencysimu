'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full group-hover:scale-105 transition-transform">
              <span className="text-lg">🚨</span>
            </div>
            <h1 className="text-md font-bold text-white">DispatchPro</h1>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            <Link
              href="/train"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive('/train')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Start Training
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

