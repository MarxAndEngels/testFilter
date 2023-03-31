<template>
	<div class="callback__modal"
	     :class="{'callback__modal--short':short}"
	     @click="callbackClick"
	     v-if="open">
		<svg-icon class="callback__modal-close"
		          @click="open = false"
		          name="close" />
		<span class="callback__modal-text">
			Обратный звонок
		</span>
		<svg-icon class="callback__modal-phone"
		          name="phone" />
	</div>
</template>

<script>
import modals from "@/mixins/modals";

export default {
	mixins: [modals],
	data() {
		return {
			open: true,
			short: false
		}
	},
	mounted() {
		setTimeout(() => {
			this.short = true
		}, 2500)
	},
	methods: {
		async callbackClick() {
			let modalParams = {
				open: true,
				title: `Заявка на обратный звонок`,
				subtitle: 'Наш менеджер перезвонит Вам',
				type: 'form-callback'
			}
			await this.openModal(modalParams)
		}
	}
}
</script>