'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	username: z.string().nonempty('Username is required'),
	password: z.string().nonempty('Password is required'),
});

const LoginForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	return (
		<div className="flex p-10 min-h-screen bg-slate-50 max-md:flex-col max-md:p-5 max-sm:p-4">
			<div className="flex flex-1 justify-center items-center max-md:p-5">
				<div className="w-full max-w-md max-md:max-w-full">
					<h1 className="mb-10 text-4xl font-semibold text-black max-sm:text-3xl text-center">
						Admin Login
					</h1>

					<Form {...form}>
						<form>
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
									required
								/>
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
									required
								/>
							</div>

							<div className="flex justify-between items-center mb-6">
								<FormLabel className="flex gap-2.5 items-center cursor-pointer">
									<Input
										type="checkbox"
										className="peer hidden"
										id="remember"
									/>
									<label
										htmlFor="remember"
										className="rounded border border-gray-300 border-solid h-[22px] w-[22px] flex items-center justify-center cursor-pointer peer-checked:bg-orange-500"
									>
										<svg
											className="w-4 h-4 text-white peer-checked:block hidden"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</label>

									<span className="text-sm text-black">Remember me</span>
								</FormLabel>

								<Button
									type="submit"
									className="flex gap-3 justify-center items-center px-6 py-3 text-base font-semibold text-white bg-orange-500 rounded cursor-pointer w-[200px] hover:bg-orange-600 transition-colors"
								>
									<span>Sign In</span>
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
