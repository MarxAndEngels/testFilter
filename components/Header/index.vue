<template>
	<div class="header">
		<div class="header__top">
			<div class="container">
				<div class="header__inner">
					<div class="burger"
					     @click="open = !open"
					     :class="{'burger--open':open}">
						<div class="burger__line"></div>
						<div class="burger__line"></div>
						<div class="burger__line"></div>
					</div>
					<nuxt-link to="/"
					           @click.native="logoClick"
					           class="header__logo"
					           :class="{'header__logo--white':open}"> 
						<img data-src="~static/img/logo.svg" src="~static/img/logo.svg" alt="logo">
					
					 </nuxt-link> 
					<header-nav :open="open"
					            @click="navClick" />
					<div class="header__contacts">
						<a :href="`tel:${settings.phone}`"
						   :class="{'header__contacts-phone--open':open}"
						   class="header__contacts-phone">
							<svg-icon name="phone" />
							<div class="header__contacts-phone_sub-title" :class="{'open':open}">
								Позвонить
							</div>
							<span>
								{{ settings.phone }}
							</span>
						</a>
					
					</div>
				</div>
			</div>
		</div>
		<div class="header__bottom">
			<div class="container">
				<header-controls />
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	data() {
		return {
			open: false,
		}
	},
	components: {
		HeaderControls: () => import(/* webpackChunkName: "header-controls" */ '~/components/Header/Controls'),
		HeaderNav: () => import(/* webpackChunkName: "header-nav" */ '~/components/Header/Nav'),
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			settings: 'settings/settings'
		})
	},
	methods:{
		...mapMutations({
			setMarksModal:'modal/SET_MARKS_MODAL'
		}),
		navClick(){
			this.open = false
			this.setMarksModal(false)
		},
		logoClick(){
			this.open = false
			this.setMarksModal(false)
		}
	}
}
</script>