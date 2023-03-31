<template>
	<input class="input"
	       ref="input"
	       :placeholder="placeholder"
	       :value="value"
	       @focus="$emit('focus')"
	       @focusout="$emit('focusout')"
	       :inputmode="type==='tel' ? 'numeric' : ''"
	       @input="$emit('input', $event.target.value)"
	       :type="type" />
</template>

<script>
import filters from "@/mixins/filters";
import Inputmask from "inputmask";
export default {
	components:{
		Inputmask
	},
	mixins: [filters],
	props: {
		value: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: 'placeholder'
		},
		mask: {
			type: String,
			default: 'placeholder'
		}
	},
	data() {
		return {
			masks: {
				money: {
					alias: "decimal",
					digits: 2,
					placeholder: "",
					autoGroup: true,
					allowMinus: false,
					rightAlign: false,
					groupSeparator: " ", // <-- this is &puncsp;
					radixPoint: " ",
				},
				number: {
					regex: "[0-9]*",
					placeholder: this.placeholder,
					showMaskOnHover: false
				},
				phone: {
					mask: "+7 (#99) 999-99-99",
					showMaskOnHover: false,
					showMaskOnFocus: true,
					oncomplete: () => this.$emit('phoneMaskComplete'),
					onincomplete: () => this.$emit('onincomplete'),
					definitions: {
						"#": {
							validator: "[1234569]",
						},
					},
				},
				date: {
					mask: "99/99/9999",
					showMaskOnHover: false,
					showMaskOnFocus: true,
					oncomplete: () => this.$emit('dateMaskComplete'),
					onincomplete: () => this.$emit('onincomplete'),
				}
			}
		}
	},
	mounted() {
		if (this.mask === 'money') {
			let im = new Inputmask(this.masks.money);
			im.mask(this.$refs.input);
		}
		if (this.mask === 'number') {
			let im = new Inputmask(this.masks.number);
			im.mask(this.$refs.input);
		}
		if (this.mask === 'phone') {
			let im = new Inputmask(this.masks.phone);
			im.mask(this.$refs.input);
		}
		if (this.mask === 'date') {
			let im = new Inputmask(this.masks.date);
			im.mask(this.$refs.input);
		}
	}
}
</script>
