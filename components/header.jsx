import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl z-50 border-b border-slate-700/50 shadow-2xl shadow-slate-900/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Enhanced Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl border border-blue-500/30">
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MANGO
            </span>
            <span className="text-xs text-slate-400 font-medium tracking-widest">
              FINANCIAL
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <div className="flex items-center space-x-8">
              <a 
                href="#features" 
                className="group relative text-slate-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10 px-3 py-1"></div>
              </a>
              <a 
                href="#testimonials" 
                className="group relative text-slate-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="relative z-10">Testimonials</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10 px-3 py-1"></div>
              </a>
            </div>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="group relative bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-500/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                <LayoutDashboard className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <PenBox className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden md:inline relative z-10">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button 
                variant="outline" 
                className="group relative bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-500/50 hover:text-white transition-all duration-300 backdrop-blur-sm font-medium"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                <span className="relative z-10">Login</span>
              </Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="relative">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-blue-500/50 hover:ring-blue-500 transition-all duration-300 shadow-lg",
                    userButtonPopoverCard: "bg-slate-900 border-slate-700 backdrop-blur-xl",
                    userButtonPopoverActionButton: "text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-200",
                  },
                }}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse shadow-lg shadow-green-500/50"></div>
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 via-transparent to-purple-600/3 pointer-events-none"></div>
    </header>
  );
};

export default Header;
