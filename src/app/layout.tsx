import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exponentio Labs - Advanced Lab Equipment & Innovation Platform',
  description: 'Cutting-edge AR/VR, Robotics, Fullstack Development, Embedded Systems, Agentic AI, and IDEA Lab equipment for research and development. Connect with skilled professionals.',
  keywords: 'lab equipment, AR/VR, robotics, AI, embedded systems, fullstack development, IDEA lab, innovation, research',
  authors: [{ name: 'Exponentio Labs Team' }],
  creator: 'Exponentio Labs',
  publisher: 'Exponentio Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://exponentiolabs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Exponentio Labs - Advanced Lab Equipment & Innovation Platform',
    description: 'Cutting-edge AR/VR, Robotics, Fullstack Development, Embedded Systems, Agentic AI, and IDEA Lab equipment for research and development.',
    url: 'https://exponentiolabs.com',
    siteName: 'Exponentio Labs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exponentio Labs Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exponentio Labs - Advanced Lab Equipment & Innovation Platform',
    description: 'Cutting-edge AR/VR, Robotics, Fullstack Development, Embedded Systems, Agentic AI, and IDEA Lab equipment.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
