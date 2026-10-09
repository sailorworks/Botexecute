import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Nav from "./components/Nav";
import BotChainProofCard from "./components/BotChainProofCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BotExecute",
  description: "Accountability challenges on BOT Chain. Stake BOT, execute, or lose it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Nav />
          {children}
          <footer className="w-full border-t border-black/10 bg-[#071210] px-4 py-8 dark:border-white/10">
            <div className="mx-auto w-full max-w-[1400px]">
              <BotChainProofCard />
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
