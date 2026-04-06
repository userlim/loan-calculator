import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Loan Calculator - Free Mortgage & Loan Payment Calculator',
  description: 'Calculate your monthly loan payments, mortgage calculations, and amortization schedules. Free online loan calculator tool.',
  metadataBase: new URL('https://loan-payment-calculator-eosin.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://loan-payment-calculator-eosin.vercel.app',
    siteName: 'Loan Calculator',
    title: 'Loan Calculator - Free Mortgage & Loan Payment Calculator',
    description: 'Calculate your monthly loan payments, mortgage calculations, and amortization schedules. Free online loan calculator tool.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator - Free Mortgage & Loan Payment Calculator',
    description: 'Calculate your monthly loan payments, mortgage calculations, and amortization schedules. Free online loan calculator tool.',
  },
  alternates: {
    canonical: 'https://loan-payment-calculator-eosin.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
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
      <head>
        <meta name="google-site-verification" content="hsjncRi9cl3tz3Otd6SJKurSt_V1bZ0AKO-bdWIGeHM" />
        <meta name="google-site-verification" content="ETO59LUETFhBHTx7GMun0GscvJgzLq2iGWdeAmh3e10" />
        <meta name="google-adsense-account" content="ca-pub-4361110443201092" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361110443201092" crossOrigin="anonymous"></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c5cbf" />
        <meta name="author" content="Loan Calculator Tool" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P04TH8XJJ9"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P04TH8XJJ9');`
        }} />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5a3.5 3.5 0 0 0-3.5 3.5v10A3.5 3.5 0 0 0 5 18.5h10a3.5 3.5 0 0 0 3.5-3.5V9.5" />
                <path d="M10 7v6m-2-2h4" strokeWidth="1.5" stroke="currentColor" fill="none" />
              </svg>
              <h1 className="text-xl font-bold text-accent">Loan Calculator</h1>
            </div>
          </div>
        </header>

        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
              <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </a>
            </div>
            <p>&copy; 2026 Loan Calculator Tool. All rights reserved.</p>
            <p className="text-sm mt-2 text-gray-400">Free financial calculator for educational purposes.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
