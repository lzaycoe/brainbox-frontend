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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiEye } from 'react-icons/pi';
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
import { Toggle } from '@/components/ui/toggle';

const formChangePassSchema = z
	.object({
		currentPassword: z.string().nonempty('Current password is required'),
		newPassword: z.string().nonempty('New password is required'),
		confirmPassword: z.string().nonempty('Confirm password is required'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

const FormChangePass = () => {
	const form = useForm<z.infer<typeof formChangePassSchema>>({
		resolver: zodResolver(formChangePassSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col p-8 font-semibold bg-white max-w-[648px] max-md:px-5 w-[575px]"
				aria-labelledby="change-password-title"
				onSubmit={form.handleSubmit((data) => console.log(data))}
			>
				<h2
					id="change-password-title"
					className="text-2xl tracking-tight leading-none text-neutral-800 max-md:max-w-full"
				>
					Change password
				</h2>
				<div className="flex flex-col mt-6 w-full">
					<FormField
						control={form.control}
						name="currentPassword"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full max-w-[584px] min-h-[76px] max-md:max-w-full">
								<FormLabel>Current Password</FormLabel>
								<FormControl>
									<div className="flex gap-10 items-center px-5 py-3 mt-1.5 text-base text-gray-400 bg-white border border-gray-200 border-solid">
										<Input
											type={showPassword ? 'text' : 'password'}
											id="current-password"
											placeholder="Enter current password"
											className="w-full border-none outline-none bg-transparent"
											aria-label="Enter current password"
											{...field}
										/>
										<Toggle
											className="focus:outline-none focus:ring-2 focus:ring-orange-500"
											aria-label="Toggle password visibility"
											onPressedChange={togglePasswordVisibility}
										>
											<PiEye className="w-6 h-6" />
										</Toggle>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem className="flex flex-col mt-5 w-full max-w-[584px] min-h-[76px] max-md:max-w-full">
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<div className="flex gap-10 items-center px-5 py-3 mt-1.5 text-base text-gray-400 bg-white border border-gray-200 border-solid">
										<Input
											type={showPassword ? 'text' : 'password'}
											id="new-password"
											placeholder="Enter new password"
											className="w-full border-none outline-none bg-transparent"
											aria-label="Enter new password"
											{...field}
										/>
										<Toggle
											className="focus:outline-none focus:ring-2 focus:ring-orange-500"
											aria-label="Toggle password visibility"
											onPressedChange={togglePasswordVisibility}
										>
											<PiEye className="w-6 h-6" />
										</Toggle>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem className="flex flex-col mt-5 w-full max-w-[584px] min-h-[76px] max-md:max-w-full">
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<div className="flex gap-10 items-center px-5 py-3 mt-1.5 text-base text-gray-400 bg-white border border-gray-200 border-solid">
										<Input
											type={showPassword ? 'text' : 'password'}
											id="confirm-password"
											placeholder="Confirm new password"
											className="w-full border-none outline-none bg-transparent"
											aria-label="Confirm new password"
											{...field}
										/>
										<Toggle
											className="focus:outline-none focus:ring-2 focus:ring-orange-500"
											aria-label="Toggle password visibility"
											onPressedChange={togglePasswordVisibility}
										>
											<PiEye className="w-8 h-8" />
										</Toggle>
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
				>
					Save changes
				</Button>
			</form>
		</Form>
	);
};

export default FormChangePass;
