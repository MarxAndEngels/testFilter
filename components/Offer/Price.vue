<template>
	<div class="offer__price">
		<div class="offer__price-actual">
			{{ offer.price | numberFormat }} ₽*
		</div>
		<div class="offer__price-old">
			{{ offer.price_old | numberFormat }} ₽
		</div>
		<div class="offer__price-text">
			<span>{{ creditPrice | numberFormat }} ₽/мес.</span>
			без взноса
		</div>
		<div class="offer__price-credit">
			*Цена актуальна при покупке в кредит
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import filters from "@/mixins/filters";
export default {
	props: {
		offer: Object
	},
	mixins: [
		filters
	],
	computed:{
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			settings: 'settings/settings',
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