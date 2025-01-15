<template>
	<div class="flex overflow-hidden flex-col bg-white">
		<Header />
		<HeroBanner />
		<!-- <Categories />
    <FeaturedCourses />
    <RecentCourses />
    <InstructorSection />
    <TrustedCompanies />
    <CTA />
    <Footer /> -->
	</div>
</template>

<script lang="ts">
import Header from '../components/Header.vue';
import HeroBanner from '../components/HeroBanner.vue';
import { defineComponent } from 'vue';

// import Categories from './components/Categories.vue'
// import FeaturedCourses from './components/FeaturedCourses.vue'
// import RecentCourses from './components/RecentCourses.vue'
// import InstructorSection from './components/InstructorSection.vue'
// import TrustedCompanies from './components/TrustedCompanies.vue'
// import CTA from './components/CTA.vue'
// import Footer from './components/Footer.vue'

export default defineComponent({
	name: 'Home',
	components: {
		Header,
		HeroBanner,
		// Categories,
		// FeaturedCourses,
		// RecentCourses,
		// InstructorSection,
		// TrustedCompanies,
		// CTA,
		// Footer
	},
});
</script>
