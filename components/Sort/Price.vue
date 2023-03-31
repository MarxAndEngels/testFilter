<template>
	<div class="sort__price">
		<div class="sort__price-title">
			Выберите цену:
		</div>
		<nuxt-link :to="`/${catalogRoute}`" class="sort__price-item">
			до 400 000 ₽
		</nuxt-link>
		<nuxt-link :to="`/${catalogRoute}`" class="sort__price-item">
			до 600 000 ₽
		</nuxt-link>
		<nuxt-link :to="`/${catalogRoute}`" class="sort__price-item">
			до 800 000 ₽
		</nuxt-link>
		<nuxt-link :to="`/${catalogRoute}`" class="sort__price-item">
			до 1 000 000 ₽
		</nuxt-link>
		<nuxt-link :to="`/${catalogRoute}`" class="sort__price-item">
			до 1 200 000 ₽
		</nuxt-link>
		<nuxt-link :to="`/${catalogRoute}`" class="sort__price-item">
			до 1 600 000 ₽
		</nuxt-link>
	</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute'
		})
	}
}
</script>