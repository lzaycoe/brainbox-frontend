'use client';

import React, { useState } from 'react';
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

const NavItem = ({
	text,
	active,
	onClick,
}: {
	text: string;
	active: boolean;
	onClick: () => void;
}) => (
	<>
		<button
			onClick={onClick}
			className={`gap-6 self-stretch px-4 py-3 w-64 max-w-full text-left ${
				active ? 'bg-orange-500 text-black' : ''
			}`}
		>
			{text}
		</button>
		<hr className="w-64 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-px" />
	</>
);

const Nav = ({
	selectedIndex,
	setSelectedIndex,
}: {
	selectedIndex: number;
	setSelectedIndex: (index: number) => void;
}) => {
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
				<NavItem
					key={index}
					text={item}
					active={index === selectedIndex}
					onClick={() => setSelectedIndex(index)}
				/>
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

const FAQList = ({ selectedIndex }: { selectedIndex: number }) => {
	const faqsList = [
		[
			{
				question: 'Fusce placerat interdum magna.',
				answer: 'Lorem ipsum dolor sit amet.',
			},
			{
				question: 'Etiam a nisl dui.',
				answer: 'Curabitur at sem et sapien interdum.',
			},
		],
		[
			{
				question: 'Proin lacinia lobortis metus.',
				answer: 'Vestibulum ante ipsum primis.',
			},
			{ question: 'Nulla id ligula ligula.', answer: 'Suspendisse potenti.' },
		],
		[
			{
				question: 'Ut ullamcorper est sit amet.',
				answer: 'Curabitur porttitor sem nec felis.',
			},
		],
		[
			{
				question: 'Vestibulum pellentesque ex magna.',
				answer: 'Nunc vitae iaculis lacus.',
			},
		],
		[
			{
				question: 'Etiam non tellus non dolor suscipit.',
				answer: 'Donec dignissim metus felis.',
			},
		],
		[{ question: 'Nullam non ante.', answer: 'Lorem ipsum dolor sit amet.' }],
		[
			{
				question: 'Phasellus bibendum.',
				answer: 'Duis sollicitudin urna ac nulla.',
			},
		],
		[
			{
				question: 'Etiam eu libero elementum.',
				answer: 'Mauris auctor et urna in scelerisque.',
			},
		],
	];

	const selectedFAQs = faqsList[selectedIndex] || [];

	return (
		<section className="min-w-60 max-md:max-w-full">
			{selectedFAQs.map((faq, index) => (
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
				Write your question here, and our support team will help you.
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
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<div className="flex flex-col justify-center items-center py-20">
			<Header />
			<main className="flex flex-wrap gap-10 items-start mt-10 max-md:max-w-full min-h-[500px]">
				<Nav
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
				/>
				<FAQList selectedIndex={selectedIndex} />
				<ContactForm />
			</main>
		</div>
	);
};

export default Content;
