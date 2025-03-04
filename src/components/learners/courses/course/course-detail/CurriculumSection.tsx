import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Lecture } from '@/schemas/lecture.schema';
import { Section } from '@/schemas/section.schema';
import { getAllLecturesInSection } from '@/services/api/lecture';
import { getAllSections } from '@/services/api/section';

interface CurriculumProps {
	courseId: string;
}

const CurriculumSection: React.FC<CurriculumProps> = ({ courseId }) => {
	const [sections, setSections] = useState<Section[]>([]);
	const [lectures, setLectures] = useState<Record<number, Lecture[]>>({});
	const [previewLecture, setPreviewLecture] = useState<Lecture | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSectionsAndLectures = async () => {
			try {
				const fetchedSections = await getAllSections(courseId);
				setSections(fetchedSections);

				const lecturesMap: Record<number, Lecture[]> = {};
				for (const section of fetchedSections) {
					const sectionLectures = await getAllLecturesInSection(
						courseId,
						section.id.toString(),
					);
					lecturesMap[section.id] = sectionLectures || [];
				}
				setLectures(lecturesMap);
			} catch (error) {
				console.error('Failed to fetch sections and lectures:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchSectionsAndLectures();
	}, [courseId]);

	const handlePreview = (lecture: Lecture) => {
		setPreviewLecture(lecture);
	};

	const renderVideoPlayer = (url: string) => {
		if (url.includes('youtube.com') || url.includes('youtu.be')) {
			const videoId = url.split('v=')[1] || url.split('/').pop();
			const embedUrl = `https://www.youtube.com/embed/${videoId}`;
			return (
				<iframe
					width="100%"
					height="315"
					src={embedUrl}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			);
		} else {
			return (
				<video controls className="w-full">
					<source src={url} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			);
		}
	};

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Course Curriculum</h2>
			{loading ? (
				<Loading />
			) : (
				<Accordion type="single" collapsible>
					{sections.map((section) => (
						<AccordionItem key={section.id} value={section.id.toString()}>
							<AccordionTrigger>{section.title}</AccordionTrigger>
							<AccordionContent>
								<ul className="space-y-2">
									{lectures[section.id]?.map((lecture) => (
										<li key={lecture.id} className="p-2 border rounded-lg">
											<div className="flex justify-between items-center">
												<div>
													<h3 className="font-semibold">{lecture.title}</h3>
													<p className="text-gray-700">{lecture.description}</p>
												</div>
												{lecture.canPreview && lecture.type === 'video' && (
													<button
														onClick={() => handlePreview(lecture)}
														className="text-blue-500 underline"
													>
														Preview
													</button>
												)}
											</div>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}

			{previewLecture && (
				<Dialog
					open={!!previewLecture}
					onOpenChange={() => setPreviewLecture(null)}
				>
					<DialogTrigger />
					<DialogContent>
						<DialogTitle>{previewLecture.title}</DialogTitle>
						<DialogDescription>
							{previewLecture.type === 'video' &&
								previewLecture.attachments &&
								previewLecture.attachments[0] &&
								renderVideoPlayer(previewLecture.attachments[0])}
						</DialogDescription>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default CurriculumSection;
