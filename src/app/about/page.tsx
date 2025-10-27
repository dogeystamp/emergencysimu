import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About DispatchPro
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Empowering the next generation of emergency dispatchers with cutting-edge AI simulation technology.
            </p>
          </div>

          <div className="space-y-12">
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed">
                DispatchPro is dedicated to providing a realistic and safe training environment for emergency dispatchers. We believe that by leveraging the power of AI, we can create highly immersive and effective training simulations that prepare dispatchers for the high-stakes reality of their job. Our mission is to improve emergency response outcomes by empowering dispatchers with the skills and confidence they need to excel.
              </p>
            </div>

            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">1</div>
                  <p>Launch a training session and get assigned a random, AI-generated emergency scenario.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">2</div>
                  <p>Interact with a realistic AI caller that responds to your questions and commands in real-time.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">3</div>
                  <p>Utilize quick responses and your own custom messages to navigate the conversation and gather critical information.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">4</div>
                  <p>Receive feedback on your performance and identify areas for improvement.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/train"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
            >
              Start Your Training
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

