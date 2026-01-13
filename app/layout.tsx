import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EO Designs — Web, Automation & Tech Ops',
  description: 'Engineer-built websites, automation, tech support, and media ops for small businesses.',
  metadataBase: new URL('https://eodesigns.com'),
  openGraph: {
    title: 'EO Designs',
    description: 'Engineer-built websites, automation, tech support, and media ops.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Animated background layer - fixed behind everything */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -9999 }}>
          {/* Large animated orbs */}
          <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/25 to-transparent animate-float"></div>
          <div className="absolute top-[25%] -right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-500/20 to-transparent animate-float" style={{ animationDirection: 'reverse', animationDelay: '5s' }}></div>
          <div className="absolute top-[50%] left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-red-500/15 to-transparent animate-float" style={{ animationDelay: '10s' }}></div>
          <div className="absolute top-[75%] -left-[8%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/20 to-transparent animate-float" style={{ animationDirection: 'reverse', animationDelay: '15s' }}></div>
          
          {/* Geometric lines */}
          <div className="absolute top-[40%] left-[10%] w-[200px] h-[3px] bg-gradient-to-r from-green-400/50 to-transparent animate-pulse" style={{ animationDelay: '5s' }}></div>
          
          {/* Grid lines */}
          <div className="absolute top-[30%] left-[50%] w-[2px] h-[400px] bg-gradient-to-b from-blue-300/30 via-blue-300/15 to-transparent"></div>
          <div className="absolute top-[35%] left-[20%] w-[600px] h-[2px] bg-gradient-to-r from-transparent via-green-300/30 to-transparent"></div>
          
          {/* Blob/circle animation */}
          <div className="absolute top-[60%] right-[30%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-blue-400/20 to-green-400/10 animate-float" style={{ animationDuration: '20s', animationDelay: '8s' }}></div>
          
          {/* Matrix code - vertical scrolling binary */}
          <div className="absolute top-[10%] right-[2%] w-[640px] h-[400px] overflow-hidden">
            <div className="animate-matrix-scroll text-green-400/40 font-mono text-xs leading-tight whitespace-nowrap">
              {Array(40).fill(0).map((_, i) => (
                <div key={i}>{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}</div>
              ))}
            </div>
          </div>
          
          {/* Matrix code - vertical scrolling binary (center) */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[480px] h-[350px] overflow-hidden">
            <div className="animate-matrix-scroll text-blue-400/30 font-mono text-xs leading-tight whitespace-nowrap" style={{ animationDelay: '-8s' }}>
              {Array(35).fill(0).map((_, i) => (
                <div key={i}>{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}</div>
              ))}
            </div>
          </div>
        </div>
        
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
