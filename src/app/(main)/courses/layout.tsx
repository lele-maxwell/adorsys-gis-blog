import type {PropsWithChildren} from 'react';

export default function CoursesLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div id='courses' className='min-h-screen'>
      {children}
    </div>
  );
} 