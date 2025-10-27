'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#0A192F] text-white py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert text-slate-300">
            <p>This is a placeholder for the Terms of Service. By using our service, you agree to these terms.</p>
            <p>More details will be provided here soon.</p>
          </div>
          <div className="mt-8">
            <Link href="/" prefetch={false} className="text-blue-400 hover:underline">Go back to Home</Link>
          </div>
        </div>
      </main>
    </>
  );
}