import React from 'react';

const SectionTitle = ({ title }: { title: string }) => (
	<div className="text-center text-2xl font-semibold text-gray-900">
		{title}
	</div>
);

const InfoBlock = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div className="flex gap-6 items-start">
		<div className="w-40 text-orange-500 font-medium uppercase">{label}</div>
		<div className="w-80 text-gray-900 flex flex-col">{children}</div>
	</div>
);

const InputField = ({
	label,
	placeholder,
	id,
}: {
	label: string;
	placeholder: string;
	id: string;
}) => (
	<div className="flex flex-col gap-1">
		<label htmlFor={id} className="text-sm text-gray-900">
			{label}
		</label>
		<input
			id={id}
			type="text"
			placeholder={placeholder}
			className="border border-gray-300 p-2 rounded text-gray-700"
		/>
	</div>
);

const ContactForm = () => (
	<div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
		<div className="text-xl font-semibold text-gray-900 mb-4">Get In Touch</div>
		<p className="text-gray-600 text-sm mb-6">
			Feel free to contact us, we love to make new partners & friends.
		</p>
		<div className="grid grid-cols-2 gap-4">
			<InputField
				label="First Name"
				placeholder="First name..."
				id="first-name"
			/>
			<InputField label="Last Name" placeholder="Last name..." id="last-name" />
		</div>
		<InputField label="Email" placeholder="Email Address" id="email" />
		<InputField label="Subject" placeholder="Message Subject" id="subject" />
		<div className="flex flex-col gap-1">
			<label htmlFor="message" className="text-sm text-gray-900">
				Message
			</label>
			<textarea
				id="message"
				placeholder="Your message..."
				className="border border-gray-300 p-2 rounded text-gray-700 h-24"
			></textarea>
		</div>
		<button className="mt-4 bg-orange-500 text-white px-6 py-3 rounded font-semibold flex items-center gap-2">
			Send Message
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M20.5816 11.3465L4.74585 2.47843C4.61262 2.40383 4.4598 2.37166 4.30781 2.38624C4.15582 2.40081 4.0119 2.46143 3.89528 2.55999C3.77866 2.65855 3.6949 2.79035 3.65519 2.93779C3.61549 3.08523 3.62173 3.24127 3.67309 3.38506L6.66006 11.7486C6.71832 11.9117 6.71832 12.09 6.66006 12.2531L3.67309 20.6166C3.62173 20.7604 3.61549 20.9165 3.65519 21.0639C3.6949 21.2113 3.77866 21.3431 3.89528 21.4417C4.0119 21.5403 4.15582 21.6009 4.30781 21.6155C4.45981 21.63 4.61263 21.5979 4.74585 21.5233L20.5816 12.6552C20.6979 12.5901 20.7948 12.4951 20.8622 12.3801C20.9296 12.2651 20.9652 12.1342 20.9652 12.0008C20.9652 11.8675 20.9296 11.7366 20.8622 11.6216C20.7948 11.5066 20.6979 11.4116 20.5816 11.3465V11.3465Z"
					stroke="white"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	</div>
);

const Content = () => (
	<div className="flex flex-col items-center p-5 bg-gray-100 pb-12">
		<SectionTitle title="Contact Us" />
		<div className="flex gap-32 mt-10">
			<div className="flex flex-col gap-10 max-w-md">
				<p className="text-lg text-gray-900">
					Will you be in Vietnam or any other branches anytime soon? Stop by the
					office! Wed love to meet.
				</p>
				<InfoBlock label="Address">
					FPT University Campus, An Phu Thinh New Urban Area, Quy Nhon City,
					Vietnam
				</InfoBlock>
				<InfoBlock label="Phone Number">
					(480) 555-0103 <br /> (219) 555-0114
				</InfoBlock>
				<InfoBlock label="Email address">
					help.lazycode@gmail.com <br /> career.lazycode@gmail.com
				</InfoBlock>
			</div>
			<ContactForm />
		</div>
	</div>
);

export default Content;
