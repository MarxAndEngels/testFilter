<template>
	<div class="wrapper">
		<Header />
		<div class="container">
			<crumbs/>
			<transition name="page">
				<Nuxt />
			</transition>
		</div>
		<Footer />
		<cookie-modal />
		<!-- <callback-modal /> -->
		<transition name="modal">
			<modal-main v-if="modal && modal.open" />
		</transition>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
import metrika from "@/mixins/metrika";

export default {
	components: {
		Crumbs: () => import(/* webpackChunkName: "crumbs" */ '~/components/Crumbs'),
		Header: () => import(/* webpackChunkName: "header" */ '~/components/Header'),
		Footer: () => import(/* webpackChunkName: "footer" */ '~/components/Footer'),
		ModalMain: () => import(/* webpackChunkName: "modal-main" */ '~/components/Modal/Main'),
		CookieModal: () => import(/* webpackChunkName: "cookie-modal" */ '~/components/Cookie/Modal'),
		CallbackModal: () => import(/* webpackChunkName: "callback-modal" */ '~/components/Callback/Modal'),
	},
	mixins: [metrika],
	computed: {
		...mapGetters({
			modal: 'modal/modal'
		})
	}
}
</script>
