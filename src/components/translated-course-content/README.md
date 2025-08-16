# Course Content Translation System

This system allows you to translate course content (lessons and slides) into multiple languages.

## How It Works

The translation system works by loading language-specific markdown files when users switch languages. Here's how it's structured:

### File Structure

For each course, you can create language-specific versions:

```
docs/blog/03-gis-fundamentals/
├── course.md          # English (default)
├── course.fr.md       # French
├── course.es.md       # Spanish
├── slides.md          # English slides (default)
├── slides.fr.md       # French slides
└── slides.es.md       # Spanish slides
```

### Naming Convention

- **English (default)**: `course.md`, `slides.md`
- **French**: `course.fr.md`, `slides.fr.md`
- **Spanish**: `course.es.md`, `slides.es.md`

## How to Add Translations

### 1. Create Language-Specific Files

For each course you want to translate, create the appropriate language files:

```bash
# Example for GIS Fundamentals course
docs/blog/03-gis-fundamentals/course.fr.md
docs/blog/03-gis-fundamentals/course.es.md
docs/blog/03-gis-fundamentals/slides.fr.md
docs/blog/03-gis-fundamentals/slides.es.md
```

### 2. Translate the Content

Copy the original markdown file and translate the content while keeping the same structure:

```markdown
---
title: Fondamentaux SIG  # Translated title
slug: gis-fundamentals   # Keep the same slug
authors: adorsys-team    # Keep the same authors
---

# Fondamentaux des Systèmes d'Information Géographique (SIG)

## Aperçu

Cette leçon couvre les concepts fondamentaux...
```

### 3. Maintain Frontmatter

Keep the frontmatter structure consistent across all language versions:
- `title`: Translate this
- `slug`: Keep the same (used for routing)
- `authors`: Keep the same

## Supported Languages

Currently supported languages:
- **English** (`en`) - Default
- **French** (`fr`)
- **Spanish** (`es`)

## Fallback Behavior

If a language-specific file doesn't exist:
1. The system will try to load the language-specific file
2. If not found, it falls back to the English version
3. If English version doesn't exist, it shows an error

## API Endpoint

The system uses an API endpoint to load translated content:

```
GET /api/translated-content?slug={course-slug}&type={course|slides}&lang={language}
```

### Parameters:
- `slug`: The course slug (e.g., "03-gis-fundamentals")
- `type`: Content type ("course" or "slides")
- `lang`: Language code ("en", "fr", "es")

### Response:
```json
{
  "content": "# Translated markdown content..."
}
```

## Components

### TranslatedCourseContent

The main component that handles content translation:

```tsx
<TranslatedCourseContent 
  data={originalContent}
  type="course"  // or "slides"
  blogSlug="03-gis-fundamentals"
/>
```

### Features:
- **Automatic language detection**: Listens for language change events
- **Loading states**: Shows spinner while loading translations
- **Fallback support**: Uses original content if translation not available
- **Real-time updates**: Content updates immediately when language changes

## Example Usage

### In a Course Page:

```tsx
import { TranslatedCourseContent } from '@blog/components/translated-course-content';

export default function CoursePage({ params }) {
  const { course, slides } = await loadBlog(params.blog_slug);
  
  return (
    <Container>
      {/* Slides with translation */}
      {slides && (
        <TranslatedCourseContent 
          data={slides.content}
          type="slides"
          blogSlug={params.blog_slug}
        />
      )}

      {/* Course content with translation */}
      {course.content && (
        <TranslatedCourseContent 
          data={course.content}
          type="course"
          blogSlug={params.blog_slug}
        />
      )}
    </Container>
  );
}
```

## Best Practices

1. **Keep structure consistent**: Maintain the same headings and sections across languages
2. **Translate frontmatter titles**: Update the title in the frontmatter for each language
3. **Test all languages**: Verify that all language versions work correctly
4. **Use consistent terminology**: Maintain consistent GIS terminology across languages
5. **Keep slugs unchanged**: The slug should remain the same for routing purposes

## Adding New Languages

To add a new language (e.g., German):

1. **Update the component**: Add the new language code to the translation system
2. **Create language files**: Add `.de.md` files for German content
3. **Update API**: Modify the API route to handle the new language code
4. **Test thoroughly**: Ensure the new language works correctly

## Troubleshooting

### Content not translating:
- Check that the language file exists with correct naming
- Verify the file path is correct
- Check browser console for API errors

### Loading issues:
- Ensure the API route is working
- Check file permissions
- Verify markdown syntax is valid

### Performance:
- Consider caching translated content
- Optimize file loading for large courses
- Use lazy loading for better performance 