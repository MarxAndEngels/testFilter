<template>
	<div>
		<LazyHydrate when-visible>
			<offer :offer="offer"
			       v-if="offer" />
			<skeleton-offer v-else
			                page />
		</LazyHydrate>
	</div>
</template>
<script>
import seoTags from "@/mixins/seoTags";
import validateCategory from "@/mixins/validateCategory";
import LazyHydrate from "vue-lazy-hydration";
import requests from "@/mixins/requests";

export default {
	mixins: [seoTags, validateCategory, requests],
	data() {
		return {
			offer: null
		}
	},
	components: {
		LazyHydrate,
		Offer: () => import('@/components/Offer'),
		SkeletonOffer: () => import('@/components/Skeleton/Offer')
	},
	async fetch() {
		let variables = {
			dateFormat: 'j F Y года.',
			mark_slug: this.$route.params.mark,
			folder_slug: this.$route.params.folder,
			external_id: Number(this.$route.params.id)
		}
		await this.getOffer(variables).then(response => {
			//TODO сделал then для скролла к каталогу после загрузки
			this.offer = response
		})
	},
	methods: {
		sendYandexCommercial() {
			if (process.client) {
				dataLayer.push({
					"ecommerce": {
						"detail": {
							"products": [
								{
									"id": this.offer.external_id,
									"name": `${this.offer.mark.title} ${this.offer.folder.title}, ${this.offer.year} года, ${this.offer.gearbox.title} ${this.offer.price} руб. - ${this.offer.external_id}`,
									"price": this.offer.price,
									"brand": this.offer.mark.title,
									"category": `'С пробегом/${this.offer.mark.title}/${this.offer.folder.title}/${this.offer.name}`,
									"quantity": 1
								}
							]
						}
					}
				})
			}
		},
	},
	mounted() {
		setTimeout(() => {
			// this.loading = false
			this.sendYandexCommercial()
		}, 1000)
		if (this.offer) {
			_tmr.push({
				type: 'itemView',
				productid: this.offer.external_id,
				pagetype: 'product',
				list: this.settings.mytarget_list_id || '1',
				totalvalue: this.offer.price
			})
		}
	},
}
</script>