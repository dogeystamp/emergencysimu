'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function LoginPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#0A192F] text-white flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Login</h1>
          <p className="text-slate-400 mb-8">This page is under construction.</p>
          <Link href="/" className="text-blue-400 hover:underline">Go back to Home</Link>
        </div>
      </main>
    </>
  );
}