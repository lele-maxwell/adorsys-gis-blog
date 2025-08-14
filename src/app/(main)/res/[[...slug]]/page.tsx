import { redirect } from 'next/navigation';
import {loadRes} from "@blog/converters";
import {Container} from "@blog/components/container";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [
    {},
    {
      slug: 'faq',
    },
    {
      slug: 'tos',
    },
    {
      slug: 'contact',
    },
    {
      slug: 'privacy',
    },
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    return null;
  }

  const content = await loadRes(slug);
  if (!content) {
    return null;
  }

  return {
    title: `${content.title} | Learn`,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    return redirect('/');
  }

  const content = await loadRes(slug);
  return (
    <Container>
      <div className='prose prose-neutral lg:prose-xl mx-auto'>
        {content.content && (
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        )}
      </div>
    </Container>
  );
}
