<template>
	<div class="main__page">
		<!--<h1 class="h1__title h1__title&#45;&#45;hidden">{{ pageTitle }}</h1>-->
		<LazyHydrate when-visible>
			<slider-main />
		</LazyHydrate>
		<LazyHydrate when-visible>
			<lists-marks />
		</LazyHydrate>
		<LazyHydrate when-visible>
			<filters />
		</LazyHydrate>
		<h2>Последние поступления</h2>
		<LazyHydrate when-visible>
			<catalog-main :show-pagination="false"
			              :default-view="'short'" />
		</LazyHydrate>
		<LazyHydrate when-visible>
			<nuxt-link class="button button--more button--more-main"
			           :to="catalogRoute">Все автомобили
			</nuxt-link>
		</LazyHydrate>
		<h2>Банки партнеры</h2>
		<LazyHydrate when-visible>
			<slider-banks />
		</LazyHydrate>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";
import requests from "@/mixins/requests";
import LazyHydrate from 'vue-lazy-hydration';

export default {
	components: {
		LazyHydrate,
		SliderMain: () => import(/* webpackChunkName: "slider-main" */ '~/components/Slider/Main'),
		Filters: () => import(/* webpackChunkName: "filters" */ '~/components/Filters'),
		SliderBanks: () => import(/* webpackChunkName: "slider-banks" */ '~/components/Slider/Banks'),
		ListsMarks: () => import(/* webpackChunkName: "lists-marks" */ '~/components/Lists/Marks'),
		SortPrice: () => import(/* webpackChunkName: "sort-price" */ '~/components/Sort/Price'),
		CatalogMain: () => import(/* webpackChunkName: "catalog-main" */ '~/components/Catalog/Main'),
	},
	mixins: [seoTags, requests],
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			marks: 'marks/marks'
		})
	}
}
</script>