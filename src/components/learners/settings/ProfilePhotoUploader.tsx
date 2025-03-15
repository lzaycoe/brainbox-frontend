import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function ProfilePhotoUploader() {
	const { user } = useUser();
	return (
		<div className="bg-white p-4 rounded-lg text-center">
			<div className="relative aspect-square mb-4">
				<Image
					src={user?.imageUrl ?? '/images/placeholder.png'}
					alt="Profile"
					width={150}
					height={150}
					className="w-full h-full object-cover rounded-lg"
				/>
				<button className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-3 px-4 flex items-center justify-center gap-2">
					<svg
						className="w-6 h-6"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5-5 5 5M12 4v12" />
					</svg>
					Upload Photo
				</button>
			</div>
			<p className="text-sm text-gray-500">
				Image size should be under 1MB and image ratio needs to be 1:1
			</p>
		</div>
	);
}
