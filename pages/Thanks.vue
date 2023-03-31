<template>
	<div class="application">
		<h1 class="heading heading--h1">{{ pageTitle }}</h1>
		<div class="text_wrapper">
			<p class="text__p">
				Наш менеджер перезвонит Вам в ближайшее время.
			</p>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";

export default {
	// validate(ctx) {
	// 	return ctx.store.getters['thanks/feedbackId']
	// },
	// mixins: [seoTags],
	computed: {
		...mapGetters({
			settings: "settings/settings",
			feedbackId: 'thanks/feedbackId',
			thanksOffer: 'thanks/thanksOffer'
		})
	},
	methods: {
		sendYandexCommercial() {
			if (process.client) {
				dataLayer.push({
					"ecommerce": {
						"purchase": {
							"actionField": {
								"id": this.feedbackId,
								"goal_id": this.settings.goal_id,
							},
							"products": [
								{
									"id": this.thanksOffer.external_id,
									"name": `${this.thanksOffer.mark.title} ${this.thanksOffer.folder.title}, ${this.thanksOffer.year} года, ${this.thanksOffer.gearbox.title} ${this.thanksOffer.price} руб. - ${this.thanksOffer.external_id}`,
									"price": this.thanksOffer.price,
									"brand": this.thanksOffer.mark.title,
									"category": `'С пробегом/${this.thanksOffer.mark.title}/${this.thanksOffer.folder.title}/${this.thanksOffer.name}`,
									"quantity": 1
								}
							]
						}
					}
				})
			}
		}
	},
	mounted() {
		setTimeout(() => {
			if (this.thanksOffer) {
				this.sendYandexCommercial()
				_tmr.push({
					type: 'itemView',
					productid: this.thanksOffer.external_id,
					pagetype: 'product',
					list: this.settings.mytarget_list_id || '1',
					totalvalue: this.thanksOffer.price
				})
			}
		}, 500)
	}
}
</script>