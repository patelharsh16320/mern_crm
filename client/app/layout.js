'use client';

import { useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './css/style.css';
import Navbar from "./Menu/Navbar";
import Sidebar from "./Menu/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(prev => !prev);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastContainer />
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          {showSidebar && (
            <aside className="w-64 bg-white text-gray-800 border-r shadow-md fixed h-full z-40">
              <Sidebar />
            </aside>
          )}

          {/* Main content */}
          <div className={`flex-1 flex flex-col ${showSidebar ? 'ml-64' : ''}`}>
            <Navbar onLogoClick={toggleSidebar} />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
