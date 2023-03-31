<template>
	<label class="checkbox__label"
	       :class="{'checkbox__label--error': error}">
		<input class="checkbox"
		       @change="$emit('change', checked)"
		       v-model="checked"
		       type="checkbox">
		<span class="checkbox__custom"></span>
		<span class="checkbox__text"
		      v-html="title"></span>
	</label>
</template>

<script>
export default {
	data() {
		return {
			checked: this.default
		}
	},
	computed: {
		items() {
			return this.max / this.step
		}
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		error: {
			type: Boolean,
			default: false
		},
		default: {
			type: Boolean,
			default: true
		},
		privacy: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		// goPrivacy(){
		//   if(this.privacy){
		//     this.$router.push('/privacy')
		//   }
		// }
	}
}
</script>
