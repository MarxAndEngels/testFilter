<template>
    <div v-if="popularMarks && count">
        <div class="marks__list-popular">
			<nuxt-link class="popular-item"
			           :to="`/${catalogRoute}/${item.slug}`"
			           :class="{'active':$route.params.mark === item.slug}"
			           v-for="(item,index) in popularMarks"
			           :key='index' v-if="index < count">
					<span class="popular-item_title" v-if="item.slug != 'lada-vaz'">
						{{ item.slug.slice(0,1).toUpperCase()+item.slug.slice(1) }}
					   </span>
					<span class="popular-item_title" v-if="item.slug == 'lada-vaz'">
						Lada (ВАЗ)
					   </span>
				<img :src="`/img/marks/${item.slug}.webp`" class="popular-item_image" alt="marks" v-if="item.slug != 'lada-vaz'">
				<img :src="`/img/marks/lada.webp`" class="popular-item_image" alt="marks" v-else="item.slug == 'lada-vaz'">
			</nuxt-link>
		</div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
    props: {
		popularMarks: {
			type: Array,
			default: []
		}
	},
    computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute'
		}),
		count(){
			if(this.$device.isMobile){
				return 5;
			}else{
				return 10;
			}
		}
    },
}
</script>