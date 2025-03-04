import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PiUploadSimple } from 'react-icons/pi';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
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

const formInfoSchema = z.object({
	firstName: z.string().nonempty('First name is required'),
	lastName: z.string().nonempty('Last name is required'),
	username: z.string().nonempty('Username is required'),
	phoneNumber: z.string().nonempty('Phone number is required'),
	title: z.string().nonempty('Title is required'),
	biography: z.string().nonempty('Biography is required'),
});

const FormInfo = () => {
	const { user } = useUser();

	const form = useForm<z.infer<typeof formInfoSchema>>({
		resolver: zodResolver(formInfoSchema),
		defaultValues: {
			firstName: user?.firstName ?? '',
			lastName: user?.lastName ?? '',
			username: '',
			phoneNumber: '',
			title: '',
			biography: '',
		},
	});

	return (
		<Form {...form}>
			<form
				className="flex flex-col p-10 bg-white max-md:px-5 max-w-[1240px] mx-auto"
				onSubmit={form.handleSubmit((data) => console.log(data))}
			>
				<div className="flex flex-col w-full">
					<div className="flex gap-9 justify-between items-start w-full">
						<div className="flex flex-col min-w-[240px] w-full max-md:max-w-full">
							<div className="flex flex-col w-full">
								<h1 className="text-2xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
									Account Settings
								</h1>
								<div className="flex flex-wrap gap-5 justify-between items-end mt-6 w-full">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[48%] max-md:max-w-full">
												<FormLabel>First name</FormLabel>
												<FormControl>
													<Input
														type="text"
														id="firstName"
														placeholder="First name"
														className="flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 border-solid max-md:pr-5 max-md:max-w-full"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[48%] max-md:max-w-full">
												<FormLabel>Last name</FormLabel>
												<FormControl>
													<Input
														type="text"
														id="lastName"
														placeholder="Last name"
														className="flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 border-solid max-md:pr-5 max-md:max-w-full"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem className="flex flex-col mt-5 w-full min-h-[76px]">
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													type="text"
													id="username"
													placeholder="Enter your username"
													className="flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 bg-white border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phoneNumber"
									render={({ field }) => (
										<FormItem className="flex flex-col mt-5 w-full min-h-[76px] max-md:max-w-full">
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<div className="flex gap-5 items-center px-5 py-3 mt-1.5 text-base bg-white border border-gray-200 border-solid size-full max-md:max-w-full">
													<Select>
														<SelectTrigger className="w-24 flex gap-1.5 items-center self-start font-medium leading-none text-orange-500 whitespace-nowrap">
															<SelectValue placeholder="+880" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="+880">+880</SelectItem>
															<SelectItem value="+1">+1</SelectItem>
															<SelectItem value="+44">+44</SelectItem>
															<SelectItem value="+91">+91</SelectItem>
														</SelectContent>
													</Select>
													<Input
														type="tel"
														id="phoneNumber"
														placeholder="Your Phone number..."
														className="flex-auto text-gray-400 w-full border-none focus:outline-none"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-col justify-center items-center p-8 bg-slate-100 min-w-[240px] max-md:px-5">
							<div className="flex flex-col max-w-full text-sm font-medium tracking-normal leading-none text-white w-[200px]">
								<div className="flex relative flex-col pt-40 w-full aspect-square max-md:pt-24">
									<Image
										loading="lazy"
										src={user?.imageUrl ?? '/images/placeholder.png'}
										alt="Profile picture"
										className="object-cover absolute inset-0 size-full"
										width={200}
										height={200}
									/>
									<Button
										type="button"
										className="flex relative gap-2 justify-center items-center p-3 bg-black bg-opacity-50"
									>
										<PiUploadSimple className="self-center" />
										<span className="self-center">Upload Photo</span>
									</Button>
								</div>
							</div>
							<div className="mt-6 text-xs leading-4 text-center text-gray-500">
								Image size should be under 1MB and image ratio needs to be 1:1
							</div>
						</div>
					</div>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="flex flex-col mt-5 w-full max-md:max-w-full">
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										type="text"
										id="title"
										placeholder="Your title, profession or small biography"
										maxLength={50}
										className="flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 border-solid max-md:pr-5 max-md:max-w-full"
										aria-describedby="titleCount"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="biography"
						render={({ field }) => (
							<FormItem className="flex flex-col mt-5 w-full">
								<FormLabel>Biography</FormLabel>
								<FormControl>
									<Textarea
										id="biography"
										placeholder="Your title, profession or small biography"
										className="overflow-hidden px-5 pt-3 pb-20 mt-1.5 w-full text-base text-gray-400 bg-white border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
										{...field}
									></Textarea>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					className="gap-3 self-start px-8 py-6 mt-6 text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500 max-md:px-6 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
				>
					Save changes
				</Button>
			</form>
		</Form>
	);
};

export default FormInfo;
