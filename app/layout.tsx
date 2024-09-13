import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Dive",
  description: "C and JD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <header className={`${styles.header} animate-slideDown bg-gradient-to-r from-black to-black p-3 shadow-lg rounded-lg`}>
          <a href="/#" className={`${styles.logo} animate-fadeIn text-2.5xl font-extrabold text-white transition-transform transform hover:scale-105`}>TECH DIVE</a>
          <nav className={`${styles.navbar} flex flex-wrap space-x-10 mt-2 justify-center md:justify-start`}>
            <a href="/#" className=" animate-fadeIn text-2.5xl font-extrabold text-white transition-transform transform hover:scale-105">Home</a>
            <a href="/#motive-section" className=" animate-fadeIn text-2.5xl font-extrabold text-white transition-transform transform hover:scale-105">Story</a>
            <a href="/#resources-section" className=" animate-fadeIn text-2.5xl font-extrabold text-white transition-transform transform hover:scale-105">Resources</a>
            <a href="/#about-section" className=" animate-fadeIn text-2.5xl font-extrabold text-white transition-transform transform hover:scale-105">About</a>
          </nav>
        </header>

        <main className={styles.main}>
          {/* Background Video */}
          <video
            src="/background.mp4"
            autoPlay
            muted
            loop
            className={styles.video}
          />
          {/* Main Content */}
          {children}
        </main>
      </body>
    </html>
  );
}

