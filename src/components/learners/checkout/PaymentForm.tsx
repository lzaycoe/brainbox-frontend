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
import Image from 'next/image';
import React from 'react';
import { PiCheckCircleFill, PiCreditCard } from 'react-icons/pi';

export default function PaymentForm() {
	return (
		<div className="flex flex-col items-end max-md:max-w-full">
			<form className="flex overflow-hidden flex-col max-w-[648px]">
				<h2 className="text-2xl font-semibold tracking-tight leading-10 max-md:max-w-full">
					Payment Method
				</h2>
				<div className="flex flex-col w-full text-sm leading-loose text-gray-600 max-md:max-w-full">
					{[
						{
							logo: '/app/checkout/image_1.png',
							number: '4855 **** **** ****',
							expiry: '04/24',
							name: 'Vako Shvili',
							id: 1,
						},
						{
							logo: '/app/checkout/image_2.png',
							number: '5795 **** **** ****',
							expiry: '04/24',
							name: 'Vako Shvili',
							id: 2,
						},
					].map((card) => (
						<div
							key={card.id}
							className="flex flex-nowrap items-center justify-between px-6 py-2.5 mt-4 tracking-normal bg-white border border-gray-200 border-solid max-md:px-5 max-md:max-w-full"
						>
							<Image
								src={card.logo}
								alt="Credit Card Provider Logo"
								width={32}
								height={32}
								className="object-contain shrink-0 w-8 aspect-square"
							/>
							<div
								className="text-gray-700 text-center flex-grow"
								role="text"
								aria-label={`Card number ending in ${card.number.slice(0, 4)}`}
							>
								{card.number}
							</div>
							<div
								className="text-gray-700 text-center w-[100px]"
								role="text"
								aria-label="Expiration date"
							>
								{card.expiry}
							</div>
							<div
								className="text-gray-700 text-center w-[150px]"
								role="text"
								aria-label="Card holder name"
							>
								{card.name}
							</div>
						</div>
					))}

					<div className="flex flex-nowrap items-center justify-between px-6 py-3.5 mt-4 w-full text-xs leading-none text-gray-400 bg-white border border-gray-200 border-solid max-md:px-5 max-md:max-w-full">
						<Image
							src="/app/checkout/image_3.png"
							alt="PayPal Logo"
							width={28}
							height={28}
							className="object-contain shrink-0 w-7 aspect-square"
						/>
						<div className="text-gray-700 text-left flex-grow ml-4" role="text">
							You will be redirected to the PayPal site after reviewing your
							order.
						</div>
					</div>

					<section
						className="flex flex-nowrap items-center justify-between px-6 py-3.5 mt-4 w-full text-xs leading-none text-gray-400 bg-white border border-gray-200 border-solid max-md:px-5 max-md:max-w-full"
						aria-label="New Payment Cards"
					>
						<div className="flex items-center">
							<PiCreditCard className="w-6 h-6 text-[#FF6636] mr-2" />
							<span className="text-gray-800 text-left flex-grow ml-4">
								New Payment Cards
							</span>
						</div>
						<PiCheckCircleFill className="ml-auto w-6 h-6 text-[#23BD33]" />
					</section>
				</div>

				<div className="flex flex-col mt-6 w-full max-md:max-w-full">
					<div className="flex overflow-hidden flex-col w-full min-h-[76px] max-md:max-w-full">
						<label
							htmlFor="cardName"
							className="text-sm tracking-normal leading-loose text-neutral-800"
						>
							Name
						</label>
						<input
							type="text"
							id="cardName"
							placeholder="Name on card"
							className="overflow-hidden flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 bg-white border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
						/>
					</div>

					<div className="flex overflow-hidden flex-col mt-5 w-full min-h-[76px] max-md:max-w-full">
						<label
							htmlFor="cardNumber"
							className="text-sm tracking-normal leading-loose text-neutral-800"
						>
							Card Number
						</label>
						<div className="flex overflow-hidden flex-col flex-1 justify-center items-start px-5 py-2 mt-1.5 w-full text-base text-gray-400 whitespace-nowrap bg-white border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full">
							<div className="flex gap-3 justify-center items-center w-full">
								<PiCreditCard className="w-6 h-6 mr-4" color="#FF6636" />
								<input
									type="text"
									id="cardNumber"
									placeholder="Label"
									aria-label="Card number"
									className="flex-1 outline-none"
								/>
								<div className="shrink-0 self-stretch my-auto w-0 h-8 bg-gray-200 border border-gray-200 border-solid"></div>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-5 mt-5">
						<div className="flex overflow-hidden flex-col flex-1 grow shrink-0 basis-0 min-h-[76px] w-fit">
							<label
								htmlFor="expiryDate"
								className="text-sm tracking-normal leading-loose text-neutral-800"
							>
								MM / YY
							</label>
							<input
								type="text"
								id="expiryDate"
								placeholder="MM / YY"
								className="overflow-hidden flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 bg-white border border-gray-200 border-solid max-md:pr-5"
							/>
						</div>
						<div className="flex overflow-hidden flex-col flex-1 grow shrink-0 basis-0 min-h-[76px] w-fit">
							<label
								htmlFor="securityCode"
								className="text-sm tracking-normal leading-loose text-neutral-800"
							>
								CVC
							</label>
							<input
								type="password"
								id="securityCode"
								placeholder="Security Code"
								className="overflow-hidden flex-1 px-5 py-3 mt-1.5 w-full text-base text-gray-400 bg-white border border-gray-200 border-solid max-md:pr-5"
							/>
						</div>
					</div>
				</div>

				<div className="flex gap-2.5 items-start self-start mt-6">
					<input
						type="checkbox"
						id="saveCard"
						className="w-[22px] h-[22px] bg-orange-500"
					/>
					<label
						htmlFor="saveCard"
						className="text-sm tracking-normal leading-loose text-gray-600"
					>
						Remember this card, save it on my card list
					</label>
				</div>
			</form>
		</div>
	);
}
