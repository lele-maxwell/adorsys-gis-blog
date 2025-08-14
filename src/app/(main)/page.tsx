import Link from 'next/link';
import { Container } from '@blog/components/container';
import { Home as HomeIcon, BookOpen, Search, Globe } from 'react-feather';

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

      {/* Main Content with Left Navigation */}
      <div className='flex relative z-10'>
        {/* Left Vertical Navigation Bar */}
        <div className='fixed left-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center gap-8'>
          <Link href='/' className='p-3 bg-primary/20 rounded-xl text-primary hover:bg-primary/30 transition-colors shadow-lg'>
            <HomeIcon className='w-6 h-6' />
          </Link>
          
          <Link href='/courses' className='p-3 bg-base-200/60 backdrop-blur-md rounded-xl text-base-content/70 hover:text-base-content hover:bg-base-200/80 transition-colors shadow-lg'>
            <BookOpen className='w-6 h-6' />
          </Link>
          
          <div className='p-3 bg-base-200/60 backdrop-blur-md rounded-xl text-base-content/70 hover:text-base-content hover:bg-base-200/80 transition-colors cursor-pointer shadow-lg'>
            <Search className='w-6 h-6' />
          </div>
          
          {/* Language Selector */}
          <div className='p-3 bg-base-200/60 backdrop-blur-md rounded-xl text-base-content/70 hover:text-base-content hover:bg-base-200/80 transition-colors cursor-pointer shadow-lg'>
            <Globe className='w-6 h-6' />
          </div>
        </div>

        {/* Main Content Area */}
        <div className='flex-1 ml-24'>
          {/* Hero Section */}
          <div className='relative overflow-hidden'>
            <Container className='relative z-10'>
              <div className='flex flex-col lg:flex-row items-center min-h-[calc(100vh-120px)] gap-16'>
                {/* Left Content */}
                <div className='flex-1 text-center lg:text-left'>
                  <div className='mb-12'>
                    {/* Main Heading */}
                    <h1 className='text-5xl md:text-7xl lg:text-8xl font-black text-base-content mb-8 leading-tight tracking-tight'>
                    
                      <span className='block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
                        Knowledge Hub
                      </span>
                    </h1>
                    
                    {/* Decorative Line */}
                    <div className='w-32 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto lg:mx-0 mb-10'></div>
                  </div>
                  
                  {/* Subtitle */}
                  <h2 className='text-2xl md:text-3xl text-base-content/90 mb-6 font-semibold leading-relaxed'>
                    Your Gateway to Professional Excellence
                  </h2>
                  
                  {/* Description */}
                  <p className='text-lg md:text-xl text-base-content/70 mb-8 max-w-3xl leading-relaxed font-light'>
                    Embark on a transformative learning journey with our comprehensive collection of 
                    expertly curated courses and resources designed to elevate your skills and advance your career.
                  </p>

                  {/* Features List */}
                  <div className='flex flex-wrap gap-6 mb-12 text-base-content/80'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-primary rounded-full'></div>
                      <span className='text-sm font-medium'>Expert-Led Content</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-secondary rounded-full'></div>
                      <span className='text-sm font-medium'>Interactive Learning</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-accent rounded-full'></div>
                      <span className='text-sm font-medium'>Practical Skills</span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className='flex justify-center items-center mt-8'>
                  <Link 
                    href='/courses' 
                      className='inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-focus text-primary-content font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg'
                  >
                    Get Started
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </Link
                  >
                    
                  </div>
                </div>

                {/* Right Learning Image Card */}
                <div className='flex-1 max-w-lg'>
                  <div className='relative'>
                    {/* Background Cards - Layered Effect */}
                    <div className='absolute top-4 left-4 w-full h-96 bg-blue-900/40 rounded-3xl transform rotate-2'></div>
                    <div className='absolute top-2 left-2 w-full h-96 bg-purple-800/50 rounded-3xl transform -rotate-1'></div>
                    
                    {/* Additional Background Cards for Main Card */}
                    <div className='absolute -top-2 -left-2 w-full h-96 bg-cyan-900/30 rounded-3xl transform rotate-3'></div>
                    <div className='absolute -top-1 -left-1 w-full h-96 bg-indigo-800/45 rounded-3xl transform -rotate-2'></div>
                    <div className='absolute top-1 left-1 w-full h-96 bg-blue-700/60 rounded-3xl transform rotate-1'></div>
                    
                    {/* Main Card - Moved Up */}
                    <div className='bg-slate-800/90 rounded-3xl p-0 border border-slate-700/50 shadow-2xl relative overflow-hidden -mt-8'>
                      {/* Full Card Image */}
                      <div className='relative w-full h-96'>
                        <img 
                          src="https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg"
                          alt="Student with tablet"
                          className='w-full h-full object-cover'
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Background Cards for Team Card - Layered Effect */}
                    <div className='absolute top-[28rem] left-8 w-full h-96 bg-blue-900/40 rounded-3xl transform rotate-2'></div>
                    <div className='absolute top-[28rem] left-8 w-full h-96 bg-purple-800/50 rounded-3xl transform -rotate-1'></div>
                    <div className='absolute top-[28rem] left-8 w-full h-96 bg-cyan-900/30 rounded-3xl transform rotate-3'></div>
                    <div className='absolute top-[28rem] left-8 w-full h-96 bg-indigo-800/45 rounded-3xl transform -rotate-2'></div>
                    <div className='absolute top-[28rem] left-8 w-full h-96 bg-blue-700/60 rounded-3xl transform rotate-1'></div>
                    
                    {/* Team Collaboration Card - Below Main Card with Gap and Right Shift */}
                    <div className='absolute top-[28rem] left-8 w-full h-96 bg-slate-800/90 rounded-3xl p-0 border border-slate-700/50 shadow-2xl overflow-hidden'>
                      <div className='relative w-full h-full'>
                        <img 
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                          alt="Team collaboration"
                          className='w-full h-full object-cover'
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                          }}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-800/20 to-transparent'></div>
                        
                        {/* Content Overlay */}
                        <div className='absolute bottom-6 left-6 right-6'>
                          <div className='text-white text-xl font-bold mb-2'>Team Collaboration</div>
                          <div className='text-white/80 text-sm'>Real-time learning with peers</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Live Session Card - Middle Cutting Through Both */}
                    <div className='absolute top-80 -right-8 w-64 h-40 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg z-30'>
                      <div className='p-6 h-full flex flex-col justify-between'>
                    <div className='flex items-center gap-3'>
                          <div className='w-4 h-4 bg-green-400 rounded-full animate-pulse'></div>
                          <span className='text-white/90 text-base font-medium'>Live Session</span>
                        </div>
                        <div className='text-center'>
                          <div className='text-white text-2xl font-bold'>2.5k+</div>
                          <div className='text-white/70 text-base'>Active Learners</div>
                        </div>
                        <div className='flex items-center justify-center gap-3'>
                          <div className='w-3 h-3 bg-blue-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-purple-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-cyan-400 rounded-full'></div>
                          <span className='text-white/80 text-sm'>Global Community</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className='absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/80 rounded-full animate-pulse'></div>
                    <div className='absolute -bottom-2 -left-2 w-6 h-6 bg-green-400/60 rounded-full animate-pulse delay-1000'></div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
