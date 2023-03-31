<template>
	<li class="crumbs__item">
		<span v-if="disabled">
			{{ crumb.title }}
		</span>
		<nuxt-link :to="crumb.link"
		           :title="crumb.title"
		           v-else
		           class="crumbs__link">
			{{ crumb.title }}
		</nuxt-link>
	</li>
</template>
<script>
export default {
	props: {
		disabled: Boolean,
		crumb: Object
	}
}
</script>