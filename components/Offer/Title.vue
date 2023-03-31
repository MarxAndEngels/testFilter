<template>
	<div class="offer__title">
		<div class="offer__title-mark">{{ offer.mark.title }}</div>
		<div class="offer__title-folder">{{ offer.folder.title }}</div>
		<div class="offer__title-generation">{{ offer.generation.name }}</div>
		<div class="offer__title-engine">{{ offer.engine_volume }}</div>
		<div class="offer__title-gearbox">{{ offer.gearbox.title_short_rus }}</div>
		<div class="offer__title-power">({{ offer.engine_power }} л.с.)</div>
		<div class="offer__title-year">{{ offer.year }} года</div>
		<div class="offer__title-run">с пробегом {{ offer.run | numberFormat }} км.</div>
	</div>
</template>

<script>
import filters from "@/mixins/filters";

export default {
	props: {
		offer: Object
	},
	mixins: [
		filters
	]
}
</script>