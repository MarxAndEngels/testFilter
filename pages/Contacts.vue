<template>
	<div class="application">
		<h1 class="heading heading--h1">{{ pageTitle }}</h1>
		<div class="contacts">
			<div class="contacts__block">
				<div class="contacts__group">
					<div class="contacts__label">
						Телефон:
					</div>
					<div class="contacts__item">
						{{ settings.phone }}
					</div>
				</div>
				<div class="contacts__group">
					<div class="contacts__label">
						Адрес:
					</div>
					<div class="contacts__item">
						{{ settings.address }}
					</div>
				</div>
				<div class="contacts__group">
					<div class="contacts__label">
						Режим работы:
					</div>
					<div class="contacts__item">
						{{ settings.work_schedule }}
					</div>
				</div>
			</div>
			<div class="contacts__block">
				
				<div class="contacts__map">
					<map-main />
				</div>
			
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";

export default {
	mixins: [seoTags],
	components: {
		MapMain: () => import(/* webpackChunkName: "map-main" */ '~/components/Map/Main')
	},
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>