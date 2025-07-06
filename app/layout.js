import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mongo - Your Financial Future",
  description: "Transform your financial journey with our comprehensive platform. Track, invest, and grow your wealth with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/logo-sm.webp" sizes="any" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${inter.className} bg-gradient-to-br from-slate-50 via-white to-blue-50/30 antialiased`}>
          {/* Background decoration */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
          
          {/* Main layout container */}
          <div className="relative min-h-screen flex flex-col">
            {/* Header with backdrop blur */}
            <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
              <Header />
            </div>
            
            {/* Main content area */}
            <main className="flex-1 relative">
              {/* Content wrapper with max-width and padding */}
              <div className="w-full">
                {children}
              </div>
            </main>
            
            {/* Enhanced footer */}
            <footer className="relative mt-auto">
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
    <div className="container mx-auto px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h3 className="text-xl font-bold">Mongo</h3>
        </div>
        
        {/* Links */}
        <div className="flex gap-6 text-sm text-blue-100">
          <a href="#" className="hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors">Investments</a>
          <a href="#" className="hover:text-white transition-colors">Help</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
        
        {/* Copyright */}
        <div className="text-blue-100 text-sm">
          © 2025 Mongo. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</footer>
          </div>
          
          {/* Enhanced Toaster */}
          <Toaster 
            richColors 
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}