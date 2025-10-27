'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

import MissionControlPreview from '@/components/MissionControlPreview';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-[#0A192F] text-white">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-screen">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/50 to-[#0A192F]"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Train. Respond. Save Lives.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
              AI-powered simulations that prepare emergency dispatchers for real-world challenges.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/train"
                prefetch={false}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
              >
                Start Free Demo
              </Link>
              <Link
                href="#how-it-works"
                prefetch={false}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">A New Era of Dispatcher Training</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
                DispatchPro provides the most realistic and effective training experience for emergency dispatchers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon="🤖"
                title="AI-Powered Scenarios"
                description="Dynamically generated scenarios that adapt to trainee responses, creating a unique experience every time."
              />
              <FeatureCard
                icon="🔊"
                title="Realistic Audio & Dialogue"
                description="Lifelike audio and natural language conversations that immerse trainees in high-pressure situations."
              />
              <FeatureCard
                icon="📈"
                title="Performance Analytics"
                description="In-depth feedback and performance tracking to identify strengths and areas for improvement."
              />
              <FeatureCard
                icon="👥"
                title="Team Management Tools"
                description="Easily manage trainees, assign scenarios, and track team progress from a centralized dashboard."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Three Simple Steps to Mastery</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-16">
              <HowItWorksStep icon="1" title="Simulate" description="Launch a scenario from our extensive library or create your own." />
              <HowItWorksStep icon="2" title="Engage" description="Interact with the AI caller and make critical decisions in real-time." />
              <HowItWorksStep icon="3" title="Evaluate" description="Receive instant feedback and review your performance analytics." />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Trusted by Leading Agencies</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Testimonial
                quote="DispatchPro has revolutionized our training program. Our dispatchers are more confident and better prepared than ever before."
                author="Jane Doe"
                title="Training Supervisor, Anytown Emergency Services"
              />
              <Testimonial
                quote="The realism of the simulations is incredible. It's the closest you can get to a real emergency call without being in one."
                author="John Smith"
                title="911 Dispatcher, Metro City Police"
              />
              <Testimonial
                quote="The performance analytics have been a game-changer for us. We can now identify and address skill gaps with precision."
                author="Emily Jones"
                title="Director of Operations, County Sheriff's Office"
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Mission Control</h2>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <MissionControlPreview />
            </div>
            <Link href="/train" prefetch={false} className="mt-12 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all">
              Try the Simulator
            </Link>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to prepare your team for real emergencies?</h2>
          <Link href="/train" prefetch={false} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all">
            Request a Demo
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                    <span className="text-xl">🚨</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">DispatchPro</h3>
                </div>
                <p className="text-slate-400 text-sm">
                  AI-Powered Emergency Dispatch Training Simulator
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="#features" prefetch={false} className="text-slate-400 hover:text-white text-sm transition-colors">Features</Link></li>
                  <li><Link href="#how-it-works" prefetch={false} className="text-slate-400 hover:text-white text-sm transition-colors">How It Works</Link></li>
                  <li><Link href="#pricing" prefetch={false} className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
                  <li><Link href="#contact" prefetch={false} className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" prefetch={false} className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" prefetch={false} className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-slate-800 pt-8 flex justify-between items-center">
              <p className="text-slate-500 text-sm">&copy; 2024 DispatchPro. All rights reserved.</p>
              <div className="flex space-x-4">
                {/* Social Icons */}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:scale-105 group">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <span className="text-4xl">{icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const HowItWorksStep = ({ icon, title, description }) => (
  <div className="text-center max-w-xs">
    <div className="w-20 h-20 mx-auto mb-6 bg-slate-800 border-2 border-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-blue-500">{icon}</div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const Testimonial = ({ quote, author, title }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
    <p className="text-lg italic text-slate-300 mb-6">"{quote}"</p>
    <div>
      <p className="font-bold text-white">{author}</p>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  </div>
);