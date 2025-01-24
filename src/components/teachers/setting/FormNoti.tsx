import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';

const formNotiSchema = z.object({
	coursePurchase: z.boolean().optional(),
	courseReview: z.boolean().optional(),
	lectureComment: z.boolean().optional(),
	notesDownload: z.boolean().optional(),
	commentReply: z.boolean().optional(),
	profileVisits: z.boolean().optional(),
	fileDownload: z.boolean().optional(),
});

const FormNoti = () => {
	const form = useForm<z.infer<typeof formNotiSchema>>({
		resolver: zodResolver(formNotiSchema),
		defaultValues: {
			coursePurchase: false,
			courseReview: true,
			lectureComment: false,
			notesDownload: true,
			commentReply: true,
			profileVisits: false,
			fileDownload: true,
		},
	});

	return (
		<Form {...form}>
			<section
				className="flex flex-col justify-center px-8 py-10 font-semibold bg-white max-w-[648px] text-neutral-800 max-md:px-5"
				aria-label="Notification Preferences"
			>
				<h2 className="text-2xl tracking-tight leading-none max-md:max-w-full">
					Notifications
				</h2>
				<form
					className="flex flex-col mt-7 text-sm tracking-normal leading-loose max-md:max-w-full"
					onSubmit={form.handleSubmit((data) => console.log(data))}
				>
					<FormField
						control={form.control}
						name="coursePurchase"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="coursePurchase"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="course-purchase"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about course purchases"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="course-purchase"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know who buy my course.
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="courseReview"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center mt-5 text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="courseReview"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="course-review"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about course reviews"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="course-review"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know who write a review on my course.
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lectureComment"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center mt-5 text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="lectureComment"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="lecture-comment"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about lecture comments"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="lecture-comment"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know who commented on my lecture.
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="notesDownload"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center mt-5 text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="notesDownload"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="notes-download"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about lecture notes downloads"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="notes-download"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know who download my lecture notes.
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="commentReply"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center mt-5 text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="commentReply"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="comment-reply"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about comment replies"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="comment-reply"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know who replied on my comment.
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="profileVisits"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center mt-5 text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="profileVisits"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="profile-visits"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about daily profile visits"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="profile-visits"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know daily how many people visited my profile.
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="fileDownload"
						render={() => (
							<FormItem className="flex flex-wrap gap-2 items-center mt-5 text-gray-500 hover:text-black max-md:max-w-full">
								<FormControl>
									<Controller
										name="fileDownload"
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id="file-download"
												className="h-[18px] w-[18px] border border-gray-300 cursor-pointer hover:border-orange-500"
												aria-label="Notify me about lecture file downloads"
												checked={field.value}
												onCheckedChange={field.onChange}
												color="#FF6636"
											/>
										)}
									/>
								</FormControl>
								<FormLabel
									htmlFor="file-download"
									className="self-stretch my-auto w-[558px] max-md:max-w-full"
								>
									I want to know who download my lecture attach file.
								</FormLabel>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="gap-3 self-start px-8 py-6 mt-7 text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500 max-md:px-6 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
						aria-label="Save notification preferences"
					>
						Save changes
					</Button>
				</form>
			</section>
		</Form>
	);
};

export default FormNoti;
