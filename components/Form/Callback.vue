<template>
	<div class="form">
		<div class="form__controls">
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
					            @phoneMaskComplete="form.phone.valid = true"
					            @onincomplete="form.phone.valid = null"
					            mask="phone"
					            type="tel"
					            v-model="form.phone.value" />
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
import {mapActions,mapGetters} from "vuex";
import feedback from '@/apollo/mutations/feedback.gql'

export default {
	components: {
		FormInput: () => import(/* webpackChunkName: "form-input" */ '~/components/Form/Input'),
		FormCheckbox: () => import(/* webpackChunkName: "form-checkbox" */ '~/components/Form/Checkbox'),
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
		...mapActions({
			requestPOST: 'request/requestPOST',
			closeModal: 'modal/closeModal'
		}),
		
		async onSubmit() {
			if (this.formValidate()) {
				this.sending = true
				let variables = {
					type: 'callback',
					client_name: this.form.name.value,
					client_phone: this.form.phone.value,
				}
				if(this.modal.offer){
					variables.external_id = this.modal.offer.external_id
				}
				try {
					await this.requestPOST({
						query: feedback,
						variables
					})
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
			} else {
				return true
			}
			
		}
	}
}
</script>