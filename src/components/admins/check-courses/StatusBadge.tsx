interface StatusBadgeProps {
	readonly status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
	switch (status) {
		case 'pending':
			return (
				<span className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600 rounded">
					Pending
				</span>
			);
		case 'approved':
			return (
				<span className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded">
					Approved
				</span>
			);
		case 'rejected':
			return (
				<span className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded">
					Rejected
				</span>
			);
		default:
			return (
				<span className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded">
					{status}
				</span>
			);
	}
}
