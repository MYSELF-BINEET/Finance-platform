import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="px-5 py-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
                  Dashboard
                </h1>
                <p className="text-white/60 text-sm mt-1 font-medium">
                  Welcome back! Here's your command center
                </p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 text-xs font-medium">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 text-xs font-medium">Synced</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 text-xs font-medium">AI Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium">Performance</p>
                  <p className="text-white text-lg font-bold">98.5%</p>
                </div>
                <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-300 text-sm">⚡</span>
                </div>
              </div>
            </div>
            
            {/* <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium">Active Users</p>
                  <p className="text-white text-lg font-bold">1,247</p>
                </div>
                <div className="w-8 h-8 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-300 text-sm">👥</span>
                </div>
              </div>
            </div> */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium">Data Processed</p>
                  <p className="text-white text-lg font-bold">2.8TB</p>
                </div>
                <div className="w-8 h-8 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-300 text-sm">📊</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium">Revenue</p>
                  <p className="text-white text-lg font-bold">$12.4K</p>
                </div>
                <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-300 text-sm">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                {/* Enhanced Loading Animation */}
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin animate-reverse"></div>
                </div>
                
                {/* Gradient Progress Bar */}
                <div className="w-full max-w-md relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <BarLoader 
                      width="100%" 
                      height={8}
                      color="#9333ea" 
                      className="rounded-full"
                    />
                  </div>
                </div>
                
                {/* Loading Text with Glow Effect */}
                <div className="text-center space-y-2">
                  <p className="text-white/90 text-lg font-semibold tracking-wide">
                    Loading Dashboard
                  </p>
                  <p className="text-white/50 text-sm">
                    Preparing your personalized experience...
                  </p>
                </div>

                {/* Floating Dots */}
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            }
          >
            <DashboardPage />
          </Suspense>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl hover:scale-110 hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse group-hover:animate-spin transition-all duration-300"></div>
        </div>
      </div>

      {/* Corner Accent Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full"></div>
    </div>
  );
}