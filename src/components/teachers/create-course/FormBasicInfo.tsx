'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '@/schemas/course.schema';

const categories = [
	{ value: 'business', label: 'Business' },
	{ value: 'finance-accounting', label: 'Finance & Accounting' },
	{ value: 'it-software', label: 'IT & Software' },
	{ value: 'personal-development', label: 'Personal Development' },
	{ value: 'office-productivity', label: 'Office Productivity' },
	{ value: 'marketing', label: 'Marketing' },
	{ value: 'photography-video', label: 'Photography & Video' },
	{ value: 'lifestyle', label: 'Lifestyle' },
	{ value: 'design', label: 'Design' },
	{ value: 'health-fitness', label: 'Health & Fitness' },
	{ value: 'music', label: 'Music' },
];

interface FormBasicInfoProps {
	onNextTab: () => void;
}

const FormBasicInfo: React.FC<FormBasicInfoProps> = ({ onNextTab }) => {
	const { control } = useFormContext<FormData>();

	return (
		<div className="flex flex-col gap-8">
			<div className="self-stretch justify-between items-center inline-flex">
				<div className="text-[#1d1f26] text-3xl font-semibold">
					Basic Information
				</div>
			</div>
			<form className="flex flex-col gap-8">
				<FormField
					control={control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Title</FormLabel>
							<FormControl>
								<Input
									className="h-14 text-lg"
									placeholder="Your course title"
									{...field}
									value={field.value ?? ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="subtitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Subtitle</FormLabel>
							<FormControl>
								<Input
									className="h-14 text-lg"
									placeholder="Your course subtitle"
									{...field}
									value={field.value ?? ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Description</FormLabel>
							<FormControl>
								<Textarea
									className="h-32 text-lg"
									placeholder="Course description"
									value={field.value ?? ''}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="tag"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Course Category</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value ?? ''}
								>
									<SelectTrigger className="h-14 text-lg">
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between">
					<Button variant="outline" type="button" className="text-lg h-14">
						Cancel
					</Button>
					<Button
						type="button"
						variant="outline"
						className="text-lg h-14 bg-orange-500 text-white"
						onClick={onNextTab}
					>
						Next
					</Button>
				</div>
			</form>
		</div>
	);
};

export default FormBasicInfo;
