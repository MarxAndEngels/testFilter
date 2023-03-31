<template>
	<div class="form__offer">
		<svg-icon v-if="chosen" @click="$emit('delete')" class="form__offer-delete" name="close"/>
		<div class="form__offer-line">
			<div class="form__offer-images">
				<img class="form__offer-img"
				     v-for="image in offer.images"
				     :key="image.small_webp"
				     data-fancybox="gallery"
				     :data-src="image.original"
				     alt="img"
				     :src="image.small_webp" />
			</div>
			<div @click="$emit('click')"
			     class="form__offer-title-wrapper">
				<div class="form__offer-title">
					{{ offer.name }}
				</div>
				<div class="form__offer-price">
					<div class="form__offer-price-actual">
						{{ offer.price | numberFormat }} ₽
					</div>
					<div class="form__offer-price-credit">
						{{ creditPrice | numberFormat }} ₽/мес
					</div>
				</div>
			</div>
		</div>
	
	
	</div>
</template>

<script>
import filters from "@/mixins/filters";
import {mapGetters} from "vuex";

export default {
	props: {
		offer: Object,
		chosen: Boolean
	},
	mixins: [
		filters
	],
	computed: {
		...mapGetters({
			settings: "settings/settings"
		}),
		creditPrice() {
			let percent = Number(this.settings.credit_percent.split('%')[0]);
			let n = 84;
			let coef_i = percent / 12 / 100;
			let K = (coef_i * Math.pow(1 + coef_i, n)) / (Math.pow(1 + coef_i, n) - 1);
			return Math.round(K * this.offer.price);
		}
	}
}
</script>