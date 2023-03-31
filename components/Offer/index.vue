<template>
	<div class="offer">
		<client-only>
			<benefits-credit class="benefits--offer" />
		</client-only>
		<offer-title :offer="offer" />
		<offer-info :offer="offer" v-if="$device.isMobile"/>
		<div class="offer__top">
			<div class="offer__top-item offer__top-item--left">
				<offer-slider :images="offer.images" />
			</div>
			<div class="offer__top-item offer__top-item--right">
				<div class="offer__top-item__middle">
					<offer-about />
					<offer-price :offer="offer" />
				<offer-controls :offer="offer" />
				</div>

				<div class="offer__top-item__bottom">
				<offer-tech :offer="offer" />
				<offer-complectation :offer="offer" />
			</div>
			</div>
		</div>
		
	

		<offer-map />
		<offer-similar :offer="offer" />
	</div>
</template>

<script>

export default {
	components: {
		BenefitsCredit: () => import(/* webpackChunkName: "benefits-credit" */ '~/components/Benefits/Credit'),
		OfferSlider: () => import(/* webpackChunkName: "offer-slider" */ '~/components/Offer/Slider'),
		OfferTitle: () => import(/* webpackChunkName: "offer-title" */ '~/components/Offer/Title'),
		OfferInfo: () => import(/* webpackChunkName: "offer-title" */ '~/components/Offer/Info'),
		OfferAbout: () => import(/* webpackChunkName: "offer-title" */ '~/components/Offer/About'),
		OfferPrice: () => import(/* webpackChunkName: "offer-price" */ '~/components/Offer/Price'),
		OfferControls: () => import(/* webpackChunkName: "offer-controls" */ '~/components/Offer/Controls'),
		OfferTech: () => import(/* webpackChunkName: "offer-tech" */ '~/components/Offer/Tech'),
		OfferComplectation: () => import(/* webpackChunkName: "offer-complectation" */ '~/components/Offer/Complectation'),
		OfferMap: () => import(/* webpackChunkName: "offer-map" */ '~/components/Offer/Map'),
		OfferSimilar: () => import(/* webpackChunkName: "offer-similar" */ '~/components/Offer/Similar')
	},
	props: {
		offer: Object
	}
}
</script>