<template>
	<div class="form__calculator">
		<form-range class="calculator__controls"
		            @rangeInput="rangeInputTime()"
		            :max="creditRange.length - 1"
		            :value="8"
		            :min="0"
		            :step="1"
		            :dimension="creditRange"
		            title="Срок кредитования:" />
		<form-range class="calculator__controls"
		            @rangeInput="rangeInputContribution()"
		            :max="contributionRange.length - 1"
		            :min="0"
		            :value="0"
		            :price="offer.price"
		            :step="1"
		            :dimension="contributionRange"
		            title="Первоначальный взнос:" />
		<div class="conditions__info">
			<div class="conditions__info-block">
				<div class="conditions__info-title">
					Ваша ставка:
				</div>
				<div class="conditions__info-value">
					<span>
						{{ settings.credit_percent }}
					</span>
					<tippy-question text="Процентная ставка является ориентировочной и зависит от конкретного банка и кредитной программы"/>
				</div>
			</div>
			<div class="conditions__info-block">
				<div class="conditions__info-title">
					Платеж в месяц:
				</div>
				<div class="conditions__info-value">
					<span>{{ total }}</span>
					<tippy-question text="Платеж является ориентировочным и зависит от конкретного банка и кредитной программы"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	components: {
		FormRange: () => import('@/components/Form/Range'),
		TippyQuestion: () => import('@/components/Tippy/TippyQuestions'),
	},
	data() {
		return {
			paymentValue: "0 %",
			periodValue: "84 мес",
			
			creditRange: [
				'61 дн',
				'6 мес',
				'12 мес',
				'24 мес',
				'36 мес',
				'48 мес',
				'60 мес',
				'72 мес',
				'84 мес'
			],
			contributionRange: [
				'0 %',
				'10 %',
				'20 %',
				'30 %',
				'40 %',
				'50 %',
				'60 %',
				'70 %',
				'80 %'
			],
			total: null
		}
	},
	props: {
		installment: {
			type: Boolean,
			default: false
		},
		offer: Object
	},
	watch: {
		offer() {
			this.calculate()
		},
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	},
	methods: {
		calculate() {
			if (!!this.offer) {
				let creditProc = this.installment ? 0.001 : Number(this.settings.credit_percent.split('%')[0]);
				let car_price = this.offer.price;
				let creditTime = Number(this.periodValue.replace(/[^+\d]/g, ''))
				let firstPay = Number(this.paymentValue.replace(/[^+\d]/g, ''))
				
				if (creditTime === 61) {
					creditTime = 2
				}
				
				let A = 0;
				let i = creditProc / 12 / 100;
				let n = creditTime;
				let S
				if (firstPay !== 0) {
					S = car_price - (car_price * firstPay) / 100;
				} else {
					S = car_price;
				}
				this.paymentPriceValue = ((car_price * firstPay) / 100).toString() + ` руб. (${firstPay}%)`
				let K = 0;
				if (car_price) {
					K = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
					A = Math.round(K * S);
					this.total = String(A).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽"
					//для отображения в блоке рядом с выбранным банком
					// this.setPeriodValue(this.periodValue)
					// this.setMonthPaymentValue(A)
					//
				}
			}
		},
		rangeInputTime() {
			this.periodValue = this.creditRange[event.target.value]
			this.calculate()
			this.$emit('period', this.periodValue)
		},
		rangeInputContribution() {
			this.paymentValue = this.contributionRange[event.target.value]
			this.calculate()
			this.$emit('payment', this.paymentValue)
		}
	},
	mounted() {
		if (this.offer) {
			this.calculate()
		}
	},
}
</script>