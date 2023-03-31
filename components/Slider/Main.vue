<template>
	<div ref="carousel"
	     class="carousel carousel--main">
		<div class="carousel__slide carousel__slide--main"
		     v-for="(slide, index) in slides"
		     :key="index">
			<div class="carousel__slide-element">
				<img class="lazyload" loading="lazy" :class="{'carousel__slide-element_little': index== 2}" :data-src="`img/sliders/main/${slide.element}`">
			</div>
			<div class="carousel__slide-content">
				<div class="carousel__slide-title" v-html="slide.title"></div>
				<div class="carousel__slide-text" v-if="slide.text" v-html="slide.text"></div>
				<nuxt-link :to="`/${slide.slug}`"
				           class="button button--slider">
					<span> {{ slide.button }}</span>
					<svg-icon name="arrow-right-white" />
				</nuxt-link>
			</div>
			
			<img class="lazyload" loading="lazy" :data-src="`img/sliders/main/${slide.image}`">
		</div>
	</div>
</template>

<script>
import {Carousel} from "@fancyapps/ui";
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			catalogRoute: 'settings/catalogRoute'
		}),
		slides() {
			return [
				{
					title: `Предоставляем надежные автомобили с выгодными условиями`,
					text: 'Наш автосалон предоставляет своим клиентам только автомобили, прошедшие тщательную юредическую и техническую проверку',
					image: 'slider-index-8.png',
					slug: this.catalogRoute,
					button: 'Выбрать автомобиль',
					element:'chery_car.webp'
				},
				{
					title: `Скидка при покупке в кредит <br/> ${this.settings.sale_credit} ₽`,
					text: 'При покупке авто в кредит',
					image: 'slider-index-2.png',
					slug: this.catalogRoute,
					button: 'Выбрать автомобиль',
					element:'chery_car_2.webp'
				},
				{
					title: `Trade-in со скидкой <br/> ${this.settings.sale_tradein} ₽`,
					text: '',
					slug: 'trade-in',
					button: 'Выбрать автомобиль',
					image: 'slider-index-4.webp',
					element:'chery_car_2.webp'
				},
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