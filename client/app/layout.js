'use client';

import { useEffect, useRef, useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './css/style.css';
import Navbar from "./Menu/Navbar";
import Sidebar from "./Menu/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from 'gsap';

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
  const [renderSidebar, setRenderSidebar] = useState(false); // controls DOM render
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    if (showSidebar) {
      // Animate close
      gsap.to(sidebarRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setShowSidebar(false);
          setRenderSidebar(false);
        },
      });
    } else {
      setRenderSidebar(true);
    }
  };

  // Run open animation once sidebar is in DOM
  useEffect(() => {
    if (renderSidebar) {
      setShowSidebar(true);
    }
  }, [renderSidebar]);

  useEffect(() => {
    if (showSidebar && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, [showSidebar]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastContainer />
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
          {/* Sidebar */}
          {renderSidebar && (
            <aside
              ref={sidebarRef}
              className="w-64 bg-white text-gray-800 border-r shadow-md fixed h-full z-40 top-0 left-0"
            >
              <Sidebar />
            </aside>
          )}

          {/* Main content */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${showSidebar ? 'ml-64' : ''}`}>
            <Navbar onLogoClick={toggleSidebar} />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
