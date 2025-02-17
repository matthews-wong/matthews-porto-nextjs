"use client"; // Ensures this is a Client Component

import React from 'react'; // Required for JSX
import Link from 'next/link';
import { HomeIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 flex items-center justify-center px-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      <div className="relative max-w-lg w-full text-center bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/10">
        <div className="relative mb-8">
          <Image
            src="/404.svg"
            alt="404 Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Oops! You are in the wrong place.
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Please go back to Matthews Wong Portfolio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-transparent border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}