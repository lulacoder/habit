import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Build better habits",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {/* Decorative gradient orbs for depth */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-slow" />
          <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
