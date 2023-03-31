<template>
	<nuxt-link :to="offerRoute"
			           class="catalog__offer-wrapper">
	<div class="catalog__offer">
		<div class="catalog__offer-header">
			<div class="catalog__offer-slider">
				<div class="catalog__offer-vin">
					<svg-icon name="check"/>
					<span>VIN</span>
				</div>
				<div class="catalog__offer-slider-mobile">
					<nuxt-link :to="offerRoute"
					           v-for="(img, index) in photos"
					           :key="index"
					           class="catalog__offer-slide">
						<img class="lazyload"
						     :data-src="img.small_webp"
						     alt="image" />
					</nuxt-link>
					<a :href="`tel:${settings.phone}`"
					   class="catalog__offer-slider-slide-mobile-call">
						<svg-icon name="icon-phone" />
						<span>Позвонить</span>
					</a>
				</div>
				<nuxt-link :to="offerRoute"
				           class="catalog__offer-slider-desktop">
					<img :data-src="coverSrc"
					     @load="onImgLoad"
					     :class="class_name"
					     class="lazyload"
					     alt="" />
					<div class="brazzers__button-container"
					     @mouseleave="mouseLeave">
						<div
								class="brazzers__button"
								v-if="photos && photos.length > 0 && index <= limit"
								v-for="(photo, index) in photos"
								:key="photo.small_webp"
								@mouseover="mouseOver(photo.small_webp)"
						></div>
					</div>
				</nuxt-link>
			</div>
		</div>
		<div class="catalog__offer-body">
			<nuxt-link :to="offerRoute"
			           class="catalog__offer-name">
				<div class="catalog__offer-name-mark">
					{{ offer.mark.title }}
				</div>
				<div class="catalog__offer-name-folder">
					{{ offer.folder.title }}
				</div>
				<div class="catalog__offer-name-volume">
					{{ offer.engine_volume }}
				</div>
				<!--<div class="catalog__offer-name-year">-->
				<!--	{{ offer.year }} г.-->
				<!--</div>-->
				<!-- <div class="catalog__offer-name-buttons">
					<div class="catalog__offer-name-buttons-autoteka full-width"
					     @click.prevent="onAutoteka">
						<svg-icon name="autoteka" />
					</div>
					<div class="catalog__offer-name-buttons-like"-->
					<!--     @click.prevent>-->
					<!--	<svg-icon name="like" />-->
					<!--</div>
				</div> -->
			</nuxt-link>
			<div class="catalog__offer-price-wrapper">
				<div class="catalog__offer-price">
					{{ offer.price | numberFormat }} ₽
				</div>
				<div class="catalog__offer-price-credit">
					{{ creditPrice | numberFormat }} ₽/мес. без взноса
				</div>
			</div>
			<div class="catalog__offer-price_title">
				Цена актуальна при покупке в кредит
			</div>
			<div class="catalog__offer-tech">
				<div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-year" />
					<span>{{ offer.year }} г.</span>
				</div>
				<div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-mileage" />
					<span>{{ offer.run | numberFormat }} км</span>
				</div>
				<div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-volume" />
					<span>{{ offer.engine_volume }} л.</span>
				</div>
				<div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-engine" />
					<span>{{ offer.engine_power }} л.с.</span>
				</div>
				<div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-gear" />
					<span>{{ offer.gearbox.title_short_rus }}</span>
				</div>
				<!-- <div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-fuel" />
					<span> {{ offer.engineType.title }}</span>
				</div> -->
				<div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-owners" />
					<span> {{ offer.owner.title }}</span>
				</div>
				<!-- <div class="catalog__offer-tech-item">
					<svg-icon name="tech/icon-wd" />
					<span>{{ offer.driveType.title }} привод</span>
				</div> -->
			</div>
		</div>
		<div class="catalog__offer-footer"
		     @click.prevent>
			<div class="catalog__offer-footer-benefits">
				<div class="catalog__offer-footer-benefit-title">
					1 год гарантии от автоцентра
				</div>
				<div class="catalog__offer-footer-benefit">
					Скидка
					<span>до 100 000 ₽</span>
					на автокредит
				</div>
				<div class="catalog__offer-footer-benefit">
					Скидка
					<span>до 150 000 ₽</span>
					на Trade-In
				</div>
			</div>
			<div class="catalog__offer_options">
				<div class="button button--credit"
			     @click.prevent="onCredit">
				Купить в кредит
			</div>
			<div class="button button-callback" v-if="!$device.isMobile"
			     @click.prevent="onCallBack">
				 <svg-icon 
		          @click=""
		          name="phone" />
			</div>
			<div class="button button-callback" v-if="$device.isMobile"
			     @click.prevent="onPhone">
				 <svg-icon 
		          @click=""
		          name="phone" />
			</div>
			</div>
		</div>
	</div>
</nuxt-link>
</template>

<script>
import filters from "~/mixins/filters";
import {mapActions, mapGetters} from "vuex";

export default {
	data() {
		return {
			class_name: 'load',
			isLoaded: false,
			limit: 10,
			forceCoverPhoto: null,
			placeholderUrl: this.offer.images[0].small_webp
		}
	},
	mixins: [
		filters
	],
	props: {
		offer: Object
	},
	methods: {
		...mapActions({
			openModal: 'modal/openModal'
		}),
		async onAutoteka() {
			let modalParams = {
				open: true,
				title:`Автотека`,
				type: 'autoteka',
				offer: this.offer
			}
			await this.openModal(modalParams)
		},
		async onCredit() {
			let modalParams = {
				open: true,
				title: `Автокредит от ${this.settings.credit_percent}`,
				subtitle: `${this.offer.name}`,
				type: 'form-credit-modal',
				offer: this.offer
			}
			await this.openModal(modalParams)
		},
		async onCallBack() {
			let modalParams = {
				open: true,
				title: `Обратный звонок`,
				subtitle: `${this.offer.name}`,
				type: 'form-callback',
				offer: this.offer
			}
			await this.openModal(modalParams)
		},
		async onPhone() {
			var myLink = document.createElement('a');
            myLink.setAttribute('href','tel:'+this.settings.phone);
            myLink.click();
		},
		onImgLoad() {
			this.class_name = 'loaded';
		},
		mouseOver(photo) {
			if (this.forceCoverPhoto !== null) {
				this.class_name = 'load';
			}
			this.forceCoverPhoto = photo;
		},
		mouseLeave() {
			this.forceCoverPhoto = null;
			this.class_name = 'loaded';
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		}),
		coverSrc() {
			return this.forceCoverPhoto
					? this.forceCoverPhoto
					: this.photos.length > 0
							? this.photos[0].small_webp
							: this.placeholderUrl;
		},
		photos() {
			return this.offer.images
		},
		offerRoute() {
			return `/${this.offer.category_enum}/${this.offer.mark.slug}/${this.offer.folder.slug}/${this.offer.generation.slug}/${this.offer.external_id}`
		},
		creditPrice() {
			let percent = Number(this.settings.credit_percent.split('%')[0]);
			let n = 84;
			let coef_i = percent / 12 / 100;
			let K = (coef_i * Math.pow(1 + coef_i, n)) / (Math.pow(1 + coef_i, n) - 1);
			return Math.round(K * this.offer.price);
		}
	}
}
</script>