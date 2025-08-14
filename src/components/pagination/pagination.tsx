'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
}

export function Pagination({ currentPage, totalPages, searchQuery }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (searchQuery) params.set('search', searchQuery);
    return `?${params.toString()}`;
  };

  const getVisiblePages = () => {
    // Always show exactly 5 pages
    const pages = [];
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all + fill remaining with empty
      for (let i = 1; i <= 5; i++) {
        pages.push(i <= totalPages ? i : null);
      }
    } else {
      // Show 5 pages with current page in the middle when possible
      if (currentPage <= 3) {
        // Near the beginning: 1, 2, 3, 4, 5
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Near the end: totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center gap-4'>
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-base-content hover:text-primary transition-colors duration-200'>
          <ChevronLeft className='w-4 h-4' />
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      <div className='flex items-center gap-1'>
        {getVisiblePages().map((page, index) => (
          page ? (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full transition-all duration-200 ${
                page === currentPage
                  ? 'bg-primary text-primary-content shadow-lg ring-2 ring-primary/20'
                  : 'text-base-content hover:text-primary hover:bg-base-200'
              }`}>
              {page}
            </Link>
          ) : (
            <div
              key={`empty-${index}`}
              className='inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full bg-base-200 text-base-content/30 cursor-not-allowed'>
              -
            </div>
          )
        ))}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-base-content hover:text-primary transition-colors duration-200'>
          Next
          <ChevronRight className='w-4 h-4' />
        </Link>
      )}
    </div>
  );
} 