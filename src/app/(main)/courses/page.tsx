import Link from 'next/link';
import { getAllBlogs } from '@blog/server/blog';
import { Container } from '@blog/components/container';
import type { Metadata } from 'next';
import { Pagination } from '@blog/components/pagination';
import { CourseCard } from '@blog/components/course-card';
import { DecorativeElements } from '@blog/components/decorative-elements';
import { Search, ChevronDown } from 'react-feather';
import { loadBlog } from '@blog/converters';

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
      
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-6xl font-extrabold mb-6'>
          <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            Our Courses
          </span>
        </h1>
        <p className='text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed'>
          Explore our comprehensive collection of GIS lessons, from fundamentals to advanced techniques. 
          Each course is designed with interactive content and practical examples.
        </p>
      </div>

      {/* Search Section */}
      <div className='max-w-2xl mx-auto mb-12'>
        <form className='relative'>
          <div className='relative flex items-center bg-base-200 border border-base-300 rounded-full overflow-hidden shadow-sm'>
            {/* Search Input */}
            <input
              type='text'
              name='search'
              placeholder='What are you looking for?'
              defaultValue={searchQuery}
              className='flex-1 pl-6 pr-4 py-4 bg-transparent border-none outline-none text-base placeholder:text-base-content/50'
            />
            
            {/* Dropdown Divider */}
            <div className='w-px h-8 bg-base-300'></div>
            
            {/* Dropdown Menu */}
            <div className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-base-300 transition-colors duration-200'>
              <span className='text-sm font-medium text-base-content/70'>Courses</span>
              <ChevronDown className='w-4 h-4 text-base-content/50' />
            </div>
            
            {/* Search Button */}
            <button
              type='submit'
              className='ml-2 p-4 bg-primary hover:bg-primary-focus text-primary-content rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50'
            >
              <Search className='w-5 h-5' />
            </button>
          </div>
        </form>
      </div>

      {/* Results Summary */}
      <div className='text-center mb-8'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full'>
          <span className='text-sm font-medium'>
            {filteredPages.length} course{filteredPages.length !== 1 ? 's' : ''} available
          </span>
          {searchQuery && (
            <>
              <span className='text-base-content/30'>•</span>
              <span className='text-sm opacity-70'>
                Results for "{searchQuery}"
              </span>
            </>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12'>
        {currentPages.map((blog_slug, index) => (
          <CourseCard
            key={blog_slug}
            blog_slug={blog_slug}
            index={index}
            description={descriptions[blog_slug]}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
          />
        </div>
      )}
    </Container>
  );
} 