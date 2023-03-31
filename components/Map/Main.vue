<template>
	<div class="map" v-if="settings.coordinates">
		<client-only>
			<yandex-map
					v-if="ready"
					:coords="settings.coordinates.split(',')"
					zoom="15"
					style="width: 100%; height: 480px;"
					:controls="['trafficControl']"
			>
				<ymap-marker
						marker-id="1"
						marker-type="placemark"
						:coords="settings.coordinates.split(',')"
				></ymap-marker>
			</yandex-map>
			<!--<div v-else class="map__loader">-->
			<!--	<loader large/>-->
			<!--</div>-->
		</client-only>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	// components:{
	// 	Loader: () => import('@/components/loader/loader')
	// },
	data() {
		return {
			ready: false
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	},
	mounted() {
		setTimeout(() => {
			this.ready = true
		}, 500)
	}
}
</script>