<template>
	<div class="offer__about_dealer">
            <div class="offer__status offer__status--active">
			<div class="offer__status-text">Автомобиль в наличии</div>
		</div>
		<a :href="`tel:${settings.phone}`"
		   class="offer__about_dealer_item">
			{{ settings.phone }}
		</a>
        <div    class="offer__about_dealer_item">
            {{ settings.address }}
        </div>
        <div    class="offer__about_dealer_item">
            {{ settings.work_schedule }}
        </div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	computed:{
		...mapGetters({
			settings: 'settings/settings',
		}),
	}
}
</script>