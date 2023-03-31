<template>
	<div class="slider">
		<client-only>
			<carousel :dots="false" :nav="true" loop :responsive="{0:{items:1},748:{items:2}}"
				:margin="16">
				<div class="slide" v-for="number of count" :key="number" v-if="number > limit">
					<img class="slide_image_about"
                    data-fancybox="gallery"
                    :src="require('~/static/img/about/slider-dealer-'+ number +'.webp')" alt="gallery">
				</div>
			</carousel>
		</client-only>
	</div>
</template>
<script>
export default {
 props: {
		limit: {
			type: Number,
			default: 1
		},
		count: {
			type: Number,
			default: 12
		}
	},
}
</script>
