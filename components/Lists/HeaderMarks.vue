<template>
	<div class="list list__header">
				<nuxt-link class="list__tab list__tab--header"
				           :title="item.title"
				           @click.native="setMarksModal(false)"
				           :to="`/${catalogRoute}/${item.slug}`"
				           :class="{'list__tab--active':$route.params.mark === item.slug}"
				           v-for="item in popularMarks"
				           :key='item.id'>
					<div class="list__tab-name list__tab-name--header">{{ item.title }}</div>
					<div class="list__tab-number list__tab-number--header">{{ item.offers_count }}</div>
				</nuxt-link>
	</div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
	data() {
		return {
			full: false
		}
	},
	methods:{
		...mapMutations({
			setMarksModal: 'modal/SET_MARKS_MODAL'
		})
	},
	computed: {
		...mapGetters({
			popularMarks: 'marks/popularMarks',
			catalogRoute: 'settings/catalogRoute'
		})
	}
}
</script>