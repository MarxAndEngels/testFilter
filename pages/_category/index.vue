<template>
	<div>
		<h1 class="heading heading--h1">{{pageTitle}}</h1>
		<LazyHydrate when-visible>
			<lists-marks />
		</LazyHydrate>
		<LazyHydrate when-visible>
			<filters />
		</LazyHydrate>
		<catalog-main show-sort
		              show-view />
	</div>
</template>
<script>
import seoTags from "@/mixins/seoTags";
import validateCategory from "@/mixins/validateCategory";
import requests from "@/mixins/requests";
import LazyHydrate from "vue-lazy-hydration";
import {mapGetters} from "vuex";

export default {
	components: {
		LazyHydrate,
		CatalogMain: () => import('~/components/Catalog/Main'),
		ListsMarks: () => import('~/components/Lists/Marks'),
		Filters: () => import(/* webpackChunkName: "filters" */ '~/components/Filters'),
	},
	mixins: [seoTags, validateCategory],
}
</script>