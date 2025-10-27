'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#0A192F] text-white py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Mission</h1>
            <p className="text-lg text-slate-300">
              To empower emergency dispatchers with the world's most advanced and effective training simulator.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold mb-6">The Challenge</h2>
              <p className="text-slate-300 leading-relaxed">
                Emergency dispatchers are the first point of contact in a crisis. They face immense pressure to make life-or-death decisions in seconds. Traditional training methods often fall short of preparing them for the unpredictable and emotionally charged nature of real-world emergencies.
              </p>
            </div>
            <div>
              <img src="/challenge.jpg" alt="Dispatcher under pressure" className="rounded-2xl shadow-2xl" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="/solution.jpg" alt="Dispatcher using DispatchPro" className="rounded-2xl shadow-2xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">The Solution</h2>
              <p className="text-slate-300 leading-relaxed">
                DispatchPro bridges the gap between classroom training and real-world experience. Our AI-powered simulator provides a safe and controlled environment for dispatchers to hone their skills, build confidence, and develop the muscle memory needed to excel under pressure. By creating realistic and dynamic scenarios, we empower dispatchers to be at their best when it matters most.
              </p>
            </div>
          </div>

          <div className="text-center mt-24">
            <Link
              href="/train"
              prefetch={false}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}