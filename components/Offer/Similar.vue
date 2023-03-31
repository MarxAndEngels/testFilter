<template>
	<div class="offer__similar"
	     v-if="offers && offers.data.length">
		<h2 class="h2__title">
			Похожие автомобили
		</h2>
		<div class="catalog__offers catalog__offers--short">
			<catalog-offer :offer="c_offer"
			               v-for="c_offer in offers.data" :key="c_offer.id"/>
		</div>
	</div>
</template>

<script>
import requests from "@/mixins/requests";

export default {
	data() {
		return {
			offers: null
		}
	},
	components: {
		CatalogOffer: () => import('@/components/Catalog/Offer')
	},
	mixins: [requests],
	props: {
		offer: Object
	},
	async mounted() {
		let formData = {
			mark_slug_array: this.$route.params.mark ? [this.$route.params.mark] : null,
			except_external_id: Number(this.$route.params.id),
			folder_slug_array: this.$route.params.folder ? [this.$route.params.folder] : null,
			limit: 8
		}
		try {
			this.offers = await this.getOffers(formData)
		} catch (error) {
			console.log(error)
		}
		
	}
}
</script>