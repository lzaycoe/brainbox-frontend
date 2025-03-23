import { useUser } from '@clerk/nextjs';
import { ZodError, z } from 'zod';

// Schema validation using Zod
const profileSchema = z.object({
	firstName: z.string().min(1, 'First name is required.'),
	lastName: z.string().min(1, 'Last name is required.'),
	username: z.string().min(1, 'Username is required.'),
	email: z.string().email('Invalid email address.'),
	title: z.string().max(50, 'Title must be 50 characters or less.'),
});

export default function ProfileForm() {
	const { user } = useUser();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const title = formData.get('title') as string;

		try {
			profileSchema.parse({ firstName, lastName, username, email, title });
			console.log('Form submitted successfully:', {
				firstName,
				lastName,
				username,
				email,
				title,
			});
		} catch (err) {
			if (err instanceof ZodError) {
				alert(err.errors[0].message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm mb-2 font-semibold"
					>
						First name
					</label>
					<input
						id="firstName"
						name="firstName"
						value={user?.firstName || ''}
						type="text"
						placeholder="First name"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm mb-2 font-semibold"
					>
						Last name
					</label>
					<input
						id="lastName"
						name="lastName"
						value={user?.lastName || ''}
						type="text"
						placeholder="Last name"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			<div>
				<label htmlFor="username" className="block text-sm mb-2 font-semibold">
					Username
				</label>
				<input
					id="username"
					name="username"
					value={user?.username || ''}
					type="text"
					placeholder="Enter your username"
					className="w-full p-3 border border-gray-200 rounded-lg"
					required
				/>
			</div>

			<div>
				<label htmlFor="email" className="block text-sm mb-2 font-semibold">
					Email
				</label>
				<input
					id="email"
					name="email"
					value={user?.emailAddresses.toString() || ''}
					type="email"
					placeholder="Email address"
					className="w-full p-3 border border-gray-200 rounded-lg"
					required
				/>
			</div>

			<div>
				<label htmlFor="title" className="block text-sm mb-2 font-semibold">
					Title
				</label>
				<div className="relative">
					<input
						id="title"
						name="title"
						type="text"
						placeholder="Your title, profession or small biography"
						className="w-full p-3 border border-gray-200 rounded-lg pr-16"
						maxLength={50}
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
						Max 50 characters
					</span>
				</div>
			</div>

			<button
				type="submit"
				className="bg-[#FF6636] text-white px-6 py-2 rounded-lg hover:bg-[#CC522B] transition-colors"
			>
				Save Changes
			</button>
		</form>
	);
}
