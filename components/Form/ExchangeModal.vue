<template>
	<div class="form">
		<benefits-exchange class="benefits--form" />
		<div class="form__controls">
			<div class="form__controls-group">
				<form-offer :offer="modal.offer" />
				<div class="heading heading--h3">
					Ваш автомобиль
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.mark.valid === false}">
					<form-input :placeholder="'Марка'"
					            @input="form.mark.valid = null"
					            v-model="form.mark.value" />
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.model.valid === false}">
					<form-input :placeholder="'Модель'"
					            @input="form.model.valid = null"
					            v-model="form.model.value" />
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.year.valid === false}">
					<form-input :placeholder="'Год'"
					            mask="number"
					            type="tel"
					            @input="form.year.valid = null"
					            v-model="form.year.value" />
				</div>
			</div>
			<div class="form__controls-group">
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
					            @input="form.phone.valid = null"
					            @phoneMaskComplete="form.phone.valid = true"
					            @onincomplete="form.phone.valid = null"
					            mask="phone"
					            type="tel"
					            v-model="form.phone.value" />
				</div>
				<div class="input__wrapper"
				     :class="{'input__wrapper--error': form.date.valid === false}">
					<form-input :placeholder="'Дата рождения'"
					            @input="form.date.valid = null"
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
			</div>
		
		</div>
	</div>


</template>

<script>
import feedback from "@/apollo/mutations/feedback";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
	components: {
		FormInput: () => import(/* webpackChunkName: "form-input" */ '~/components/Form/Input'),
		FormCheckbox: () => import(/* webpackChunkName: "form-checkbox" */ '~/components/Form/Checkbox'),
		BenefitsExchange: () => import(/* webpackChunkName: "benefits-credit" */ '~/components/Benefits/Exchange'),
		FormOffer: () => import(/* webpackChunkName: "form-offer" */ '~/components/Form/Offer')
	},
	data() {
		return {
			sending: false,
			form: {
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
				},
				
				mark: {
					value: '',
					valid: null
				},
				model: {
					value: '',
					valid: null
				},
				year: {
					value: '',
					valid: null
				},
				run: {
					value: '',
					valid: null
				},
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
		async onSubmit() {
			if (this.formValidate()) {
				this.sending = true
				let variables = {
					type: 'trade-in',
					client_name: this.form.name.value,
					client_phone: this.form.phone.value,
					client_age: this.form.date.value,
					external_id: this.modal.offer.external_id,
					
					client_vehicle_mark: this.form.mark.value,
					client_vehicle_model: this.form.model.value,
					client_vehicle_year: this.form.year.value,
					//для формы с калькулятором
					// credit_initial_fee: this.form.paymentValue?.toString(),
					// credit_period: this.form.periodValue?.toString()
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
			if (this.form.year.value.length < 2) {
				this.form.year.valid = false
			}
			if (this.form.mark.value.length < 2) {
				this.form.mark.valid = false
			}
			if (this.form.model.value.length < 1) {
				this.form.model.valid = false
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