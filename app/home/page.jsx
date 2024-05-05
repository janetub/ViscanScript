/**
 * app/home/page.jsx
 * 
 * Home page
 */

"use client";
import React from 'react';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';

export default function HomePage() {
  return (
    <ThemeProvider attribute='class'>
      <div className="flex flex-col px-6 py-5 bg-white">
        <div className="flex flex-col justify-center items-center h-screen text-gray-700">
          {/* Empty canvas */}
          <p className="text-xl">Home page is coming soon...</p>
          <div className="text-gray-500">
            <p className="text-lg mt-7 mb-2">Temporarily navagate the pages through the links:</p>
            <div className='flex text-gray-900 flex-col item-start items-center'>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/form">Form</Link>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </ThemeProvider>
  );
}