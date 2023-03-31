<template>
	<div ref="carousel"
	     class="carousel carousel--banks">
		<div class="carousel__slide carousel__slide--banks"
		     v-for="(bank,index) in banks"
		     :key="index">
			<img class="bank__logo lazyload" loading="lazy" :data-src="'img/banks/'+ bank +'-bank.svg'" alt="bank">
		</div>
	</div>
</template>

<script>
import {Carousel} from "@fancyapps/ui";

export default {
	data() {
		return {
			banks: [
				"tinkoff",
				"alfa",
				"sber",
				"avangard",
				"center-invest",
				"east",
				"expert",
				"expo",
				"gazprom",
				"hamkor",
				"home-credit",
				"kapital",
				"mkb",
				"open",
				"otb",
				"plus",
				"pochta",
				"promsvaz",
				"reiffeisen",
				"renessans",
				"ros",
			]
		}
	},
	mounted() {
		const carousel = new Carousel(this.$refs.carousel, {
			center: true,
		});
	}
}
</script>