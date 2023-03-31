<template>
	<div ref="carousel"
	     class="carousel offer__slider">
		<div class="carousel__slide carousel__slide--offer"
		     v-for="(img, index) in images"
		     :key="index">
			<img class="offer__page-slide lazyload"
			     loading="lazy"
			     :src="img.medium_webp"
			     :data-src="img.original"
			     data-fancybox="gallery"
			     alt="фото автомобиля" />
		</div>
	</div>
</template>

<script>
import {Carousel} from "@fancyapps/ui";

export default {
	props: {
		images: Array
	},
	mounted() {
		const carousel = new Carousel(this.$refs.carousel, {
			center: true
		});
	}
}
</script>