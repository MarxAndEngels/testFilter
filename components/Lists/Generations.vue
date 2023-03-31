<template>
	<div class="list list__generations">
		<nuxt-link
				class="list__tab"
				:to="`/${catalogRoute}/${currentMark.slug}/${currentFolder.slug}/${generation.slug}`"
				v-for="generation in generations"
				:class="{'list__tab--active':$route.params.generation === generation.slug}"
				:key="generation.id">
			<div class="list__tab-name">{{ generation.name }}
				<span>[{{ generation.year_begin }} - {{ generation.year_end || ' н.в.' }}]</span>
			</div>
			<div class="list__tab-number">{{ generation.offers_count }}</div>
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
		currentMark() {
			return this.marks.find(item => item.slug === this.$route.params.mark)
		},
		currentFolder() {
			return this.currentMark?.folders?.find(item => item.slug === this.$route.params.folder)
		},
		generations() {
			return this.currentFolder.generations || []
		}
	}
}
</script>