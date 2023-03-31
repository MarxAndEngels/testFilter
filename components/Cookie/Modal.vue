<template>
	<div class="cookie"
	     :class="{'cookie--active':stateModalCookie}">
		<div class="container">
			<div class="cookie__text">
				Мы используем cookie-файлы, необходимые для работы нашего сайта. Продолжая использовать сайт, вы соглашаетесь со
				сбором и обработкой данных.
				<!--<a target="_blank"-->
				<!--   href="/cookie"> Подробнее.-->
				<!--</a>-->
			</div>
			<div class="button button--cookie" @click="closeCookie">
				Закрыть
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			stateModalCookie: false
		}
	},
	methods: {
		closeCookie() {
			document.cookie = "stateModal=1; max-age=259200";
			this.stateModalCookie = !this.stateModalCookie
		}
	},
	beforeMount() {
		if (!document.cookie.match(/stateModal=(.+?)(;|$)/)) {
			setTimeout(()=>{
				this.stateModalCookie = true
			},100)
		}
	}
}
</script>

