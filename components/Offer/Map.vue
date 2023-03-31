<template>
	<div class="offer__map">
		<map-main/>
	</div>
</template>

<script>
export default {
	components: {
		MapMain: () => import(/* webpackChunkName: "map-main" */ '~/components/Map/Main'),
	}
}
</script>