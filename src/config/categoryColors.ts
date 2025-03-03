interface CategoryColorConfig {
	bgColor: string;
	textColor: string;
}

const categoryColors: Record<string, CategoryColorConfig> = {
	Business: { bgColor: 'bg-green-100', textColor: 'text-[#22C55E]' },
	'Finance & Accounting': {
		bgColor: 'bg-orange-50',
		textColor: 'text-[#F59E0B]',
	},
	'IT & Software': { bgColor: 'bg-rose-50', textColor: 'text-[#E34444]' },
	'Personal Development': {
		bgColor: 'bg-rose-100',
		textColor: 'text-[#E34444]',
	},
	'Office Productivity': {
		bgColor: 'bg-slate-100',
		textColor: 'text-[#000000]',
	},
	Marketing: { bgColor: 'bg-violet-100', textColor: 'text-[#564FFD]' },
	'Photography & Video': {
		bgColor: 'bg-slate-100',
		textColor: 'text-[#000000]',
	},
	Lifestyle: { bgColor: 'bg-orange-50', textColor: 'text-[#FD8E1F]' },
	Design: { bgColor: 'bg-rose-100', textColor: 'text-[#FF6636]' },
	'Health & Fitness': { bgColor: 'bg-green-100', textColor: 'text-[#23BD33]' },
	Music: { bgColor: 'bg-orange-50', textColor: 'text-[#FD8E1F]' },
};

export const getCategoryColors = (tag: string): CategoryColorConfig => {
	return (
		categoryColors[tag] || {
			bgColor: 'bg-gray-100',
			textColor: 'text-gray-800',
		}
	);
};
