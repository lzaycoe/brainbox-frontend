export const formatCurrency = (value: number | undefined): string => {
	if (value === undefined || value === 0) return '';
	return `${value.toLocaleString('vi-VN')}đ`;
};
