<template>
	<div class="offer__tech">
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-mileage" />
			<span>{{ offer.run | numberFormat }} км</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-volume" />
			<span>{{ offer.engine_volume }} л.</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-engine" />
			<span>{{ offer.engine_power }} л.с.</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-gear" />
			<span>{{ offer.gearbox.title }}</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-fuel" />
			<span> {{ offer.engineType.title }}</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-owners" />
			<span> {{ offer.owner.title }}</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-form" />
			<span> {{ offer.bodyType.title }}</span>
		</div>
		<div class="offer__tech-item">
			<svg-icon name="tech/icon-wd" />
			<span>{{ offer.driveType.title }}</span>
		</div>
		<div class="offer__tech-item">
			<span class="offer__tech-item-color"
			      :style="{backgroundColor:offer.color.name}"></span>
			<span>
				{{offer.color.title}}
			</span>
		</div>
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