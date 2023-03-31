<template>
	<div class="modal">
		<div class="modal__back" @click="closeModal"></div>
		<div class="modal__content">
			<div class="modal__header">
				<svg-icon class="modal__close" name="close" @click="closeModal" />
				<div class="modal__title-wrapper">
					<div class="heading heading--h2" v-if="modal.title">
						<div v-if="modal.title === 'Автотека'">
							<img class="autoteka__logo" src="~/static/img/autoteka/autoteka.svg" alt="autoteka">
						</div>
						<div v-else>
							{{ modal.title }}
						</div>
					</div>
					<div class="heading heading--h3 heading--h3-mt" v-if="modal.subtitle">{{ modal.subtitle }}
					</div>
				</div>
			</div>
			<div class="modal__body">
				<component :is="modalComponent" :offer="modal.offer" />
			</div>
			<div class="modal__footer"></div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	components: {
		FormCreditModal: () => import(/* webpackChunkName: "form-credit-modal" */ '~/components/Form/CreditModal'),
		FormCallback: () => import(/* webpackChunkName: "form-callback" */ '~/components/Form/Callback'),
		FormExchangeModal: () => import(/* webpackChunkName: "form-exchange-modal" */ '~/components/Form/ExchangeModal'),
		Autoteka: () => import(/* webpackChunkName: "autoteka" */ '~/components/Modal/Autoteka'),
	},
	computed: {
		...mapGetters({
			modal: 'modal/modal'
		}),
		modalComponent() {
			return this.modal.type
		}
	},
	methods: {
		...mapActions({
			closeModal: 'modal/closeModal'
		})
	},
	mounted() {
      let self = this;
      window.addEventListener("popstate",function(e){
		if(self.modal){
			setTimeout(()=>{
           self.closeModal();
        },100)
		}
      },false);
    },
}
</script>