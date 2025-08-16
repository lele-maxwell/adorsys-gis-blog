'use client';

import { useState, useEffect } from 'react';
import Display from '@blog/components/display';
import { useLanguage } from '@blog/components/language-switcher';

interface TranslatedCourseContentProps {
  data: string;
  type: 'course' | 'slides';
  blogSlug: string;
}

// Function to load translated content
async function loadTranslatedContent(blogSlug: string, type: 'course' | 'slides', language: string): Promise<string | null> {
  try {
    // Try to load the language-specific file
    const response = await fetch(`/api/translated-content?slug=${blogSlug}&type=${type}&lang=${language}`);
    if (response.ok) {
      const data = await response.json();
      return data.content;
    }
  } catch (error) {
    console.warn(`Failed to load ${language} content for ${blogSlug}:`, error);
  }
  
  return null;
}

export function TranslatedCourseContent({ data, type, blogSlug }: TranslatedCourseContentProps) {
  const { currentLanguage } = useLanguage();
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debug logging
  console.log('TranslatedCourseContent:', { blogSlug, type, currentLanguage, hasTranslatedContent: !!translatedContent });

  // Load translated content when language changes
  useEffect(() => {
    console.log('Language changed, loading content for:', { blogSlug, type, currentLanguage });
    
    if (currentLanguage === 'en') {
      // Use original content for English
      setTranslatedContent(null);
      return;
    }

    setIsLoading(true);
    loadTranslatedContent(blogSlug, type, currentLanguage)
      .then((content) => {
        console.log('Translation loaded:', { blogSlug, type, currentLanguage, contentLength: content?.length });
        setTranslatedContent(content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Translation failed:', { blogSlug, type, currentLanguage, error });
        setTranslatedContent(null);
        setIsLoading(false);
      });
  }, [currentLanguage, blogSlug, type]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-base-content/70">Loading translation...</span>
      </div>
    );
  }

  // Use translated content if available, otherwise fall back to original
  const contentToDisplay = translatedContent || data;

  // Render slides
  if (type === 'slides') {
    return <Display data={contentToDisplay} />;
  }

  // Render course content - content is already HTML from both sources
  return (
    <article className='prose prose-neutral lg:prose-xl mx-auto mt-8'>
      <div dangerouslySetInnerHTML={{ __html: contentToDisplay }} />
    </article>
  );
} 