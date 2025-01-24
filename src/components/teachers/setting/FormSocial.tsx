/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsInstagram } from 'react-icons/bs';
import {
	FaFacebookF,
	FaLinkedinIn,
	FaTwitter,
	FaWhatsapp,
	FaYoutube,
} from 'react-icons/fa';
import { PiGlobe } from 'react-icons/pi';
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

const formSocialSchema = z.object({
	website: z.string().url('Invalid URL').optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	linkedin: z.string().optional(),
	twitter: z.string().optional(),
	whatsapp: z.string().optional(),
	youtube: z.string().optional(),
});

const FormSocial = () => {
	const form = useForm<z.infer<typeof formSocialSchema>>({
		resolver: zodResolver(formSocialSchema),
		defaultValues: {
			website: '',
			facebook: '',
			instagram: '',
			linkedin: '',
			twitter: '',
			whatsapp: '',
			youtube: '',
		},
	});

	const iconClass = 'text-[#FF6636] w-5 h-5';

	return (
		<Form {...form}>
			<form
				className="flex flex-col p-10 bg-white max-md:px-5 max-w-[1240px] mx-auto"
				onSubmit={form.handleSubmit((data) => console.log(data))}
				aria-label="Social Profile Section"
			>
				<h2 className="text-2xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
					Social Profile
				</h2>
				<div className="flex flex-col mt-6 w-full max-w-[1240px] max-md:max-w-full">
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full min-h-[76px]">
								<FormLabel>Personal Website</FormLabel>
								<FormControl>
									<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full text-base text-gray-400 bg-white border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full">
										<PiGlobe className={iconClass} />
										<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
										<Input
											type="url"
											id="website"
											placeholder="Personal website or portfolio url..."
											className="flex-1 bg-transparent border-none outline-none text-gray-400"
											aria-label="Enter your personal website URL"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-wrap gap-5 items-start mt-5 max-md:max-w-full">
						<FormField
							control={form.control}
							name="facebook"
							render={({ field }) => (
								<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[373px]">
									<FormLabel>Facebook</FormLabel>
									<FormControl>
										<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full bg-white border border-gray-200 border-solid max-md:pr-5">
											<FaFacebookF className={iconClass} />
											<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
											<Input
												type="text"
												id="facebook"
												placeholder="Username"
												className="flex-1 bg-transparent border-none outline-none text-gray-400"
												aria-label="Enter your Facebook username"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="instagram"
							render={({ field }) => (
								<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[373px]">
									<FormLabel>Instagram</FormLabel>
									<FormControl>
										<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full bg-white border border-gray-200 border-solid max-md:pr-5">
											<BsInstagram className={iconClass} />
											<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
											<Input
												type="text"
												id="instagram"
												placeholder="Username"
												className="flex-1 bg-transparent border-none outline-none text-gray-400"
												aria-label="Enter your Instagram username"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="linkedin"
							render={({ field }) => (
								<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[373px]">
									<FormLabel>LinkedIn</FormLabel>
									<FormControl>
										<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full bg-white border border-gray-200 border-solid max-md:pr-5">
											<FaLinkedinIn className={iconClass} />
											<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
											<Input
												type="text"
												id="linkedin"
												placeholder="Username"
												className="flex-1 bg-transparent border-none outline-none text-gray-400"
												aria-label="Enter your LinkedIn username"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-wrap gap-5 items-start mt-5 max-md:max-w-full">
						<FormField
							control={form.control}
							name="twitter"
							render={({ field }) => (
								<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[373px]">
									<FormLabel>Twitter</FormLabel>
									<FormControl>
										<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full bg-white border border-gray-200 border-solid max-md:pr-5">
											<FaTwitter className={iconClass} />
											<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
											<Input
												type="text"
												id="twitter"
												placeholder="Username"
												className="flex-1 bg-transparent border-none outline-none text-gray-400"
												aria-label="Enter your Twitter username"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="whatsapp"
							render={({ field }) => (
								<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[373px]">
									<FormLabel>WhatsApp</FormLabel>
									<FormControl>
										<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full bg-white border border-gray-200 border-solid max-md:pr-5">
											<FaWhatsapp className={iconClass} />
											<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
											<Input
												type="tel"
												id="whatsapp"
												placeholder="Phone number"
												className="flex-1 bg-transparent border-none outline-none text-gray-400"
												aria-label="Enter your WhatsApp phone number"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="youtube"
							render={({ field }) => (
								<FormItem className="flex flex-col min-h-[76px] min-w-[240px] w-[373px]">
									<FormLabel>YouTube</FormLabel>
									<FormControl>
										<div className="flex gap-3 items-center px-5 py-2 mt-1.5 w-full bg-white border border-gray-200 border-solid max-md:pr-5">
											<FaYoutube className={iconClass} />
											<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
											<Input
												type="text"
												id="youtube"
												placeholder="Username"
												className="flex-1 bg-transparent border-none outline-none text-gray-400"
												aria-label="Enter your YouTube username"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type="submit"
						className="gap-3 self-start px-8 py-6 mt-6 text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500 max-md:px-6 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
						aria-label="Save profile changes"
					>
						Save changes
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default FormSocial;
