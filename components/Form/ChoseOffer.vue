<template>
	<div class="form__controls-group">
		<div class="heading heading--h3">
			Выбор автомобиля
		</div>
		<div v-if="!this.offer"
		     class="input__wrapper">
			<form-select :items="marks"
			             :current-data="chosenMark"
			             title="Марка"
			             @selected="markSelect"
			             class="select" />
		</div>
		<div v-if="!this.offer" class="input__wrapper">
			<form-select :items="folders"
			             :current-data="chosenFolder"
			             title="Модель"
			             :disabled="folders.length === 0"
			             @selected="folderSelect"
			             class="select" />
		</div>
		<div class="form__controls-offers"
		     v-if="offers.length && !this.offer">
			<form-offer v-for="offer in offers"
			            :key="offer.id"
			            @click="choseOffer(offer)"
			            :offer="offer" />
			<client-only>
				<infinite-loading :identifier="infiniteId"
				                  @infinite="getOffers"
				                  :throttle-limit="2500">
					<!--<div slot="spinner">-->
					<!--	<div class="catalog__list grid grid&#45;&#45;catalog">-->
					<!--		<component :is="skeleton"-->
					<!--		           v-for="i in 4"-->
					<!--		           :key="i" />-->
					<!--	</div>-->
					<!--</div>-->
					<div slot="no-more"></div>
					<div slot="no-results"></div>
				</infinite-loading>
			</client-only>
		</div>
		<form-offer v-if="offer"
		            @delete="$emit('chose', null)"
		            chosen :offer="offer" />
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import requests from "@/mixins/requests";
import offers from "@/apollo/queries/offer/offers";

export default {
	components: {
		FormSelect: () => import(/* webpackChunkName: "form-select" */ '~/components/Form/Select'),
		FormOffer: () => import(/* webpackChunkName: "form-offer" */ '~/components/Form/Offer'),
	},
	props: {
		offer: Object
	},
	mixins: [requests],
	data() {
		return {
			chosenMark: null,
			chosenFolder: null,
			chosenOffer: null,
			folders: [],
			offers: [],
			page: 1,
			limit: 8,
			infiniteId: +new Date()
		}
	},
	
	computed: {
		...mapGetters({
			marks: 'marks/marks'
		})
	},
	methods: {
		async markSelect(option) {
			await this.$emit('chose', null)
			this.chosenMark = option
			this.chosenFolder = null
			this.offers = []
			this.folders = option.folders
			this.error = ''
			
		},
		async folderSelect(option) {
			await this.$emit('chose', null)
			this.chosenFolder = option
			this.error = ''
			this.page = 1
			await this.getOffers()
			
		},
		async choseOffer(offer) {
			await this.$emit('chose', offer)
			this.error = ''
		},
		async getOffers($state) {
			// await this.$store.commit('modal/modal-choose/SET_LOADING', true)
			let response = await this.request(
					{
						query: offers,
						variables: {
							page: this.page,
							limit: this.limit,
							mark_slug_array: [this.chosenMark.slug],
							folder_slug_array: [this.chosenFolder.slug]
						}
					})
			if (response.data.offers.data.length) {
				this.page += 1
				this.offers.push(...response.data.offers.data)
				if ($state) {
					$state.loaded()
				}
			} else {
				if ($state) {
					$state.complete()
				}
			}
			// // commit('SET_OFFERS', cars.data.offers.data)
			// await this.$store.commit('modal/modal-choose/SET_LOADING', false)
		},
	}
}
</script>