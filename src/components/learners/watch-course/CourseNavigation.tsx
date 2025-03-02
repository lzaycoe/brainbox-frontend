import React, { useEffect, useState } from 'react';
import { PiFileText } from 'react-icons/pi';

import CommentSection from '@/components/learners/watch-course/CommentSection';
import { fetchFileMetadata, formatFileSize } from '@/utils/file';

interface CourseNavigationProps {
	description?: string;
	content?: string;
	note?: string;
	attachments?: string[];
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
		<div className="flex flex-col font-medium p-5 bg-white rounded-lg shadow-sm">
			{/* Navigation Tabs */}
			<nav aria-label="Course navigation">
				<ul className="flex flex-wrap gap-4 border-b border-gray-200">
					{[
						{ id: 'description', label: 'Description' },
						{ id: 'content', label: 'Content' },
						{ id: 'lecture-notes', label: 'Lecture Notes' },
						{
							id: 'attach-file',
							label: 'Attach File',
							count: attachments.length,
						},
						{ id: 'comments', label: 'Comments' },
					].map((tab) => (
						<li key={tab.id}>
							<a
								href={`#${tab.id}`}
								className={`flex items-center gap-2 py-3 px-4 text-base font-medium transition-colors duration-200 ${
									activeTab === tab.id
										? 'text-orange-500 border-b-2 border-orange-500'
										: 'text-gray-600 hover:text-orange-400'
								}`}
								onClick={(e) => {
									e.preventDefault();
									handleTabClick(tab.id);
								}}
							>
								{tab.label}
								{tab.count !== undefined && (
									<span
										className="ml-2 px-2 py-0.5 text-xs font-semibold text-orange-500 bg-orange-100 rounded-full"
										aria-label={`${tab.count} files attached`}
									>
										{tab.count < 10 ? `0${tab.count}` : tab.count}
									</span>
								)}
							</a>
						</li>
					))}
				</ul>
			</nav>

			{/* Tab Content */}
			<div className="mt-6">
				{(activeTab === null || activeTab === 'description') && (
					<div>
						<h2 className="text-xl font-semibold text-neutral-800 mb-4">
							Lecture Description
						</h2>
						<p className="text-gray-600 leading-relaxed">{description}</p>
					</div>
				)}
				{(activeTab === null || activeTab === 'content') && (
					<div>
						<h2 className="text-xl font-semibold text-neutral-800 mb-4">
							Content
						</h2>
						<p className="text-gray-600 leading-relaxed">{content}</p>
					</div>
				)}
				{(activeTab === null || activeTab === 'lecture-notes') && (
					<div>
						<h2 className="text-xl font-semibold text-neutral-800 mb-4">
							Lecture Notes
						</h2>
						<p className="text-gray-600 leading-relaxed">{note}</p>
					</div>
				)}
				{(activeTab === null || activeTab === 'attach-file') && (
					<div>
						<h2 className="text-xl font-semibold text-neutral-800 mb-4">
							Attach Files{' '}
							<span className="text-gray-500 text-sm">
								(
								{attachments.length < 10
									? `0${attachments.length}`
									: attachments.length}
								)
							</span>
						</h2>
						{attachments.length > 0 ? (
							attachments.map((attachment, index) => {
								const fileMeta = fileMetadata.find(
									(meta) => meta.url === attachment,
								);
								return (
									<div
										key={index}
										className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3 shadow-sm hover:bg-gray-100 transition-colors duration-200"
									>
										<div className="flex items-center gap-3">
											<PiFileText className="w-8 h-8 text-orange-500" />
											<div>
												<div className="text-neutral-800 font-medium">
													{fileMeta?.name || `File ${index + 1}`}
												</div>
												<div className="text-sm text-gray-500">
													{formatFileSize(fileMeta?.size ?? null)}
												</div>
											</div>
										</div>
										<a
											href={attachment}
											download
											className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-200"
										>
											Download
										</a>
									</div>
								);
							})
						) : (
							<p className="text-gray-600">No files attached.</p>
						)}
					</div>
				)}
				{(activeTab === null || activeTab === 'comments') && (
					<div>
						<CommentSection />
					</div>
				)}
			</div>
		</div>
	);
}
