<template>
	<div class="application">
		<benefits-exchange class="benefits--form" />
		<!--<h1 class="h1__title">{{ pageTitle }}</h1>-->
		<h1 class="heading heading--h1">{{ pageTitle }}</h1>
		<div class="application__line">
			<form-exchange-page class="application__block" />
			<text-exchange class="application__block" />
		</div>
		<slider-banks />
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";

export default {
	mixins: [seoTags],
	components: {
		BenefitsExchange: () => import(/* webpackChunkName: "benefits-credit" */ '~/components/Benefits/Exchange'),
		SliderBanks: () => import(/* webpackChunkName: "slider-banks" */ '~/components/Slider/Banks'),
		FormExchangePage: () => import(/* webpackChunkName: "form-exchange-page" */ '~/components/Form/ExchangePage'),
		TextExchange: () => import(/* webpackChunkName: "text-exchange" */'~/components/Text/Exchange')
	},
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>