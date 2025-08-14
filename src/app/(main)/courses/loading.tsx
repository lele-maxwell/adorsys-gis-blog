export default function Loading() {
  return (
    <div className='container mx-auto p-4'>
      {/* Header Section Skeleton */}
      <div className='text-center mb-12'>
        <div className='skeleton h-16 w-80 mx-auto mb-6'></div>
        <div className='skeleton h-6 w-96 mx-auto'></div>
      </div>
      
      {/* Search Section Skeleton */}
      <div className='max-w-2xl mx-auto mb-12'>
        <div className='skeleton h-16 w-full rounded-full'></div>
      </div>
      
      {/* Results Summary Skeleton */}
      <div className='text-center mb-8'>
        <div className='skeleton h-10 w-48 mx-auto rounded-full'></div>
      </div>
      
      {/* Courses Grid Skeleton */}
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='skeleton h-80 rounded-2xl' />
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className='flex justify-center'>
        <div className='flex gap-2'>
          <div className='skeleton h-10 w-20'></div>
          <div className='skeleton h-10 w-10'></div>
          <div className='skeleton h-10 w-10'></div>
          <div className='skeleton h-10 w-20'></div>
        </div>
      </div>
    </div>
  );
} 