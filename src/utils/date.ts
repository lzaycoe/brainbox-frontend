export const formatDate = (isoDate: string): string => {
	const date = new Date(isoDate);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});
};
