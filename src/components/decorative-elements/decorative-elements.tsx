'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export function DecorativeElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className='absolute inset-0 pointer-events-none overflow-hidden'>
      {/* Floating geometric shapes */}
      <motion.div
        style={{ y: y1, rotate }}
        className='absolute top-20 right-10 w-32 h-32 opacity-10'
      >
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <polygon
            points='50,10 90,90 10,90'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-primary'
          />
        </svg>
      </motion.div>

      {/* Grid pattern */}
      <motion.div
        style={{ y: y2 }}
        className='absolute bottom-20 left-10 w-40 h-40 opacity-5'
      >
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <defs>
            <pattern id='decorative-grid' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'>
              <path d='M 20 0 L 0 0 0 20' fill='none' stroke='currentColor' strokeWidth='1'/>
            </pattern>
          </defs>
          <rect width='100' height='100' fill='url(#decorative-grid)' className='text-secondary'/>
        </svg>
      </motion.div>

      {/* Circular elements */}
      <motion.div
        style={{ y: y3 }}
        className='absolute top-1/2 left-20 w-24 h-24 opacity-8'
      >
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <circle
            cx='50'
            cy='50'
            r='40'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            strokeDasharray='20,10'
            className='text-accent'
          />
        </svg>
      </motion.div>

      {/* Hexagon pattern */}
      <motion.div
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
        className='absolute bottom-40 right-20 w-28 h-28 opacity-6'
      >
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <polygon
            points='50,10 90,30 90,70 50,90 10,70 10,30'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-primary'
          />
        </svg>
      </motion.div>

      {/* Dots pattern */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 120]) }}
        className='absolute top-1/3 left-1/2 w-20 h-20 opacity-4'
      >
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <circle cx='20' cy='20' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='50' cy='20' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='80' cy='20' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='20' cy='50' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='50' cy='50' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='80' cy='50' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='20' cy='80' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='50' cy='80' r='3' fill='currentColor' className='text-secondary'/>
          <circle cx='80' cy='80' r='3' fill='currentColor' className='text-secondary'/>
        </svg>
      </motion.div>
    </div>
  );
} 