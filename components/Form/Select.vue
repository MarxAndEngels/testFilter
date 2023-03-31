<template>
	<div class="select"
	     tabindex="1"
	     @focusout.stop="open = false"
	     :class="{'select--open':open, 'select--disabled':disabled}">
		<div class="select__data"
		     @click="open = !open">
			<div class="select__data-title"
			     v-if="multiselect">
				{{ currentMultiTitles }}
			</div>
			<div class="select__data-title"
			     v-else>
				{{ currentTitle }}
			</div>
			<div class="select__rec"></div>
		</div>
		<div class="wrapper_main_select_options" :class="{'select--open':open}" @click="open = false">
		<div class="select_options_wrapper">
			<div v-if="options"
			     class="select_options">
				 <div class="wrapper__select_options_close">
					<div class="select_options_close"  @click="open = false">X</div>
				 </div>
				<div class="select_option"
				     v-for="(option, index) in options"
				     :key="index"
				     @click="onSelect(option)">
					<span class="select_option_name">{{ optionName(option) }}</span>
				</div>
			</div>
			<div v-else
			     class="select_nodata">
				НЕТ ДАННЫХ
			</div>
		</div>
	</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			open: false,
			multiSelects: []
		}
	},
	props: {
		title: String,
		items: Array,
		currentData: [Object, Number],
		range: Boolean,
		disabled: Boolean,
		multiselect: Boolean,
	},
	computed: {
		options() {
			if (this.range && this.items) {
				if(this.items[0] ===  this.items[1]){
					return [this.items[0]]
				} else{
					// замена lodash.range
					let a = [this.items[0]], b = this.items[0];
					while (b < this.items[1]) {
						a.push(b += 1 || 1);
					}
					return a;
				}
			
			} else {
				return this.items ? this.items : []
			}
			
		},
		currentMultiTitles() {
			if (this.multiSelects.length) {
				return this.multiSelects.map(item => item.title).sort().join(', ')
			} else {
				return this.title
			}
		},
		currentTitle() {
			if (this.currentData) {
				return this.currentData.title || this.currentData.name || this.currentData.value || this.currentData
			} else {
				return this.title
			}
		}
	},
	methods: {
		multiSelect(event, option) {
			if (event) {
				this.multiSelects.push(option)
			} else {
				this.multiSelects = this.multiSelects.filter(item => item.slug !== option.slug)
			}
			this.$emit('selected', this.multiSelects)
		},
		onSelect(item) {
			this.open = false
			this.$emit('selected', item)
		},
		optionName(item) {
			return item?.title || item?.name || item
		}
	},
}
</script>