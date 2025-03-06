'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
	username: z.string().nonempty('Username is required.'),
	password: z.string().nonempty('Password is required.'),
});

const LoginForm = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			setErrorMessage(null);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				throw new Error('Invalid credentials. Please try again.');
			}

			const result = await response.json();
			const accessToken = result.access_token;
			const adminInfo = {
				username: data.username,
			};

			localStorage.setItem('access_token', accessToken);
			localStorage.setItem('admin_info', JSON.stringify(adminInfo));

			window.location.href = '/admins/dashboard';
		} catch (error: any) {
			setErrorMessage(
				error.message || 'Something went wrong. Please try again.',
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen bg-slate-50 max-md:flex-col max-md:p-5 max-sm:p-4">
			<Image
				loading="lazy"
				src={'/app/admin/admin-login-banner.png'}
				className="object-contain self-stretch my-auto aspect-[0.84] min-w-60 w-[836px] max-md:max-w-full max-h-[850] "
				width={1264}
				height={1500}
				alt="Banner"
			/>
			<div className="flex flex-1 justify-center items-center max-md:p-5">
				<div className="w-full max-w-md max-md:max-w-full">
					<h1 className="mb-10 text-4xl font-semibold text-black max-sm:text-3xl text-center">
						Admin Login
					</h1>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="mb-5">
								<FormLabel
									htmlFor="username"
									className="mb-1.5 text-sm text-black block"
								>
									Username
								</FormLabel>
								<Input
									type="text"
									id="username"
									placeholder="Username"
									className="px-5 py-3 w-full text-base text-black bg-white rounded border border-gray-200 border-solid"
									{...form.register('username')}
								/>
								{form.formState.errors.username && (
									<span className="text-sm text-red-500">
										{form.formState.errors.username.message}
									</span>
								)}
							</div>

							<div className="mb-5">
								<FormLabel
									htmlFor="password"
									className="mb-1.5 text-sm text-black block"
								>
									Password
								</FormLabel>
								<Input
									type="password"
									id="password"
									placeholder="Password"
									className="px-5 py-3 w-full text-base text-black bg-white rounded border border-gray-200 border-solid"
									{...form.register('password')}
								/>
								{form.formState.errors.password && (
									<span className="text-sm text-red-500">
										{form.formState.errors.password.message}
									</span>
								)}
							</div>

							{errorMessage && (
								<div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
							)}

							<div className="flex justify-end items-end mb-6">
								<Button
									type="submit"
									className="flex gap-3 justify-center items-center px-6 py-3 text-base font-semibold text-white bg-orange-500 rounded cursor-pointer w-[200px] hover:bg-orange-600 transition-colors"
									disabled={isLoading}
								>
									{isLoading ? (
										<div className="flex justify-center items-center">
											<div className="animate-spin rounded-full h-5 w-5 border-b-4 border-white"></div>
										</div>
									) : (
										<span>Sign In</span>
									)}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
