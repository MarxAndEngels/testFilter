<template>
	<div>
		<h1 class="heading heading--h1">{{pageTitle}}</h1>
		<LazyHydrate when-visible>
			<lists-generations />
		</LazyHydrate>
		<LazyHydrate when-visible>
			<filters />
		</LazyHydrate>
		<LazyHydrate when-visible>
			<catalog-main show-sort
			              show-view />
		</LazyHydrate>
	</div>
</template>
<script>
import seoTags from "@/mixins/seoTags";
import validateCategory from "@/mixins/validateCategory";
import LazyHydrate from "vue-lazy-hydration";
import requests from "@/mixins/requests";

export default {
	data() {
		return {
			offers: []
		}
	},
	components: {
		LazyHydrate,
		CatalogMain: () => import('@/components/Catalog/Main'),
		ListsGenerations: () => import('@/components/Lists/Generations'),
		Filters: () => import(/* webpackChunkName: "filters" */ '~/components/Filters'),
	},
	mixins: [seoTags, validateCategory],
}
</script>