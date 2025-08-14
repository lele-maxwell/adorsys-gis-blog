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

  // Filter lessons based on search query
  const filteredPages = allPages.filter((page) =>
    page.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPages = filteredPages.slice(startIndex, endIndex);

  // Build descriptions from course content (Overview/first paragraph)
  const descriptionsEntries = await Promise.all(
    currentPages.map(async (slug) => {
      try {
        const { course } = await loadBlog(slug);
        const html = course?.content ?? '';
        const overview = extractOverview(html);
        const description = truncate(overview ?? 'Explore comprehensive GIS concepts and practical applications.', 28);
        return [slug, description] as const;
      } catch {
        return [slug, 'Explore comprehensive GIS concepts and practical applications.'] as const;
      }
    })
  );
  const descriptions = Object.fromEntries(descriptionsEntries);

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