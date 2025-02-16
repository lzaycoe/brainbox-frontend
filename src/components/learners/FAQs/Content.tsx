'use client';

import React from 'react';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Header = () => (
	<header className="w-full h-12 flex justify-center">
		<div className="max-w-[1200px] w-full flex justify-between items-center px-4">
			<h1 className="text-[#1D2026] text-4xl font-semibold leading-[48px]">
				Frequently asked questions
			</h1>
			<div className="w-[336px] flex justify-end">
				<select className="px-5 py-3 pr-10 text-base bg-white border border-solid border-gray-100 w-[200px]">
					<option>Students</option>
				</select>
			</div>
		</div>
	</header>
);

const NavItem = ({ text, active }: { text: string; active: boolean }) => (
	<>
		<a
			href="#"
			className={`gap-6 self-stretch px-4 py-3 w-64 max-w-full ${active ? 'bg-orange-500 text-black' : ''}`}
		>
			{text}
		</a>
		<hr className="w-64 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-px" />
	</>
);

const Nav = () => {
	const items = [
		'Nulla tempor odio ut fringilla',
		'Donec malesuada',
		'Quisque',
		'Toquam, in accumsan',
		'Ut sed orci',
		'Nullam non ante',
		'Phasellus',
		'Etiam eu libero elementum',
	];
	return (
		<nav className="flex flex-col justify-center py-2 w-64 text-sm font-medium leading-none text-black bg-white border border-solid border-gray-100 min-w-60">
			{items.map((item, index) => (
				<NavItem key={index} text={item} active={index === 0} />
			))}
		</nav>
	);
};

const FAQItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleFAQ = () => setIsOpen(!isOpen);

	return (
		<div className="flex flex-col w-[556px] mb-4">
			<button
				className={`cursor-pointer px-6 py-4 border border-gray-200 flex justify-between items-center w-full text-left ${
					isOpen ? 'bg-black text-white' : 'bg-white text-black'
				}`}
				onClick={toggleFAQ}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') toggleFAQ();
				}}
				aria-expanded={isOpen}
			>
				<span>{question}</span>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</button>
			{isOpen && (
				<div className="px-6 py-4 border border-gray-200 bg-gray-100 text-black">
					{answer}
				</div>
			)}
		</div>
	);
};

const FAQList = () => {
	const faqs = [
		{
			question: 'Fusce placerat interdum magna.',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tincidunt urna, non egestas nunc.',
		},
		{
			question:
				'Proin lacinia lobortis metus, ut faucibus eros ullamcorper et.',
			answer:
				'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
		},
		{
			question: 'Etiam a nisl dui.',
			answer: 'Curabitur at sem et sapien interdum bibendum in et risus.',
		},
		{
			question: 'Nulla id ligula ligula.',
			answer:
				'Suspendisse potenti. Nulla facilisi. Donec feugiat, elit ut cursus posuere.',
		},
		{
			question: 'Etiam non tellus non dolor suscipit vehicula.',
			answer: 'Donec dignissim metus felis, non posuere arcu finibus a.',
		},
		{
			question: 'Vestibulum pellentesque ex magna.',
			answer: 'Nunc vitae iaculis lacus, id fringilla leo.',
		},
		{
			question: 'Ut ullamcorper est sit amet quam aliquet mattis.',
			answer:
				'Curabitur porttitor sem nec felis mollis, nec laoreet leo iaculis.',
		},
	];

	return (
		<section className="min-w-60 max-md:max-w-full">
			{faqs.map((faq, index) => (
				<FAQItem key={index} question={faq.question} answer={faq.answer} />
			))}
		</section>
	);
};

const ContactForm = () => (
	<aside className="flex flex-col p-5 bg-slate-100 min-w-60 w-[336px]">
		<div className="flex flex-col gap-4 max-w-full w-[294px]">
			<h2 className="text-lg font-medium leading-none text-black">
				Don’t find your answer!
			</h2>
			<p className="text-xs leading-4 text-black">
				Don’t worry, write your question here and our support team will help
				you.
			</p>
			<form className="flex flex-col gap-3 text-sm tracking-normal leading-loose text-black w-full">
				<input
					type="text"
					placeholder="Subject"
					className="px-4 py-2.5 w-full bg-white border border-gray-300"
				/>
				<textarea
					placeholder="Message"
					className="px-4 pt-2.5 pb-24 w-full bg-white border border-gray-300"
				></textarea>
				<button
					type="submit"
					className="px-4 py-2 text-sm font-semibold text-white bg-orange-500"
				>
					Submit question
				</button>
			</form>
		</div>
	</aside>
);

const Content = () => {
	return (
		<div className="flex flex-col justify-center items-center py-20">
			<Header />
			<main className="flex flex-wrap gap-10 items-start mt-10 max-md:max-w-full min-h-[500px]">
				<Nav />
				<FAQList />
				<ContactForm />
			</main>
		</div>
	);
};

export default Content;
