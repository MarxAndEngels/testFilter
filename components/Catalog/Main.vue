<template>
	<div class="catalog"
	     id="catalog">
		<catalog-controls v-if="showSort || showView"
		                  @sort="changeSort"
		                  :show-sort="showSort"
		                  :show-view="showView" />
		<div class="catalog__offers"
		     v-if="offers && !loading"
		     :class="`catalog__offers--${defaultView || view}`">
			<catalog-offer v-for="offer in offers.data"
			               :offer="offer"
			               :key="offer.id" />
			<h2 v-if="offers.data.length == 0">Ничего не найдено</h2>
		</div>
		<div v-else
		     class="catalog--skeleton">
			<skeleton-offer v-for="(i, index) in 12"
			                :key="index" />
		</div>
		<client-only>
			<paginate
					v-if="showPagination && offers"
					v-model="currentPagination"
					:page-count="offers.last_page"
					:click-handler="paginateClick"
					:prev-text="'Назад'"
					:next-text="'Вперед'"
					:container-class="'pagination'">
			</paginate>
		</client-only>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import requests from "@/mixins/requests";

export default {
	name: 'CatalogMain',
	components: {
		CatalogOffer: () => import(/* webpackChunkName: "catalog-offer" */ '~/components/Catalog/Offer'),
		CatalogControls: () => import(/* webpackChunkName: "catalog-view" */ '~/components/Catalog/Controls'),
		SkeletonOffer: () => import(/* webpackChunkName: "skeleton-offer" */ '~/components/Skeleton/Offer')
	},
	data() {
		return {
			offers: null,
			loading: true
		}
	},
	watch: {
		async '$route'() {
			this.loading = true
			this.offers = await this.getOffers(this.fetchVariables)
			this.loading = false
		}
	},
	mixins: [requests],
	computed: {
		...mapGetters({
			view: 'view/view'
		}),
		currentPagination: {
			get() {
				return Number(this.$route.query.page || 1)
			},
			set(pageNum) {
				this.$router.push({query: {page: pageNum}});
			}
		},
		currentPriceFrom() {
		return Number(this.$route.query.price_from) || null
		},
		fetchVariables() {
			if (this.isIndex) {
				return {
					page: 1,
					limit: 8,
					dateFormat: 'j F Y года.',
					sort: 'created_at|desc'
				}
			} else {
				return {
					mark_slug_array: this.$route.params.mark ? [this.$route.params.mark] : null,
					folder_slug_array: this.$route.params.folder ? [this.$route.params.folder] : null,
					generation_slug_array: this.$route.params.generation ? [this.$route.params.generation] : null,
					gearbox_id_array: this.$route.query.gearbox ? [Number(this.$route.query.gearbox)] : null,
					body_type_id_array: this.$route.query.bodyType ? [Number(this.$route.query.bodyType)] : null,
					engine_type_id_array: this.$route.query.engineType ? [Number(this.$route.query.engineType)] : null,
					sort: this.sort ? this.sort : this.$route.query.sort ? this.$route.query.sort : null,
					set: this.set ? this.set : this.$route.query.set ? this.$route.query.set : null,
					year_from: Number(this.$route.query.yearFrom),
					page: Number(this.$route.query.page) || 1,
					price_from: this.currentPriceFrom,
					limit: 12,
					dateFormat: 'j F Y года.'
				}
			}
		}
	},
	props: {
		showView: Boolean,
		showSort: Boolean,
		showPagination: {
			type: Boolean,
			default: true
		},
		defaultView: String,
		isIndex: Boolean
	},
	methods: {
		async paginateClick(page) {
			await this.$router.push({path: this.$route.fullPath, query: {page: page}});
			await this.scrollToCatalog()
		},
		async changeSort() {
			await this.scrollToCatalog()
		},
		scrollToCatalog() {
			let options = {
				duration: 0,
				offset: -98,
				force: true
			}
			setTimeout(() => {
				this.$scrollTo('#catalog', options)
			}, 25)
			
		}
	},
	async fetch() {
		this.offers = await this.getOffers(this.fetchVariables)
		this.loading = false
	},
	mounted() {
		if (this.$route.name === 'category-mark-folder-generation') {
			this.scrollToCatalog()
		}
	}
}
</script>