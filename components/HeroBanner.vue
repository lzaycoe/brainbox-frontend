<template>
	<section
		class="-mt-1.5 w-full max-md:pl-5 max-md:max-w-full"
		aria-label="Hero section"
	>
		<div class="flex gap-5 max-md:flex-col justify-center items-center">
			<div class="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
				<div
					class="flex flex-col self-stretch my-auto w-full font-semibold max-md:mt-10 max-md:max-w-full"
				>
					<h1
						class="text-7xl tracking-tighter leading-[74px] text-neutral-800 max-md:max-w-full max-md:text-4xl max-md:leading-10"
					>
						Learn with expert anytime anywhere
					</h1>
					<p class="mt-10 text-2xl leading-8 text-gray-600 max-md:max-w-full">
						Our mision is to help people to find the best course online and
						learn with expert anytime, anywhere.
					</p>
					<a
						href="/signup"
						class="gap-3 self-start px-8 mt-10 text-lg tracking-normal text-white capitalize bg-orange-500 leading-[56px] max-md:px-5"
					>
						Create Account
					</a>
				</div>
			</div>
			<div class="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
				<img
					loading="lazy"
					src="../public/hero-banner.png"
					class="object-contain grow w-full aspect-[1.64] max-md:mt-10 max-md:max-w-full"
					alt="Students learning online"
				/>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HeroBanner',
});
</script>
