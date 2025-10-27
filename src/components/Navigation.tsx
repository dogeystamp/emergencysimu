'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" prefetch={false} className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <span className="text-2xl">🚨</span>
            </div>
            <h1 className="text-2xl font-bold text-white">DispatchPro</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" prefetch={false} className="text-slate-300 hover:text-white transition-colors">Features</Link>
            <Link href="/#how-it-works" prefetch={false} className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
            <Link href="/#pricing" prefetch={false} className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/#contact" prefetch={false} className="text-slate-300 hover:text-white transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/train" prefetch={false} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/25">
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

