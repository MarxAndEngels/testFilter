<template>
	<div class="offer__controls">
		<div class="button button--credit button--credit-offer" @click="onCredit">
			Купить в кредит
		</div>
		<div class="button button--trade-in" @click="onExchange">
			Trade-in
		</div>
		<div class="button button--autoteka" @click="onAutoteka">
			<svg-icon name="autoteka" />
			<span>Проверить 
				<span class="button--autoteka_sub-text">
					по автотеке
				</span>
			</span>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	props: {
		offer: Object
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		}),
	},
	methods:{
		...mapActions({
			openModal: 'modal/openModal'
		}),
		async onCredit() {
			let modalParams = {
				open: true,
				title:`Автокредит от ${this.settings.credit_percent}`,
				subtitle: `${this.offer.name}`,
				type: 'form-credit-modal',
				offer: this.offer
			}
			await this.openModal(modalParams)
		},
		async onExchange() {
			let modalParams = {
				open: true,
				title:`Выгодный Trade-in`,
				subtitle: `${this.offer.name}`,
				type: 'form-exchange-modal',
				offer: this.offer
			}
			await this.openModal(modalParams)
		},
		async onAutoteka() {
			let modalParams = {
				open: true,
				title:`Автотека`,
				type: 'autoteka',
				offer: this.offer
			}
			await this.openModal(modalParams)
		},
	}
}
</script>