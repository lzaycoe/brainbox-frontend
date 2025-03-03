import React, { useEffect, useState } from 'react';
import { PiFileText } from 'react-icons/pi';

import CommentSection from '@/components/learners/watch-course/CommentSection';
import { fetchFileMetadata, formatFileSize } from '@/utils/file';

interface CourseNavigationProps {
	readonly description?: string;
	readonly content?: string;
	readonly note?: string;
	readonly attachments?: string[];
}

interface FileMetadata {
	url: string;
	name: string;
	size: number | null;
}

export default function CourseNavigation({
	description = 'No description available',
	content = 'No content available',
	note = 'No notes available',
	attachments = [],
}: CourseNavigationProps) {
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const [fileMetadata, setFileMetadata] = useState<FileMetadata[]>([]);

	useEffect(() => {
		const loadFileMetadata = async () => {
			const metadataPromises = attachments.map(fetchFileMetadata);
			const metadata = await Promise.all(metadataPromises);
			setFileMetadata(metadata);
		};

		loadFileMetadata();
	}, [attachments]);

	const handleTabClick = (tab: string) => {
		setActiveTab(activeTab === tab ? null : tab);
	};

	return (
		<div className="flex flex-col justify-center py-px font-medium p-5">
			<div className="flex flex-col w-full max-md:max-w-full">
				<hr
					className="w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] max-md:max-w-full"
					aria-hidden="true"
				/>
				<nav aria-label="Course navigation">
					<ul className="flex flex-wrap gap-6 items-start self-start max-md:max-w-full list-none p-0 m-0">
						<li>
							<a
								href="#description"
								className={`gap-2.5 self-stretch py-5 text-base leading-none text-center whitespace-nowrap w-[155px] inline-block no-underline ${
									activeTab === 'description'
										? 'bg-white shadow-sm text-neutral-800 border-b-2 border-orange-500'
										: 'text-gray-600'
								}`}
								onClick={(e) => {
									e.preventDefault();
									handleTabClick('description');
								}}
							>
								Description
							</a>
						</li>
						<li>
							<a
								href="#content"
								className={`gap-2.5 self-stretch py-5 text-base leading-none text-center whitespace-nowrap w-[155px] inline-block no-underline ${
									activeTab === 'content'
										? 'bg-white shadow-sm text-neutral-800 border-b-2 border-orange-500'
										: 'text-gray-600'
								}`}
								onClick={(e) => {
									e.preventDefault();
									handleTabClick('content');
								}}
							>
								Content
							</a>
						</li>
						<li>
							<a
								href="#lecture-notes"
								className={`gap-2.5 self-stretch py-5 text-base leading-none text-center whitespace-nowrap w-[155px] inline-block no-underline ${
									activeTab === 'lecture-notes'
										? 'bg-white shadow-sm text-neutral-800 border-b-2 border-orange-500'
										: 'text-gray-600'
								}`}
								onClick={(e) => {
									e.preventDefault();
									handleTabClick('lecture-notes');
								}}
							>
								Lecture Notes
							</a>
						</li>
						<li>
							<a
								href="#attach-file"
								className={`flex gap-3 justify-center items-center py-5 w-[155px] no-underline ${
									activeTab === 'attach-file'
										? 'bg-white shadow-sm text-neutral-800 border-b-2 border-orange-500'
										: 'text-gray-600'
								}`}
								onClick={(e) => {
									e.preventDefault();
									handleTabClick('attach-file');
								}}
							>
								<span className="self-stretch my-auto text-base leading-none text-center">
									Attach File
								</span>
								<span
									className="gap-2.5 self-stretch px-1.5 py-1 my-auto text-xs leading-none text-orange-500 uppercase whitespace-nowrap bg-rose-100"
									aria-label={`${attachments.length} files attached`}
								>
									{attachments.length < 10
										? `0${attachments.length}`
										: attachments.length}
								</span>
							</a>
						</li>
						<li>
							<a
								href="#comments"
								className={`gap-2.5 self-stretch py-5 text-base leading-none text-center whitespace-nowrap w-[155px] inline-block no-underline ${
									activeTab === 'comments'
										? 'bg-white shadow-sm text-neutral-800 border-b-2 border-orange-500'
										: 'text-gray-600'
								}`}
								onClick={(e) => {
									e.preventDefault();
									handleTabClick('comments');
								}}
							>
								Comments
							</a>
						</li>
					</ul>
				</nav>
				<hr
					className="w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] max-md:max-w-full"
					aria-hidden="true"
				/>
			</div>

			<div className="flex flex-col max-w-[915px]">
				{(activeTab === null || activeTab === 'description') && (
					<div className="mt-10">
						<h2 className="w-full text-2xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
							Lecture Description
						</h2>
						<p className="mt-5 w-full text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
							{description}
						</p>
					</div>
				)}
				{(activeTab === null || activeTab === 'content') && (
					<div className="mt-10">
						<h2 className="w-full text-2xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
							Content
						</h2>
						<p className="mt-5 w-full text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
							{content}
						</p>
					</div>
				)}
				{(activeTab === null || activeTab === 'lecture-notes') && (
					<div className="mt-10">
						<h2 className="w-full text-2xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
							Lecture Notes
						</h2>
						<p className="mt-5 w-full text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
							{note}
						</p>
					</div>
				)}
				{(activeTab === null || activeTab === 'attach-file') && (
					<div className="mt-10">
						<h2 className="text-2xl font-semibold tracking-tight leading-none text-neutral-800">
							Attach Files{' '}
							<span>
								(
								{attachments.length < 10
									? `0${attachments.length}`
									: attachments.length}
								)
							</span>
						</h2>
						{attachments.length > 0 ? (
							attachments.map((attachment) => {
								const fileMeta = fileMetadata.find(
									(meta) => meta.url === attachment,
								);
								return (
									<div
										key={attachment}
										className="flex flex-wrap gap-10 justify-between items-center p-6 mt-5 w-full bg-slate-100 max-md:px-5 max-md:max-w-full"
									>
										<div className="flex gap-3 items-start self-stretch my-auto">
											<div
												className="flex shrink-0 w-12 h-12"
												aria-label="File icon"
											>
												<PiFileText className="w-full h-full" color="#FF6636" />
											</div>
											<div className="flex flex-col">
												<div className="text-base font-medium leading-none text-neutral-800">
													{fileMeta?.name || `File ${attachment}`}{' '}
												</div>
												<div className="mt-1 text-sm tracking-normal leading-loose text-gray-500">
													{fileMeta?.size !== undefined
														? formatFileSize(fileMeta.size)
														: 'Unknown size'}
												</div>
											</div>
										</div>
										<a
											href={attachment}
											download
											className="gap-3 self-stretch px-6 my-auto text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500 max-md:px-5 no-underline"
										>
											Download File
										</a>
									</div>
								);
							})
						) : (
							<p className="mt-5 w-full text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
								No files attached.
							</p>
						)}
					</div>
				)}
				{(activeTab === null || activeTab === 'comments') && (
					<div className="mt-10">
						<CommentSection />
					</div>
				)}
			</div>
		</div>
	);
}
