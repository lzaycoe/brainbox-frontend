import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';

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
	<div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg space-y-4">
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
			<AiOutlineSend size={20} />
		</button>
	</div>
);

const Content = () => (
	<div className="flex flex-col items-center p-5 bg-gray-100 pb-12">
		<SectionTitle title="Contact Us" />
		<div className="flex gap-32 mt-10">
			<div className="flex flex-col gap-6 max-w-md">
				<p className="text-lg text-gray-900">
					Will you be in Vietnam or any other branches anytime soon? Stop by the
					office! Wed love to meet.
				</p>
				<InfoBlock label="Address">
					FPT University Campus, An Phu Thinh New Urban Area, Quy Nhon City,
					Vietnam
				</InfoBlock>
				<hr className="border-gray-300 w-full" />
				<InfoBlock label="Phone Number">
					(+84) 333 382 420
					<br /> (+84) 763 707 144
				</InfoBlock>
				<hr className="border-gray-300 w-full" />
				<InfoBlock label="Email address">
					help.lazycode@gmail.com <br /> career.lazycode@gmail.com
				</InfoBlock>
			</div>
			<ContactForm />
		</div>
	</div>
);

export default Content;
