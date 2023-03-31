<template>
	<div class="tippy tippy--question"
	     v-tippy="{
							content:`<div class='tippy__text'>${text}</div>`,
							animation:'scale',
							arrow: true,
					}">
		<svg-icon name="icon-question"
		          class="tippy__icon" />
	</div>
</template>
<script>
export default {
	props: {
		text: String
	}
}
</script>