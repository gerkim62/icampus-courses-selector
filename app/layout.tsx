import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advanced iCampus Courses Selector",
  description:
    "Welcome to the experiment for selecting advanced courses on iCampus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-148px)]">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
