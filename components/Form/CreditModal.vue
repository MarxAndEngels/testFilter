<template>
	<div class="form">
		<benefits-credit class="benefits--form" />
		<div class="form__controls">
			<div class="form__controls-group">
				<form-offer :offer="modal.offer" />
				<form-calculator v-if="modal.offer"
			                 :offer="modal.offer"
			                 @payment="changePayment($event)"
			                 @period="changePeriod($event)" />
				<div class="heading heading--h3">
					Личные данные
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.name.valid === false}">
					<form-input :placeholder="'ФИО'"
					            @input="form.name.valid = null"
					            v-model="form.name.value" />
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.phone.valid === false}">
					<form-input :placeholder="'Телефон'"
					            @phoneMaskComplete="form.phone.valid = true"
					            @onincomplete="form.phone.valid = null"
					            mask="phone"
					            type="tel"
					            v-model="form.phone.value" />
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.date.valid === false}">
					<form-input :placeholder="'Дата рождения'"
					            @dateMaskComplete="form.date.valid = true"
					            @onincomplete="form.date.valid = null"
					            mask="date"
					            type="tel"
					            v-model="form.date.value" />
				</div>
				<div class="input__wrapper">
					<form-checkbox @change="form.agree = $event"
					               title="Согласен на обработку персональных данных" />
				</div>
				<div class="button button--form"
				     :class="{'button--disabled':sending}"
				     @click="onSubmit">
					Отправить заявку
				</div>
				<div class="form__alert">
					Автокредит предоставляется только гражданам РФ
				</div>
			</div>
		</div>
	
	</div>


</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import feedback from '@/apollo/mutations/feedback.gql'

export default {
	components: {
		FormInput: () => import(/* webpackChunkName: "form-input" */ '~/components/Form/Input'),
		FormCheckbox: () => import(/* webpackChunkName: "form-checkbox" */ '~/components/Form/Checkbox'),
		BenefitsCredit: () => import(/* webpackChunkName: "benefits-credit" */ '~/components/Benefits/Credit'),
		FormOffer: () => import(/* webpackChunkName: "form-offer" */ '~/components/Form/Offer'),
		FormChoseOffer: () => import(/* webpackChunkName: "form-chose-offer" */ '~/components/Form/ChoseOffer'),
		FormCalculator: () => import(/* webpackChunkName: "form-calculator" */ '~/components/Form/Calculator'),
	},
	data() {
		return {
			sending: false,
			form: {
				paymentValue: '0 %',
				periodValue: '84 мес.',
				agree: true,
				name: {
					value: '',
					valid: null
				},
				phone: {
					value: '',
					valid: null
				},
				date: {
					value: '',
					valid: null
				}
			}
		}
	},
	computed: {
		...mapGetters({
			modal: 'modal/modal'
		})
	},
	methods: {
		...mapMutations({
			setThanksOffer: 'thanks/SET_THANKS_OFFER',
			setFeedbackId: 'thanks/SET_FEEDBACK_ID'
		}),
		...mapActions({
			requestPOST: 'request/requestPOST',
			closeModal: 'modal/closeModal'
		}),
		changePeriod(value) {
			this.form.periodValue = value
		},
		changePayment(value) {
			this.form.paymentValue = value
		},
		async onSubmit() {
			if (this.formValidate()) {
				this.sending = true
				let variables = {
					type: 'credit',
					client_name: this.form.name.value,
					client_phone: this.form.phone.value,
					client_age: this.form.date.value,
					external_id: this.modal.offer.external_id,
					//для формы с калькулятором
					credit_initial_fee: this.form.paymentValue?.toString(),
					credit_period: this.form.periodValue?.toString()
				}
				try {
					let response = await this.requestPOST({
						query: feedback,
						variables
					})
					await this.setThanksOffer(this.modal.offer)
					await this.setFeedbackId(response.data.feedback.id)
					this.sending = false
					await this.$router.push('/thanks')
					await this.closeModal()
				} catch (error) {
					console.log(error)
				}
				
				
			}
		},
		formValidate() {
			if (this.form.name.value.length < 2) {
				this.form.name.valid = false
			}
			if (!this.form.phone.valid) {
				this.form.phone.valid = false
			}
			if (!this.form.date.valid) {
				this.form.date.valid = false
			} else {
				return true
			}
			
		}
	}
}
</script>