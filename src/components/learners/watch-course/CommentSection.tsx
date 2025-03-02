import Image from 'next/image';
import { PiChatsCircle } from 'react-icons/pi';

export default function CommentSection() {
	const comments = [
		{
			id: 1,
			name: 'Ronald Richards',
			profilePicture: '/app/watch-course/avatar.png',
			timeAgo: '1 week ago',
			comment:
				'Maecenas risus tortor, tincidunt nec purus eu, gravida suscipit tortor.',
		},
		{
			id: 2,
			name: 'Kristin Watson',
			profilePicture: '/app/watch-course/avatar.png',
			timeAgo: '1 week ago',
			comment:
				'Nulla pellentesque leo vitae lorem hendrerit, sit amet elementum ipsum rutrum.',
			role: 'Admin',
		},
	];

	return (
		<div className="flex flex-col justify-center py-px font-medium">
			<div className="flex flex-col max-w-[915px] mt-5">
				<h2 className="w-full text-2xl font-semibold tracking-tight leading-none text-neutral-800">
					Comments <span className="sr-only">Total number of comments:</span>
					<span aria-label="154 comments">(154)</span>
				</h2>
				{comments.map((comment) => (
					<div
						key={comment.id}
						className="grid grid-cols-[auto,1fr] gap-3 mt-5 w-full text-sm"
					>
						<Image
							loading="lazy"
							src={comment.profilePicture}
							alt={`Profile picture of ${comment.name}`}
							width={40}
							height={40}
							className="object-cover w-10 h-10 rounded-full shrink-0"
						/>
						<div className="flex flex-col">
							<div className="flex gap-2 text-xs leading-none text-gray-500 items-center">
								<div className="text-sm font-medium tracking-normal leading-none text-neutral-800">
									{comment.name}
								</div>
								{comment.role && (
									<div className="px-2 py-1 text-xs leading-tight text-white bg-indigo-600">
										{comment.role}
									</div>
								)}
								<div aria-hidden="true">•</div>
								<time>{comment.timeAgo}</time>
							</div>
							<p className="mt-3 text-gray-600">{comment.comment}</p>
							<button className="mt-3 font-medium text-gray-400 flex items-center space-x-1">
								<PiChatsCircle className="text-lg" />
								<span>REPLY</span>
							</button>
						</div>
					</div>
				))}
				<form className="flex flex-wrap gap-2.5 mt-5 w-full">
					<div className="flex flex-col grow justify-center items-start px-5 py-3 text-gray-400 bg-white border border-gray-200">
						<label htmlFor="replyInput" className="sr-only">
							Write your reply
						</label>
						<input
							type="text"
							id="replyInput"
							placeholder="Write your reply"
							className="w-full bg-transparent border-none focus:outline-none"
						/>
					</div>
					<button
						type="submit"
						className="px-6 font-semibold text-white bg-orange-500 hover:bg-blue-700"
					>
						Post Reply
					</button>
				</form>
			</div>
		</div>
	);
}
