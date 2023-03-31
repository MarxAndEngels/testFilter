<template>
	<div class="range__component">
		<div class="range__title"
		     v-if="title">
			{{ title }}
			<span v-if="price && dimensionPrice">{{ dimensionPrice | numberFormat }} ₽</span>
			<span v-else> {{ dimension[val] }}</span>
		
		</div>
		<div class="progressed__line"
		     :style="{width: progress + '%'}"></div>
		<input @input="$emit('rangeInput')"
		       type="range"
		       v-model="val"
		       :min="min"
		       :max="max"
		       :step="step">
		<div class="range__dimension">
			<div class="range__dimension-item"
			     v-for="item in dimension">
				<span>{{ item }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import filters from "@/mixins/filters";

export default {
	data() {
		return {
			val: this.value
		}
	},
	mixins: [
		filters
	],
	computed: {
		progress() {
			return Number(this.val) * 100 / this.max
		},
		dimensionPrice() {
			let percent = Number(this.dimension[this.val].replace(' %', ''))
			return this.price * percent / 100
		}
	},
	props: {
		price: Number,
		value: {
			type: Number,
			default: 1
		},
		title: {
			type: String,
			default: ''
		},
		max: {
			type: Number,
			default: 1
		},
		step: {
			type: Number,
			default: 1
		},
		dimension: {
			type: Array,
			default: () => []
		},
		min: {
			type: Number,
			default: 1
		}
	}
}
</script>