import React from 'react';

const MapImage: React.FC = () => (
	<iframe
		title="Google Map"
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0344323010623!2d109.2191!3d13.8039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317f3ca71aabcf3b%3A0x5b8d66a3e847a5!2zRmlsbSAoRMawxqFuZyBjw7RuZyBuaOG6rW4pIFBPIGRhaSBIw7luZyBZw6p1IE5ob24!5e0!3m2!1sen!2s!4v1700000000000"
		width="100%"
		height="300px"
		className="w-full h-[800px]"
		style={{ border: 0 }}
		allowFullScreen
		loading="lazy"
		referrerPolicy="no-referrer-when-downgrade"
	></iframe>
);

const Footer: React.FC = () => {
	return (
		<section className="flex flex-col items-stretch p-0 m-0 w-full h-[300px]">
			<MapImage />
		</section>
	);
};

export default Footer;
