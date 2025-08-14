import Link from 'next/link';
import { getAllBlogs } from '@blog/server/blog';
import { Container } from '@blog/components/container';
import type { Metadata } from 'next';
import { Pagination } from '@blog/components/pagination';
import { CourseCard } from '@blog/components/course-card';
import { DecorativeElements } from '@blog/components/decorative-elements';
import { Search, ChevronDown } from 'react-feather';
import { loadBlog } from '@blog/converters';
import { CoursesContent } from '@blog/components/courses-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Courses | adorsys GIS',
  description: 'Browse all available lessons and blog courses.',
};

interface SearchParams {
  page?: string;
  search?: string;
}

// Course title mapping for better search
const getCourseTitle = (slug: string) => {
  const courseTitles: { [key: string]: string } = {
    'first-lesson': 'Introduction to GIS',
    'gis-basics': 'GIS Fundamentals',
    'spatial-analysis': 'Spatial Analysis',
    'web-mapping': 'Web Mapping',
    'remote-sensing': 'Remote Sensing',
    'database-management': 'Database Management',
    'programming': 'GIS Programming',
    'advanced-techniques': 'Advanced Techniques',
    'automation': 'Process Automation',
    'project-management': 'Project Management',
  };
  
  // Remove any numbers from the slug and format properly
  const cleanSlug = slug.replace(/\d+/g, '').replace(/[-_]/g, ' ').trim();
  return courseTitles[slug] || cleanSlug.replace(/\b\w/g, l => l.toUpperCase());
};

// Course description mapping for better search
const getCourseDescription = (slug: string) => {
  const courseDescriptions: { [key: string]: string } = {
    'first-lesson': 'Learn the fundamentals of Geographic Information Systems and spatial data concepts.',
    'gis-basics': 'Master core GIS principles, data types, and basic spatial analysis techniques.',
    'spatial-analysis': 'Explore advanced spatial analysis methods and statistical techniques for geographic data.',
    'web-mapping': 'Create interactive web maps and develop modern mapping applications.',
    'remote-sensing': 'Understand satellite imagery analysis and remote sensing data processing.',
    'database-management': 'Learn spatial database design and management for GIS applications.',
    'programming': 'Develop GIS automation scripts and custom spatial analysis tools.',
    'advanced-techniques': 'Master advanced GIS workflows and specialized analysis methods.',
    'automation': 'Automate GIS processes and create efficient spatial data workflows.',
    'project-management': 'Plan and execute GIS projects from conception to completion.',
  };
  
  return courseDescriptions[slug] || 'Explore comprehensive GIS concepts and practical applications.';
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(text: string, words: number): string {
  const parts = text.split(' ');
  if (parts.length <= words) return text;
  return parts.slice(0, words).join(' ') + '…';
}

function extractOverview(html: string): string | null {
  // Try to find an Overview/Project Overview heading and take the first following paragraph
  const overviewHeadingRegex = /<h[1-4][^>]*>([^<]*overview[^<]*)<\/h[1-4]>[\s\S]*?(<p>[\s\S]*?<\/p>)/i;
  const overviewMatch = overviewHeadingRegex.exec(html);
  if (overviewMatch) {
    return stripHtml(overviewMatch[2]);
  }
  // Fallback: first paragraph in the document
  const firstParagraph = /<p>([\s\S]*?)<\/p>/i.exec(html);
  if (firstParagraph) {
    return stripHtml(firstParagraph[1]);
  }
  return null;
}

// Enhanced search function that searches in titles, descriptions, and content with partial matching
function searchInCourse(searchQuery: string, slug: string, description: string): boolean {
  if (!searchQuery.trim()) return true;
  
  const query = searchQuery.toLowerCase().trim();
  const title = getCourseTitle(slug).toLowerCase();
  const courseDescription = getCourseDescription(slug).toLowerCase();
  const contentDescription = description.toLowerCase();
  const slugLower = slug.toLowerCase();
  
  // Split query into individual words for partial matching
  const queryWords = query.split(/\s+/).filter(word => word.length > 0);
  
  // If single word query, check for partial matches
  if (queryWords.length === 1) {
    const word = queryWords[0];
    
    // Check if any field contains the word (partial match)
    return (
      title.includes(word) ||
      courseDescription.includes(word) ||
      contentDescription.includes(word) ||
      slugLower.includes(word)
    );
  }
  
  // For multi-word queries, check if ALL words are found in ANY field
  return queryWords.every(word => 
    title.includes(word) ||
    courseDescription.includes(word) ||
    contentDescription.includes(word) ||
    slugLower.includes(word)
  );
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const { page = '1', search = '' } = await Promise.resolve(searchParams);

  const allPages = await getAllBlogs();
  const currentPage = parseInt(page || '1');
  const searchQuery = search || '';
  const itemsPerPage = 6;

  // Build descriptions from course content (Overview/first paragraph)
  const descriptionsEntries = await Promise.all(
    allPages.map(async (slug) => {
      try {
        const { course } = await loadBlog(slug);
        const html = course?.content ?? '';
        const overview = extractOverview(html);
        const description = truncate(overview ?? getCourseDescription(slug), 28);
        return [slug, description] as const;
      } catch {
        return [slug, getCourseDescription(slug)] as const;
      }
    })
  );
  const descriptions = Object.fromEntries(descriptionsEntries);

  // Enhanced filtering with comprehensive search
  const filteredPages = allPages.filter((page) =>
    searchInCourse(searchQuery, page, descriptions[page])
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPages = filteredPages.slice(startIndex, endIndex);

  return (
    <Container className='relative overflow-hidden'>
      {/* Decorative Background Elements */}
      <DecorativeElements />
      
      <CoursesContent
        allPages={allPages}
        currentPages={currentPages}
        descriptions={descriptions}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
        filteredPages={filteredPages}
      />
    </Container>
  );
} 