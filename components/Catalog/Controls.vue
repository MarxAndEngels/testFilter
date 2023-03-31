<template>
	<div class="catalog__controls">
		<catalog-sort
				@sort="$emit('sort')"
				v-if="showSort" />
		<catalog-view
				v-if="showView" />
	</div>

</template>

<script>

export default {
	components: {
		CatalogView: () => import(/* webpackChunkName: "catalog-view" */ '~/components/Catalog/View'),
		CatalogSort: () => import(/* webpackChunkName: "catalog-sort" */ '~/components/Catalog/Sort'),
	},
	props: {
		showView: {
			type: Boolean,
			default: false
		},
		showSort: {
			type: Boolean,
			default: false
		}
	},
}
</script>