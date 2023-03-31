<template>
	<div>
		<h1 class="heading heading--h1">{{ pageTitle }}</h1>
		<div class="application">
			<text-about />
			<sliders-about :count="5" :limit="0"/>
		</div>
		<h2>Банки партнеры</h2>
		<LazyHydrate when-visible>
			<slider-banks />
		</LazyHydrate>
	</div>
	
</template>

<script>
import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";
import LazyHydrate from "vue-lazy-hydration";

export default {
	mixins: [seoTags],
	components: {
		LazyHydrate,
		TextAbout: () => import(/* webpackChunkName: "text-about" */'~/components/Text/About'),
		SliderBanks: () => import(/* webpackChunkName: "slider-banks" */ '~/components/Slider/Banks'),
		SlidersAbout: () => import('~/components/Slider/About'),
	},
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>