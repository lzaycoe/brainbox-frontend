import React, { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

const WishlistActions = () => {
	const [isFavorited, setIsFavorited] = useState(true);

	return (
		<div className="flex items-center gap-x-3">
			<button className="px-6 w-44 h-12 text-base font-semibold bg-slate-100">
				Buy Now
			</button>
			<button className="px-6 w-44 h-12 text-base font-semibold bg-orange-500">
				Add to Cart
			</button>
			<button
				className="p-3 w-12 h-12 bg-orange-100 border border-orange-500 rounded-md flex items-center justify-center"
				onClick={() => setIsFavorited(!isFavorited)}
			>
				{isFavorited ? (
					<IoMdHeart size={24} className="text-orange-500" />
				) : (
					<IoMdHeartEmpty size={24} className="text-orange-500" />
				)}
			</button>
		</div>
	);
};

export default WishlistActions;
