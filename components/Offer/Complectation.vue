<template>
	<div class="offer__complectation" v-if="complectation">
		<div class="offer__complectation-block"
		     v-for="(item, index) in complectation"
		     :key="index">
			<div class="offer__complectation__title"
			     v-if="item.values"> {{ item.title }}
			</div>
			<div v-for="(value, i) in item.values"
			     :key="i">
				<div class="offer__complectation__item">
					{{ value }}
				</div>
			</div>
		</div>
		<div class="button button--more"
		     v-if="complectation_length > 2"
		     @click="full = !full">
			<span v-if="full">Скрыть комплектацию</span>
			<span v-else>Показать еще {{complectation_length - 2}}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			full: false
		}
	},
	props: {
		offer: Object
	},
	computed: {
		complectation_length() {
			return this.offer.equipment_groups.length
		},
		complectation() {
			if (this.complectation_length < 2) {
				return this.offer.equipment_group
			} else {
				return this.full ? this.offer.equipment_groups : this.offer.equipment_groups.slice(0, 2)
			}
		}
	}
}
</script>