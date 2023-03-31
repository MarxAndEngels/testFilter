<template>
	<div class="benefits">
		<div class="benefits__desktop">
			<div class="benefits__item" v-for="(benefit, index) in benefits" :key="index">
				<svg-icon :name="`benefits/${benefit.slug}`"/>
				<span>{{benefit.text}}</span>
			</div>
		</div>
		<div class="benefits__mobile carousel" ref="carousel">
			<div class="benefits__item carousel__slide" v-for="(benefit, index) in benefits" :key="index">
				<svg-icon :name="`benefits/${benefit.slug}`"/>
				<span>{{benefit.text}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import {Carousel} from "@fancyapps/ui";

export default {
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		}),
		benefits(){
			return [
				{
					slug:'guarantee',
					text:'Гарантия 1 год от автосалона',
				},
				{
					slug:'docs',
					text:'По паспорту и правам',
				},
				{
					slug:'credit-sale',
					text:'Скидка '+this.settings.sale_credit + ' ₽',
				},
				{
					slug:'percent',
					text:'Первый взнос от 0%',
				}
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