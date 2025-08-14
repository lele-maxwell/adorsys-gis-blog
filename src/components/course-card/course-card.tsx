'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, easeOut } from 'framer-motion';

interface CourseCardProps {
  blog_slug: string;
  index: number;
}

export function CourseCard({ blog_slug, index }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Staggered entrance animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 60,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.8 + index * 0.15, // Stagger entrance
      },
    },
  };

  // 3D hover animation variants
  const hoverVariants = {
    rest: {
      rotateY: 0,
      rotateX: 0,
      translateZ: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    hover: {
      rotateY: 12,
      rotateX: 4,
      translateZ: 40,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  };

  // Image hover animation variants
  const imageVariants = {
    rest: {
      scale: 1,
      filter: 'brightness(1) contrast(1) saturate(1)',
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    hover: {
      scale: 1.10,
      filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  };

  return (
    <Link href={`/b/${blog_slug}`} className='block'>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ y, opacity }}
        className='perspective-[1200px]'
      >
        <motion.div
          variants={hoverVariants}
          initial="rest"
          animate={isHovered ? 'hover' : 'rest'}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className='card bg-base-200 hover:bg-base-300 transition-colors duration-300 shadow-sm hover:shadow-2xl rounded-2xl overflow-hidden group cursor-pointer transform-gpu'
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Enhanced Image Section */}
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="rest"
            animate={isHovered ? 'hover' : 'rest'}
            className='aspect-video bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center relative overflow-hidden'
          >
            {/* Decorative background pattern */}
            <div className='absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300'>
              <svg className='w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
                <defs>
                  <pattern id={`grid-${blog_slug}`} x='0' y='0' width='10' height='10' patternUnits='userSpaceOnUse'>
                    <path d='M 10 0 L 0 0 0 10' fill='none' stroke='currentColor' strokeWidth='0.5'/>
                  </pattern>
                </defs>
                <rect width='100' height='100' fill={`url(#grid-${blog_slug})`}/>
              </svg>
            </div>
            
            {/* Main icon/text */}
            <div className='text-6xl font-black opacity-10 group-hover:opacity-20 transition-all duration-300 relative z-10'>
              {blog_slug.substring(0, 2).toUpperCase()}
            </div>
            
            {/* Hover overlay effect */}
            <div className='absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>

          {/* Card Content */}
          <div className='card-body relative z-10'>
            <h2 className='card-title capitalize text-lg group-hover:text-primary transition-colors duration-300'>
              {blog_slug.replace(/[-_]/g, ' ')}
            </h2>
            <p className='text-sm opacity-70 group-hover:opacity-90 transition-colors duration-300'>
              Click to view lesson details and slides.
            </p>
            <div className='card-actions justify-end'>
              <span className='btn btn-primary btn-sm rounded-full group-hover:scale-105 transition-transform duration-300'>
                Open
              </span>
            </div>
          </div>

          {/* Subtle border glow on hover */}
          <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none' />
        </motion.div>
      </motion.div>
    </Link>
  );
} 