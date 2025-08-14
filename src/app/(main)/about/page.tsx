import { Container } from '@blog/components/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | adorsys GIS',
  description: 'Learn more about adorsys GIS and our mission to provide quality GIS education.',
};

export default function AboutPage() {
  return (
    <Container>
      <div className='text-center py-16'>
        <h1 className='text-4xl md:text-6xl font-extrabold mb-8'>
          <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            About adorsys GIS
          </span>
        </h1>
        
        <div className='max-w-4xl mx-auto'>
          <p className='text-xl text-base-content/80 mb-8 leading-relaxed'>
            adorsys GIS is dedicated to providing high-quality, accessible education in Geographic Information Systems. 
            Our platform combines theoretical knowledge with practical applications to help learners master modern GIS technologies.
          </p>
          
          <p className='text-lg text-base-content/70 leading-relaxed'>
            We believe in making complex spatial concepts accessible through interactive learning experiences, 
            comprehensive course materials, and real-world examples that prepare students for professional success.
          </p>
        </div>
      </div>
    </Container>
  );
} 