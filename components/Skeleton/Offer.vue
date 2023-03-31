<template>
	<div class="skeleton skeleton__offer"
	     :class="{'skeleton__offer--page':page}"></div>
</template>
<script>
export default {
	props: {
		page: Boolean
	}
}
</script>