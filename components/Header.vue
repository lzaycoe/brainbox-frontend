<template>
	<header
		class="flex z-10 flex-col justify-center items-center w-full max-md:max-w-full"
	>
		<nav
			class="flex flex-wrap gap-10 justify-between items-center px-8 w-full text-sm tracking-normal bg-neutral-800 max-md:px-5 max-md:max-w-full"
			role="navigation"
			aria-label="Main navigation"
		>
			<div
				class="flex flex-wrap gap-2 justify-center items-center self-stretch my-auto font-medium leading-none text-gray-400 min-w-[240px] max-md:max-w-full"
			>
				<a
					href="/"
					class="gap-2.5 self-stretch p-4 my-auto text-white whitespace-nowrap shadow-sm bg-neutral-800"
					aria-current="page"
					>Home</a
				>
				<a
					href="/courses"
					class="gap-2.5 self-stretch p-4 my-auto whitespace-nowrap bg-neutral-800"
					>Courses</a
				>
				<a
					href="/about"
					class="gap-2.5 self-stretch p-4 my-auto whitespace-nowrap bg-neutral-800"
					>About</a
				>
				<a
					href="/contact"
					class="gap-2.5 self-stretch p-4 my-auto whitespace-nowrap bg-neutral-800"
					>Contact</a
				>
				<a
					href="/become-instructor"
					class="gap-2.5 self-stretch p-4 my-auto bg-neutral-800"
					>Become an Instructor</a
				>
			</div>

			<div
				class="flex gap-6 items-start self-stretch my-auto leading-loose text-gray-400 whitespace-nowrap"
			>
				<button
					class="flex gap-1.5 justify-center items-center"
					aria-label="Select currency"
				>
					<span class="self-stretch my-auto">USD</span>
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ee7d561f1da55c57f80ca6c7b826046b2bd46a526aba9b52e730de269417736?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
						class="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
						alt=""
					/>
				</button>

				<button
					class="flex gap-1.5 justify-center items-center"
					aria-label="Select language"
				>
					<span class="self-stretch my-auto">English</span>
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ee7d561f1da55c57f80ca6c7b826046b2bd46a526aba9b52e730de269417736?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
						class="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
						alt=""
					/>
				</button>
			</div>
		</nav>

		<div
			class="flex flex-wrap gap-10 justify-between items-center px-8 py-6 w-full bg-white shadow-sm max-md:px-5 max-md:max-w-full"
		>
			<div
				class="flex flex-wrap gap-10 justify-center items-center self-stretch my-auto min-w-[240px] max-md:max-w-full"
			>
				<a
					href="/"
					class="flex gap-2 items-start self-stretch my-auto text-3xl font-semibold tracking-tighter leading-none whitespace-nowrap text-neutral-800"
				>
					<img
						loading="lazy"
						src="../public/favicon.png"
						class="object-contain shrink-0 w-10 aspect-square"
						alt="BrainBox Logo"
					/>
					<span>BrainBox</span>
				</a>

				<form
					class="flex flex-wrap gap-4 items-start self-stretch my-auto text-base min-w-[240px] max-md:max-w-full"
					role="search"
				>
					<button
						type="button"
						class="flex gap-10 justify-center px-5 py-3 text-gray-600 whitespace-nowrap bg-white border border-gray-200 border-solid w-[200px]"
						aria-label="Browse categories"
					>
						<span>Browse</span>
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/067529286996d5b731a9d1c21a0a990bdeb9937609dbfc7106f49d3c85db7cf7?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
							class="object-contain shrink-0 my-auto w-4 aspect-square"
							alt=""
						/>
					</button>

					<div
						class="flex overflow-hidden flex-col justify-center items-start px-5 py-3 text-gray-400 bg-white border border-gray-200 border-solid min-w-[240px] w-[424px] max-md:pr-5 max-md:max-w-full"
					>
						<label for="searchInput" class="sr-only">Search courses</label>
						<div class="flex gap-3 items-center">
							<img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc847cad36a6a23a9339358af45d76613030a14cfb9fa62bc6ba981950256a3f?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
								class="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
								alt=""
							/>
							<input
								type="search"
								id="searchInput"
								placeholder="What do you want learn..."
								class="bg-transparent border-none outline-none w-full"
							/>
						</div>
					</div>
				</form>
			</div>

			<div
				class="flex gap-6 items-center self-stretch my-auto text-base font-semibold tracking-normal leading-10 capitalize min-w-[240px] max-md:max-w-full"
			>
				<button aria-label="Notifications">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfe9f4c527c26fce647de7e32ab24c2d20f4ce145247cc6fec2b9f44e8d23b2e?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
						class="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						alt=""
					/>
				</button>
				<button aria-label="Wishlist">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/d83e702f70b74449e3c28f251f08bd0d8a71daf4fe03b4639cbfa8da754167a2?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
						class="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						alt=""
					/>
				</button>
				<button aria-label="Shopping cart">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/16e65f98bd35fe1fc3e1d8455d1e42a63499fe4532d0973fb76f1e60a52adee3?placeholderIfAbsent=true&apiKey=2d262c75856d4619867d10ab6fef12bc"
						class="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						alt=""
					/>
				</button>

				<div class="flex gap-3 items-start self-stretch my-auto min-w-[240px]">
					<a
						href="/signup"
						class="gap-3 self-stretch px-6 text-orange-500 bg-rose-100 max-md:px-5"
						>Create Account</a
					>
					<a
						href="/signin"
						class="gap-3 self-stretch px-6 text-white bg-orange-500 max-md:px-5"
						>Sign In</a
					>
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BrainBoxHeader',
});
</script>
