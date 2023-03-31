<template>
	<div class="application">
		<benefits-credit />
		<!--<h1 class="h1__title">{{ pageTitle }}</h1>-->
		<h1 class="heading heading--h1">{{ pageTitle }}</h1>
		<div class="application__line">
			<form-credit-page class="application__block"/>
			<text-credit class="application__block"/>
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
		BenefitsCredit: () => import(/* webpackChunkName: "benefits-credit" */ '~/components/Benefits/Credit'),
		SliderBanks: () => import(/* webpackChunkName: "slider-banks" */ '~/components/Slider/Banks'),
		FormCreditPage: () => import(/* webpackChunkName: "form-credit-page" */ '~/components/Form/CreditPage'),
		TextCredit: () => import(/* webpackChunkName: "text-credit" */'~/components/Text/Credit')
	},
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>