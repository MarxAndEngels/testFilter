<template>
	<div class="list list__folders">
		<nuxt-link
				class="list__tab"
				:to="`/${catalogRoute}/${$route.params.mark}/${folder.slug}`"
				v-for="folder in folders"
				:key="folder.id">
			<div class="list__tab-name">{{ folder.title }}</div>
			<div class="list__tab-number">{{ folder.offers_count }}</div>
		</nuxt-link>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			marks: 'marks/marks',
			catalogRoute: 'settings/catalogRoute'
		}),
		folders() {
			let currentMark = this.marks.find(item => item.slug === this.$route.params.mark)
			return currentMark.folders
		}
	}
}
</script>