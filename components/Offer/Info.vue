<template>
	<div class="offer__info">
		<div class="offer__status offer__status--active">
			<div class="offer__status-text">Автомобиль в наличии</div>
		</div>
		<a :href="`tel:${settings.phone}`"
		   class="offer__info-phone">
			{{ settings.phone }}
		</a>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	props: {
		offer: Object
	},
	computed:{
		...mapGetters({
			settings: 'settings/settings',
		}),
	}
}
</script>