<template>
	<div class="catalog__sort" tabindex="1" @focusout="open = false">
		<div class="catalog__sort-data"
		     @click="open = !open">
			<svg-icon :name="`sorting-${currentSort.slug.split('|')[1]}`" />
			<span>{{ currentSort.name }}</span>
		</div>
		<div class="catalog__sort-selects"
		     v-show="open">
			<div class="catalog__sort-selects-item"
			     :class="{'catalog__sort-selects-item--active':item.name === currentSort.name}"
			     @click="sortSelect(item)"
			     v-for="(item, index) in sorts"
			     :key="index">
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			open: false,
			sorts: [
				{
					slug: 'price|asc',
					name: 'Сначала дешевле'
				},
				{
					slug: 'price|desc',
					name: 'Сначала дороже'
				},
				{
					slug: 'year|desc',
					name: 'Сначала новее'
				},
				{
					slug: 'run|asc',
					name: 'Минимальный пробег'
				}
			]
		}
	},
	computed: {
		currentSort() {
			return this.$route.query?.sort ? this.sorts.filter(item => {
				return item.slug === this.$route.query.sort
			})[0] : this.sorts[0]
		}
	},
	methods: {
		sortSelect(sort) {
			this.open = false
			this.$emit('sort')
			this.$router.push({path: this.$route.fullPath, query: {sort: sort.slug, page: '1'}})
			
		}
	}
}
</script>