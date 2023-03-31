<template>
	<div>
		<h1 class="heading heading--h1">{{pageTitle}}</h1>
		<LazyHydrate when-visible>
			<lists-folders />
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

export default {
	components: {
		LazyHydrate,
		CatalogMain: () => import('~/components/Catalog/Main'),
		ListsFolders: () => import('@/components/Lists/Folders'),
		Filters: () => import(/* webpackChunkName: "filters" */ '~/components/Filters'),
	},
	mixins: [seoTags, validateCategory]
}
</script>