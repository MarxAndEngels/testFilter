<template>
	<div ref="marks">
		<lists-marks-popular :popularMarks="popularMarks"/>
		<div class="list list__marks list__marks--desktop">
			<nuxt-link class="list__tab list__tab--mark"
			           :to="`/${catalogRoute}/${item.slug}`"
			           :class="{'list__tab--active':$route.params.mark === item.slug}"
			           v-for="item in mark_list_desktop"
			           :key='item.id'>
				<div class="list__tab-name">{{ item.title }}</div>
				<div class="list__tab-number">{{ item.offers_count }}</div>
			</nuxt-link>
		</div>
		<div class="list list__marks list__marks--mobile">
			<nuxt-link class="list__tab list__tab--mark"
			           :to="`/${catalogRoute}/${item.slug}`"
			           :class="{'active':$route.params.mark === item.slug}"
			           v-for="item in mark_list_mobile"
			           :key='item.id'>
				<div class="list__tab-name">{{ item.title }}</div>
				<div class="list__tab-number">{{ item.offers_count }}</div>
			</nuxt-link>
		</div>
		<div class="button button--more"
		     @click="full = !full">
			{{ full ? 'Показать меньше' : 'Показать больше' }}
		</div>
	</div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
	data() {
		return {
			full: false
		}
	},
	components: {
		ListsMarksPopular: () => import(/* webpackChunkName: "catalog-offer" */ '~/components/Lists/MarksPopular'),
	},
	computed: {
		...mapGetters({
			marks: 'marks/marks',
			catalogRoute: 'settings/catalogRoute',
			popularMarks: 'marks/popularMarks',
		}),
		mark_list_desktop() {
			let marks = [...this.marks]
			if (!this.full) {
				let marksShowNumber = 24
				marks = marks.sort((a, b) => parseFloat(b.offers_count) - parseFloat(a.offers_count))
				marks = marks.slice(0, marksShowNumber)
				marks = marks.sort((a, b) => a.slug.toLowerCase().localeCompare(b.slug.toLowerCase()))
				return marks
			} else {
				return marks
			}
		},
		mark_list_mobile() {
			let marks = [...this.marks]
			if (!this.full) {
				let marksShowNumber = 10
				marks = marks.sort((a, b) => parseFloat(b.offers_count) - parseFloat(a.offers_count))
				marks = marks.slice(0, marksShowNumber)
				marks = marks.sort((a, b) => a.slug.toLowerCase().localeCompare(b.slug.toLowerCase()))
				return marks
			} else {
				return marks
			}
		}
	}
}
</script>