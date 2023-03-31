<template>
	<div class="catalog__view">
		<svg-icon name="view-long"
		          @click="setView('long')"
		          :class="{'catalog__view-item--active': view === 'long'}"
		          class="catalog__view-item" />
		<svg-icon name="view-short"
		          @click="setView('short')"
		          :class="{'catalog__view-item--active': view === 'short'}"
		          class="catalog__view-item" />
	</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	computed: {
		...mapGetters({
			view: 'view/view'
		})
	},
	methods: {
		...mapMutations({
			setView: 'view/SET_VIEW'
		})
	}
}
</script>