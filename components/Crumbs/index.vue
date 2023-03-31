<template>
	<div class="crumbs">
		<ul class="crumbs__list" v-if="crumbs">
			
			<crumbs-item v-for="(item, index) in crumbs"
			             :key="index"
			             :disabled="index === crumbs.length - 1 "
			             :crumb="item" />
		</ul>
	</div>

</template>
<script>
import {mapGetters} from "vuex";

export default {
	components: {
		CrumbsItem: () => import('@/components/Crumbs/Item'),
	},
	computed: {
		...mapGetters({
			crumbs: 'crumbs/crumbs'
		})
	}
}
</script>