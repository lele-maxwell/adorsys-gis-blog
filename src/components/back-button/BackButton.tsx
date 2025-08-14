"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "react-feather";

interface BackButtonProps {
	href?: string;
	label?: string;
	className?: string;
}

export default function BackButton({ href, label = "Back", className = "" }: BackButtonProps) {
	const router = useRouter();

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
			<span className="text-sm font-medium">{label}</span>
		</button>
	);
} 