export default function VideoSection() {
	return (
		<section className="flex flex-col justify-center items-center px-16 py-38 max-w-[872px] max-md:px-5 max-md:py-24">
			<div className="relative w-full max-w-3xl aspect-video">
				<iframe
					className="w-full h-full rounded-lg shadow-lg"
					src="https://www.youtube.com/embed/NpkVR6h7dNU"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			</div>
		</section>
	);
}
