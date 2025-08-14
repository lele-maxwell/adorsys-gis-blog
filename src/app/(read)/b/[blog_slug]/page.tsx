import {Container} from '@blog/components/container';
import {redirect} from 'next/navigation';
import {loadBlog} from "@blog/converters";
import {getAllBlogs} from "@blog/server/blog/api";
import {Suspense} from "react";
import Display from "@blog/components/display";
import BackButton from '@blog/components/back-button';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const pages = await getAllBlogs();
    return pages.map((blog_slug) => ({blog_slug}));
}

interface Props {
    params: Promise<{ blog_slug: string }>;
}

export async function generateMetadata({params}: Props) {
    const {blog_slug} = await params;
    if (!blog_slug) {
        return null;
    }

    const {course} = await loadBlog(blog_slug);
    if (!course) {
        return null;
    }

    return {
        title: `${course.title} | adorsys GIS`,
    };
}

export default async function SingleBlogPage({params}: Props) {
    const {blog_slug} = await params;
    if (!blog_slug) {
        return redirect('/');
    }

    const {course, slides} = await loadBlog(blog_slug);
    return (
        <Container>
            <div className='mb-4'>
                <BackButton href='/courses' label='Back to Courses' />
            </div>
            {slides && (
                <Suspense>
                    <Display data={slides.content}/>
                </Suspense>
            )}

            {course.content && (
                <article className='prose prose-neutral lg:prose-xl mx-auto mt-8'>
                    <div dangerouslySetInnerHTML={{__html: course.content}}/>
                </article>
            )}
        </Container>
    );
}
