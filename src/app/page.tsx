'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-900 text-white">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-screen bg-grid-white/[0.02]">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DispatchPro
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
              AI-Powered Emergency Dispatch Training Simulator
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/train"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
              >
                Start Training
              </Link>
              <Link
                href="/about"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
