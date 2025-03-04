import { FiPenTool } from 'react-icons/fi';
import { HiChip } from 'react-icons/hi';
import {
	PiBugDroidBold,
	PiCameraDuotone,
	PiChartBarHorizontal,
	PiCreditCardDuotone,
	PiFirstAidKitDuotone,
	PiHandshakeDuotone,
	PiHeadphonesDuotone,
	PiMegaphoneSimpleDuotone,
	PiPackageDuotone,
	PiReceiptDuotone,
} from 'react-icons/pi';

interface CategoryConfig {
	icon: React.ComponentType<{ className?: string }>;
	bgColor: string;
	iconColor: string;
}

const categoryConfig: Record<string, CategoryConfig> = {
	Business: {
		icon: PiHandshakeDuotone,
		bgColor: 'bg-green-100',
		iconColor: '#22C55E',
	},
	'Finance & Accounting': {
		icon: PiCreditCardDuotone,
		bgColor: 'bg-orange-50',
		iconColor: '#F59E0B',
	},
	'IT & Software': {
		icon: PiChartBarHorizontal,
		bgColor: 'bg-rose-50',
		iconColor: '#E34444',
	},
	'Personal Development': {
		icon: PiBugDroidBold,
		bgColor: 'bg-rose-100',
		iconColor: '#E34444',
	},
	'Office Productivity': {
		icon: PiReceiptDuotone,
		bgColor: 'bg-slate-100',
		iconColor: '#000000',
	},
	Marketing: {
		icon: PiMegaphoneSimpleDuotone,
		bgColor: 'bg-violet-100',
		iconColor: '#564FFD',
	},
	'Photography & Video': {
		icon: PiCameraDuotone,
		bgColor: 'bg-slate-100',
		iconColor: '#000000',
	},
	Lifestyle: {
		icon: PiPackageDuotone,
		bgColor: 'bg-orange-50',
		iconColor: '#FD8E1F',
	},
	Design: {
		icon: FiPenTool,
		bgColor: 'bg-rose-100',
		iconColor: '#FF6636',
	},
	'Health & Fitness': {
		icon: PiFirstAidKitDuotone,
		bgColor: 'bg-green-100',
		iconColor: '#23BD33',
	},
	Music: {
		icon: PiHeadphonesDuotone,
		bgColor: 'bg-orange-50',
		iconColor: '#FD8E1F',
	},
};

export const getCategoryConfig = (tag: string): CategoryConfig => {
	return (
		categoryConfig[tag] || {
			icon: HiChip,
			bgColor: 'bg-gray-100',
			iconColor: 'text-gray-800',
		}
	);
};
