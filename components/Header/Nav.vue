<template>
	<div class="nav"
	     :class="{'nav--open':open}">
		<nuxt-link class="nav__item"
		           :title="item.name"
		           v-for="(item, index) in nav"
		           :key="index"
		           @click.native="$emit('click')"
		           :to="`/${item.slug}`">
			{{ item.name }}
		</nuxt-link>
		<div class="nav__info">
			<a :href="`tel:${settings.phone}`"
			   class="nav__info-item nav__info-item--phone">
				{{ settings.phone }}
			</a>
			<div class="nav__info-item">
				{{ settings.work_schedule }}
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	props: {
		open: Boolean
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			catalogRoute: 'settings/catalogRoute'
		}),
		nav() {
			return [
				{
					name: 'Каталог',
					slug: this.catalogRoute
				},
				{
					name: 'Автокредит',
					slug: 'auto-credit'
				},
				{
					name: 'Trade-in',
					slug: 'trade-in'
				},
				{
					name: 'Об автосалоне',
					slug: 'about-us'
				},
				{
					name: 'Контакты',
					slug: 'contacts'
				}
			]
		}
	}
}
</script>