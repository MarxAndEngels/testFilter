<template>
	<nuxt-link :to="`/${catalogRoute}/${back.slug}`"
	           v-if="back"
	           class="header__back">
		<svg-icon name="icon-arrow" />
		<span>{{ back.title }}</span>
	</nuxt-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			marks: 'marks/marks'
		}),
		back() {
			if (this.$route.params.folder) {
				let mark = this.marks.find(item => item.slug === this.$route.params.mark)
				return {
					slug: mark.slug,
					title: `Все модели ${mark.title}`
				}
			} else {
				return false
			}
		}
	}
}
</script>