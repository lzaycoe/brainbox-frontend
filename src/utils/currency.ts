export const formatCurrency = (value: number | string | undefined): string => {
	const numberValue = Number(value);
	if (isNaN(numberValue)) return '';
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(numberValue);
};
