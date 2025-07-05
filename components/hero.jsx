// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="pt-40 pb-20 px-4">
//       <div className="container mx-auto text-center">
//         <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
//           Manage Your Finances <br /> with Intelligence
//         </h1>
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//           An AI-powered financial management platform that helps you track,
//           analyze, and optimize your spending with real-time insights.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
//           <Link href="https://www.youtube.com/roadsidecoder">
//             <Button size="lg" variant="outline" className="px-8">
//               Watch Demo
//             </Button>
//           </Link>
//         </div>
//         <div className="hero-image-wrapper mt-5 md:mt-0">
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src="/banner.jpeg"
//               width={1280}
//               height={720}
//               alt="Dashboard Preview"
//               className="rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;




"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Crown, Star, ChevronRight, Zap, Shield, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950"
    >
      {/* Dynamic mesh background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.4),transparent_50%)]"></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 border border-white/10 rounded-full"
          style={{
            top: '20%',
            left: '10%',
            transform: `rotate(${scrollY * 0.1}deg)`,
            animation: 'spin 20s linear infinite'
          }}
        />
        <div 
          className="absolute w-72 h-72 border border-purple-500/20 rounded-full"
          style={{
            bottom: '20%',
            right: '15%',
            transform: `rotate(${-scrollY * 0.15}deg)`,
            animation: 'spin 15s linear infinite reverse'
          }}
        />
        <div 
          className="absolute w-48 h-48 border border-pink-500/20 rounded-full"
          style={{
            top: '60%',
            right: '60%',
            transform: `rotate(${scrollY * 0.2}deg)`,
            animation: 'spin 10s linear infinite'
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 20}px)`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      <br />
      <br />

      <div className="container mx-auto px-6 text-center relative z-10 my-6" >
        {/* Premium badge */}
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/20 mb-8 transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Crown className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold text-white tracking-wide">Premium Financial Platform</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>

        {/* Revolutionary heading */}
        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black mb-8 transition-all duration-1200 delay-200 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-[0.9] tracking-tight">
            Financial
          </span>
          <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-clip-text text-transparent leading-[0.9] tracking-tight">
            Revolution
          </span>
        </h1>

        {/* Powerful subtitle */}
        <p className={`text-2xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-400 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Experience the future of wealth management with our 
          <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> next-generation platform</span> that transforms how you build, track, and grow your financial empire.
        </p>

        {/* Power indicators */}
        <div className={`flex flex-wrap justify-center gap-8 mb-16 transition-all duration-1000 delay-600 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { icon: TrendingUp, label: "Advanced Analytics", color: "from-green-400 to-emerald-500" },
            { icon: Shield, label: "Military-Grade Security", color: "from-blue-400 to-cyan-500" },
            { icon: Zap, label: "Lightning Fast", color: "from-yellow-400 to-orange-500" }
          ].map((item, index) => (
            <div key={index} className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-300 font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Hero CTA */}
        <div className={`flex justify-center mb-20 transition-all duration-1000 delay-800 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link href="/dashboard">
            <Button 
              size="lg" 
              className="group relative px-16 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3">
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Launch Your Empire
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className={`transition-all duration-1000 delay-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap justify-center items-center gap-12 text-slate-400">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <div className="absolute inset-0 animate-ping">
                  <Star className="w-5 h-5 text-yellow-400 opacity-75" />
                </div>
              </div>
              <span className="text-lg font-medium">Enterprise Grade</span>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
              <span className="text-lg font-medium">Real-Time Processing</span>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" />
              <span className="text-lg font-medium">AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced CSS animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;