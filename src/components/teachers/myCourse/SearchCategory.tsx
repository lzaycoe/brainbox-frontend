import { CiSearch } from 'react-icons/ci';

export default function SearchCategory() {
	return (
		<form className="flex flex-wrap gap-6 items-start">
			<div className="flex flex-col min-w-[240px] w-[528px] max-md:max-w-full">
				<label
					htmlFor="search-input"
					className="text-xs leading-none text-black"
				>
					Search:
				</label>
				<div className="flex overflow-hidden flex-col justify-center items-start px-5 py-3 mt-2 w-full text-base text-black bg-white max-md:pr-5 max-md:max-w-full">
					<div className="flex gap-3 items-center w-full">
						<div
							className="flex shrink-0 self-stretch my-auto"
							aria-hidden="true"
						>
							<CiSearch className="object-contain w-6 h-6 " />
						</div>
						<input
							id="search-input"
							type="text"
							placeholder="Search in your courses..."
							className="w-full bg-transparent border-none focus:outline-none"
							aria-label="Search in your courses"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-60">
				<label
					htmlFor="sort-select"
					className="text-xs leading-none text-black"
				>
					Sort by:
				</label>
				<select
					id="sort-select"
					className="overflow-hidden px-5 py-3 mt-2 w-full text-base text-black whitespace-nowrap bg-white max-md:pr-5 appearance-none"
				>
					<option>Latest</option>
				</select>
			</div>
			<div className="flex flex-col w-60">
				<label
					htmlFor="category-select"
					className="text-xs leading-none text-black"
				>
					Category
				</label>
				<select
					id="category-select"
					className="overflow-hidden px-5 py-3 mt-2 w-full text-base text-black bg-white max-md:pr-5 appearance-none"
				>
					<option>All Category</option>
				</select>
			</div>
			<div className="flex flex-col w-60">
				<label
					htmlFor="rating-select"
					className="text-xs leading-none text-black"
				>
					Rating
				</label>
				<select
					id="rating-select"
					className="overflow-hidden px-5 py-3 mt-2 w-full text-base text-black bg-white max-md:pr-5 appearance-none"
				>
					<option>4 Star & Up</option>
				</select>
			</div>
		</form>
	);
}
