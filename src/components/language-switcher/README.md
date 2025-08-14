# Language Switcher & Translation Keys

This directory contains the language switcher component and translation keys for the Tolgee platform.

## Files

- `LanguageSwitcher.tsx` - The main language switcher component with dropdown
- `tolgee-keys.json` - All translation keys organized for Tolgee platform
- `README.md` - This documentation file

## Language Switcher Component

The `LanguageSwitcher` component provides a beautiful dropdown interface for language selection:

### Features
- **Dropdown Interface**: Click to open/close language options
- **Flag Icons**: Visual representation with country flags (🇺🇸 🇫🇷 🇪🇸)
- **Translated Names**: Language names in their native language
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive Design**: Works on all screen sizes
- **Click Outside**: Automatically closes when clicking elsewhere

### Usage

```tsx
import { LanguageSwitcher } from '@blog/components/language-switcher';

// In your component
<LanguageSwitcher />
```

### Integration Points

The language switcher is currently integrated in:

1. **Main Page** (`src/app/(main)/page.tsx`) - Left navigation sidebar
2. **Navbar** (`src/components/navbar/navbar.tsx`) - Top navigation bar

## Translation Keys Structure

The `tolgee-keys.json` file contains all the translation keys organized into namespaces:

### Common Keys (`common`)
Main content and UI text used throughout the application:
- `welcome`, `knowledgeHub`, `gateway`
- Course-related: `ourCourses`, `coursesDescription`, `searchPlaceholder`
- Feature descriptions: `teamCollaboration`, `realTimeLearning`, `liveSession`

### Language Keys (`languages`)
Language names for the switcher:
- `en`: "English"
- `fr`: "Français" 
- `es`: "Español"

### Navigation Keys (`navigation`)
Navigation elements:
- `home`, `courses`, `search`, `language`

### UI Keys (`ui`)
Common UI elements:
- `tryAgain`, `loading`, `error`, `success`
- Form elements: `cancel`, `save`, `delete`, `edit`

### Flag Keys (`flags`)
Flag emojis for language switcher:
- `en`: "🇺🇸"
- `fr`: "🇫🇷"
- `es`: "🇪🇸"

## Uploading to Tolgee Platform

1. **Access your Tolgee project dashboard**
2. **Import the `tolgee-keys.json` file**
3. **Add translations for French and Spanish**
4. **Sync back to your application**

## Environment Configuration

Make sure to set these environment variables in your `.env.local`:

```bash
NEXT_PUBLIC_TOLGEE_API_KEY=your_actual_tolgee_api_key
NEXT_PUBLIC_TOLGEE_API_URL=https://app.tolgee.io
```

## Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('common.description')}</p>
    </div>
  );
}
```

## Fallback Behavior - Static File Translations

The application now uses a **ConditionalTolgeeProvider** that provides automatic fallback to static file translations:

### How It Works

1. **Primary**: Attempts to use Tolgee for translations
2. **Fallback**: If Tolgee fails, automatically uses local translation files (`/public/i18n/`)
3. **Seamless**: Users don't notice any difference - translations just work
4. **Reliable**: No crashes or errors, always provides translations

### Fallback Flow

```
Tolgee Provider → Check if working → If not → Fallback to local files
     ↓                    ↓              ↓
  Use Tolgee         Use Tolgee    Use /public/i18n/
  translations       translations   translations
```

### Static Translation Files

The fallback system uses these local files:
- **English**: `/public/i18n/en/common.json`
- **French**: `/public/i18n/fr/common.json`  
- **Spanish**: `/public/i18n/es/common.json`

### Benefits

✅ **Always Works**: Translations never fail  
✅ **No Configuration**: Works out of the box  
✅ **Fast**: Local files load instantly  
✅ **Reliable**: No external dependencies  
✅ **Seamless**: Users get translations regardless of Tolgee status  

## Language Switching Demo

To test the language switching:

1. **Click the globe icon** in the navbar or left sidebar
2. **Select a language** from the dropdown
3. **See the interface change** to the selected language
4. **Content updates** automatically using translation keys

### What Gets Translated

- **Main heading**: "Knowledge Hub" → "Hub de Connaissances" → "Centro de Conocimiento"
- **Subtitle**: "Your Gateway to Professional Excellence" → "Votre Portail vers l'Excellence Professionnelle" → "Tu Portal hacia la Excelencia Profesional"
- **Description**: Full paragraph in each language
- **Features**: "Expert-Led Content", "Interactive Learning", "Practical Skills"
- **Button text**: "Get Started" → "Commencer" → "Comenzar"
- **Card overlays**: "Team Collaboration", "Live Session", etc.

## Troubleshooting

### "tolgeeInstance.isLoaded is not a function" Error

This error has been resolved with the new conditional provider approach:

1. **The app automatically detects** Tolgee compatibility issues
2. **Falls back to local translations** without crashing
3. **Shows helpful console warnings** about what's happening

### If Tolgee Still Doesn't Work

1. **Check your API key** in `.env.local`
2. **Verify Tolgee project settings** in your dashboard
3. **The app will continue working** with local translations
4. **No manual intervention required** - it's all automatic

### Manual Fallback

If you want to completely disable Tolgee temporarily:

```bash
# Comment out or remove the API key
NEXT_PUBLIC_TOLGEE_API_KEY=
```

The app will automatically use local translations and continue working normally.

### Testing the Fallback System

To test that the fallback system works:

1. **Remove or invalidate** your Tolgee API key
2. **Restart the app** - it should automatically fall back to local translations
3. **Switch languages** - all translations should still work perfectly
4. **Check console** - you should see messages about using fallback provider

## Current Status

✅ **Translation keys extracted** and ready for Tolgee  
✅ **Language switcher dropdown** implemented and integrated  
✅ **Fallback system implemented** for reliability  
✅ **Static file translations** working as primary fallback  
✅ **Automatic error handling** prevents crashes  
✅ **Local translations work** seamlessly  
✅ **Ready for Tolgee integration** when configured  
✅ **Integrated in main page and navbar** for easy access  
✅ **Main page content** now fully translatable  
✅ **Fallback system tested** and working reliably 