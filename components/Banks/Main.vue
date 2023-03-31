<template>
	<div class="banks">
		<slider-banks/>
	</div>
</template>

<script>
export default {
	components: {
		SliderBanks: () => import(/* webpackChunkName: "slider-banks" */ '~/components/Slider/Banks'),
	},
}
</script>