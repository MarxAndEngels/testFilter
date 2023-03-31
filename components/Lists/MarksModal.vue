<template>
	<div ref="marks">
		<div class="list list__marks">
			<nuxt-link class="list__tab list__tab--mark"
			           @click.native="setMarksModal(false)"
			           :to="`/${catalogRoute}/${item.slug}`"
			           :class="{'list__tab--active':$route.params.mark === item.slug}"
			           v-for="item in marks"
			           :key='item.id'>
				<div class="list__tab-name">{{ item.title }}</div>
				<div class="list__tab-number">{{ item.offers_count }}</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
	computed: {
		...mapGetters({
			marks: 'marks/marks',
			catalogRoute: 'settings/catalogRoute'
		})
	},
	methods: {
		...mapMutations({
			setMarksModal: 'modal/SET_MARKS_MODAL'
		})
	}
}
</script>