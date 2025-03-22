export const formatDate = (isoDate: string): string => {
	const date = new Date(isoDate);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});
};

export const formatDateWithdraw = (dateString: string): string => {
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date');
		}

		const day = String(date.getDate()).padStart(2, '0');
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();

		let hours = date.getHours();
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const period = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;
		const formattedHours = String(hours).padStart(2, '0');

		return `${day} ${month}, ${year} at ${formattedHours}:${minutes} ${period}`;
	} catch (error) {
		console.error('Error formatting date:', error);
		return dateString;
	}
};
