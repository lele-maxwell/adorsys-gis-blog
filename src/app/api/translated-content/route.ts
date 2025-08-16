import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { markdownToHtml } from '@blog/converters/converter';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');
  const lang = searchParams.get('lang');

  console.log('API Request:', { slug, type, lang });

  if (!slug || !type || !lang) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    // Define the path to the translated content
    const basePath = path.join(process.cwd(), 'docs', 'blog');
    const coursePath = path.join(basePath, slug);
    
    console.log('File paths:', { basePath, coursePath });
    
    // Try to load the language-specific file
    let filePath: string;
    
    if (lang === 'en') {
      // English is the default, use original file
      filePath = path.join(coursePath, `${type}.md`);
    } else {
      // Try language-specific file
      filePath = path.join(coursePath, `${type}.${lang}.md`);
    }

    console.log('Attempting to load file:', filePath);

    // Check if the file exists
    try {
      await fs.access(filePath);
      console.log('File found:', filePath);
    } catch {
      // If language-specific file doesn't exist, try the original
      if (lang !== 'en') {
        try {
          filePath = path.join(coursePath, `${type}.md`);
          console.log('Falling back to original file:', filePath);
          await fs.access(filePath);
          console.log('Fallback file found:', filePath);
        } catch {
          console.log('No files found for:', { slug, type, lang });
          return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }
      } else {
        console.log('No files found for:', { slug, type, lang });
        return NextResponse.json({ error: 'Content not found' }, { status: 404 });
      }
    }

    // Read the file content
    const fileContents = await fs.readFile(filePath, 'utf-8');
    console.log('File content loaded, length:', fileContents.length);
    
    // Use gray-matter to parse and remove frontmatter (same as loadDocMd)
    const matterResult = matter(fileContents);
    console.log('Frontmatter parsed, content length:', matterResult.content.length);
    
    // For slides, return raw markdown content (same as loadSlideMd)
    // For courses, process markdown to HTML (same as loadDocMd)
    if (type === 'slides') {
      console.log('Returning raw markdown for slides');
      return NextResponse.json({ content: matterResult.content });
    } else {
      // Process markdown to HTML using the same converter as loadBlog
      const htmlContent = await markdownToHtml(matterResult.content);
      console.log('HTML content processed, length:', htmlContent.length);
      return NextResponse.json({ content: htmlContent });
    }
  } catch (error) {
    console.error('Error loading translated content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 