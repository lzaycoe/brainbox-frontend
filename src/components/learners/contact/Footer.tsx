import Image from 'next/image';
import React from 'react';

const MapImage: React.FC = () => (
	<Image
		src="/app/contact/map.png"
		width={800}
		height={480}
		className="w-full h-auto object-cover"
		alt="Unified Communications Platform Interface"
	/>
);

const Footer: React.FC = () => {
	return (
		<section className="flex flex-col items-stretch p-0 m-0 w-full h-full">
			<MapImage />
		</section>
	);
};

export default Footer;
