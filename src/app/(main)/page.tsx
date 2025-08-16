import Link from 'next/link';
import { Container } from '@blog/components/container';
import { TranslatedHomeContent } from './TranslatedHomeContent';

export default async function Home() {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <div 
          className='w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="bg" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%2303121f"/></radialGradient><linearGradient id="grid" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230ea5e9" stop-opacity="0.1"/><stop offset="100%" stop-color="%238b5cf6" stop-opacity="0.1"/></linearGradient><pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse"><path d="M30 0l30 26v26L30 78 0 52V26L30 0z" fill="none" stroke="%230ea5e9" stroke-width="1" opacity="0.2"/></pattern><pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%230ea5e9" opacity="0.3"/></pattern></defs><rect width="1200" height="800" fill="url(%23bg)"/><rect width="1200" height="800" fill="url(%23grid)"/><rect width="1200" height="800" fill="url(%23hex)"/><rect width="1200" height="800" fill="url(%23dots)"/><circle cx="200" cy="150" r="100" fill="%230ea5e9" opacity="0.05"/><circle cx="1000" cy="600" r="150" fill="%238b5cf6" opacity="0.05"/><polygon points="300,400 400,300 500,400 400,500" fill="%2310b981" opacity="0.05"/><path d="M100 700 Q300 600 500 700 T900 700" stroke="%230ea5e9" stroke-width="2" fill="none" opacity="0.1"/><path d="M150 100 Q350 200 550 100 T950 100" stroke="%238b5cf6" stroke-width="2" fill="none" opacity="0.1"/></svg>')`
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className='relative z-10 ml-24'>
        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          <Container className='relative z-10'>
            <TranslatedHomeContent />
          </Container>
        </div>
      </div>
    </div>
  );
}
