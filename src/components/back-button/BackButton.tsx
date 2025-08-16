"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "react-feather";
import { useLanguage } from '@blog/components/language-switcher';

interface BackButtonProps {
	href?: string;
	label?: string;
	className?: string;
}

// Direct translation function for back button
function useDirectTranslation() {
  const { currentLanguage } = useLanguage();

  const t = (key: string) => {
    const translations = {
      en: {
        'backToCourses': 'Back to Courses'
      },
      fr: {
        'backToCourses': 'Retour aux Cours'
      },
      es: {
        'backToCourses': 'Volver a los Cursos'
      }
    };

    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return { t, currentLanguage };
}

export default function BackButton({ href, label, className = "" }: BackButtonProps) {
	const router = useRouter();
	const { t } = useDirectTranslation();

	function handleClick() {
		if (href) {
			router.push(href);
		} else {
			router.back();
		}
	}

	return (
		<button
			onClick={handleClick}
			className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 hover:bg-base-300 text-base-content shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
		>
			<ArrowLeft className="w-4 h-4" />
			<span className="text-sm font-medium">{label || t('backToCourses')}</span>
		</button>
	);