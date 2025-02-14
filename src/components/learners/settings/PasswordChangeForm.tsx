import { ZodError, z } from 'zod';

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required.'),
		newPassword: z
			.string()
			.min(6, 'New password must be at least 6 characters long.'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export default function PasswordChangeForm() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		try {
			passwordSchema.parse({ currentPassword, newPassword, confirmPassword });
			console.log('Form submitted successfully:', {
				currentPassword,
				newPassword,
				confirmPassword,
			});
		} catch (err) {
			if (err instanceof ZodError) {
				alert(err.errors[0].message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
			{/* Current Password */}
			<div>
				<label
					htmlFor="currentPassword"
					className="block text-sm mb-2 font-semibold"
				>
					Current Password
				</label>
				<div className="relative">
					<input
						id="currentPassword"
						name="currentPassword"
						type="password"
						placeholder="Enter your current password"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			{/* New Password */}
			<div>
				<label
					htmlFor="newPassword"
					className="block text-sm mb-2 font-semibold"
				>
					New Password
				</label>
				<div className="relative">
					<input
						id="newPassword"
						name="newPassword"
						type="password"
						placeholder="Enter your new password"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			{/* Confirm Password */}
			<div>
				<label
					htmlFor="confirmPassword"
					className="block text-sm mb-2 font-semibold"
				>
					Confirm Password
				</label>
				<div className="relative">
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm your new password"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="bg-[#FF6636] text-white px-6 py-2 rounded-lg hover:bg-[#CC522B] transition-colors"
			>
				Save Password
			</button>
		</form>
	);
}
