<template>
	<div class="filters">
		<div class="heading heading--h3">Подобрать автомобиль</div>
		<div class="filters__group">
			<form-select :items="marks" :current-data="chosenMark" title="Марка" @selected="markSelect" class="select" />
			<form-select :items="folders" :disabled="folders == null" :current-data="chosenFolder" title="Модель" @selected="folderSelect"
				class="select" />
			<form-select :items="generations" :disabled="generations == null" :current-data="chosenGeneration" title="Поколение"
				@selected="generationSelect" class="select" />
			<form-select :items="year" :current-data="chosenYear" title="Год от" @selected="yearSelect"
				class="select" />
			<!-- <div class="select__wrapper select__wrapper--filter"
				     v-for="filter in filtersArray"
				     :key="filter.slug">
					<form-select
							:items="filters[filter.slug]"
							:title="filter.title"
							:disabled="isDisabled(filter.slug)"
							:range="filter.range"
							:current-data="$data[filter.slug] ? $data[filter.slug] : null"
							@selected="selected(filter.slug, $event)" />
				</div> -->
			<div class="select__wrapper select__wrapper--filter">
					<div class="wrapper__filter-item_price">
						<span class="filter-item_price_title">Цена от</span>
						<input type="text" inputmode="numeric" v-model="priceFrom" placeholder="Цена от ₽" class="input">
					</div>

				</div>
			<div class="filter__buttons">
				<div class="button button--filter" @click="filter">
					<span>Показать</span>
					<!-- <span>{{ count }}</span>
					<span>{{ declension({count: count, one: 'автомобиль', few: 'автомобиля', many: 'автомобилей'}) }}</span> -->
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import filters from "~/apollo/queries/offer/filters";
import declension from "@/mixins/declension";
export default {
	mixins: [declension],
	components: {
		FormSelect: () => import(/* webpackChunkName: "form-select" */ '~/components/Form/Select'),
	},
	data() {
		return {
			// filtersArray: [
			// 	{
			// 		title: 'Год от',
			// 		slug: 'year',
			// 		type: 'yearFrom',
			// 		isId: true,
			// 		range: true,
			// 		dependence: []
			// 	},
			// 	{
			// 		title: 'Тип кузова',
			// 		slug: 'bodyType',
			// 		dependence: []
			// 	},
			// ],
			chosen: {},
			year: null,
			chosenYear: null,
			priceFrom: null,
			engineType: null,
			bodyType: null,
			chosenMark: null,
			chosenFolder: null,
			chosenGeneration: null,
			folders: null,
			generations: null,
		}
	},
	watch: {
		// отправляю запрос когда поменялся route (пагинация и query параметры)
		async '$route'() {
			await this.getFilters(this.filterParams)
		}
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			marks: 'marks/marks',
			chosenStore: 'filters/chosen'
		}),
		// параметры для запроса фильтров
		filterParams() {
			return {
				mark_slug_array: this.setParam('chosenMark'),
				folder_slug_array: this.setParam('chosenFolder'),
				generation_slug_array: this.setParam('chosenGeneration'),
				year_from: Number(this.$route.query.yearFrom),
				// body_type_id_array: this.bodyType ? [this.bodyType.id] : this.$route.query.bodyType ? [Number(this.$route.query.bodyType)] : null,
			}
		},
		selectFilterParams() {
			return {
				mark_slug_array: this.setParam('chosenMark'),
				folder_slug_array: this.setParam('chosenFolder'),
				generation_slug_array: this.setParam('chosenGeneration'),
				year_from: Number(this.$route.query.yearFrom),
				// body_type_id_array: this.$route.query.bodyType ? [Number(this.$route.query.bodyType)] : null,
			}
		}
	},
	methods: {
		...mapActions({
			request: 'request/request'
		}),
		...mapMutations({
			setShowFilters: 'filters/SET_SHOW_FILTERS',
			setFilters: 'filters/SET_FILTERS',
			setChosen: 'filters/SET_CHOSEN',
		}),
		isDisabled(slug) {
			return this.filters[slug] === null
		},
		//функция помощник
		setParam(param) {
			if (param) {
				return this[param] ? [this[param].slug] : this.$route.params[param] ? [this.$route.params[param]] : null
			} else return null
		},
		selectPrice(priceFromServer){
			let formatter = new Intl.NumberFormat("ru-RU", {
		        style: "currency",
		        currency: "RUB",
		        minimumFractionDigits: 0,
		        });

				if(this.$route.query.price_from && this.priceFrom){
					this.priceFrom= formatter.format(this.$route.query.price_from);
				}
				else if(priceFromServer){
					this.priceFrom = formatter.format(priceFromServer)
				}
				if( (this.$route.query.price_from && this.chosenMark) || (this.$route.query.price_from && this.chosenFolder) 
				|| (this.$route.query.price_from && this.chosenGeneration)){
                    this.priceFrom = formatter.format(priceFromServer)
				}
				if(this.chosenStore?.price){
                    this.priceFrom = formatter.format(this.chosenStore?.price)
				}
				if(this.chosenStore?.price && this.$route.query.price_from){
                    this.priceFrom = formatter.format(this.chosenStore?.price)
				}
				// if(this.$route.query.price_from && this.$route.name == 'category' && !this.mark){
				// 	this.priceFrom= formatter.format(this.$route.query.price_from);
				// }
				// if(this.$route.params.mark && this.$route.params.folder && this.priceFrom && this.$route.query.price_from){
				// 	this.priceFrom= formatter.format(this.$route.query.price_from);
				// }
				// if(this.$route.params.mark && this.priceFrom && this.$route.query.price_from){
				// 	this.priceFrom= formatter.format(this.$route.query.price_from);
				// }
		}, 
		async getFilters(params) {
			try {
				let response = await this.request({
					query: filters,
					variables: params
				})
				if (response.data.offerFilters.year) {
					let arr = [];
						for (let i = response.data.offerFilters.year[1]; i >= response.data.offerFilters.year[0]; i--) {
						arr.push(i);
					}
					this.year = arr
				}
				console.log(response.data.offerFilters.price[0])
				//записывает цену с сервера
				this.selectPrice(response.data.offerFilters.price[0]);

			} catch (error) {
				console.log(error)
			}
		},
		async filter() {
			let pathParams = {
				mark: this.chosenMark,
				generation: this.chosenGeneration,
				folder: this.chosenFolder,
			}
			let queryParams = {
				yearFrom: this.chosenYear,
				bodyType: this.bodyType,
				gearbox: this.gearbox,
				sort: this.sort || null,
				price_from: this.priceFrom
				// owners: this.currentOwners,
				// driveType: this.currentDriveType,
			}
			// await this.setFilterButtonClick(true)
			await this.$router.push({ path: this.currentPath(pathParams), query: this.currentQueries(queryParams) })
		},
		reset() {
			this.chosenYear = null
		},
		async markSelect(option) {
			this.chosenMark = option
			this.folders = option.folders
			this.generations = null
			this.chosenFolder = null
			this.chosenGeneration = null
			this.reset();

            this.chosen.mark = option
            this.setChosen(this.chosen);
			await this.getFilters(this.filterParams)
		},
		async folderSelect(option) {
			this.chosenFolder = option
			this.generations = null
			this.chosenGeneration = null
			this.reset();

			this.chosen.folder = option
            this.setChosen(this.chosen);

			this.generations = option.generations.map(item => {
				let generation = item.name + ` [${item.year_begin} - ${item.year_end || ' н.в.'}]`
				return { ...item, name: generation }
			})
			await this.getFilters(this.filterParams)
		},
		async generationSelect(option) {
			this.chosenGeneration = option
			this.reset();

			this.chosen.generation = option
            this.setChosen(this.chosen);
			await this.getFilters(this.filterParams)
		},
		async yearSelect(option) {
			this.chosenYear = option

			this.chosen.year = option
            this.setChosen(this.chosen);
		},
		currentPath(params) {
			let path = '/' + this.catalogRoute

			if (params.mark) {
				path += '/' + params.mark.slug
			}
			if (params.folder) {
				path += '/' + params.folder.slug
			}
			if (params.generation) {
				path += '/' + params.generation.slug
			}
			return path
		},
		currentQueries(params) {
			let queries = {}
			if (params.bodyType) {
				queries.bodyType = params.bodyType.id
			}
			if (params.yearFrom) {
				queries.yearFrom = params.yearFrom
			}
			if (params.owners) {
				queries.owners = params.owners.id
			}
			if (params.gearbox) {
				queries.gearbox = params.gearbox.id
			}
			if (params.driveType) {
				queries.driveType = params.driveType.id
			}
			if (params.engineType) {
				queries.engineType = params.engineType.id
			}
			if (params.sort) {
				queries.sort = params.sort
			}
			if (params.price_from) {
				//убирает лишнии символы при отправке
				params.price_from = String(params.price_from).replace(/\s/g, '').replace('₽', '');
				//убирает лишнии символы при отправке
				queries.price_from = Number(params.price_from)
				this.chosen.price = queries.price_from
                this.setChosen(this.chosen);
			}
			return queries
		},
		async searchProperties(){
			if(this.$route.name == 'index'){
				this.setChosen(null);
			 }
			 console.log(this.chosenStore)
			
			 //если в сторе есть данные
			  if(this.chosenStore?.mark){
				this.chosenMark = this.chosenStore.mark
				this.folders = this.chosenStore.mark.folders
			  }
			  //если в сторе есть данные

			  //если в сторе нет данных берет с параметров урл
			  else if(this.$route.params.mark){
				this.chosenMark = this.marks.filter(el=>{ return String(el.slug) == this.$route.params.mark })[0]
				this.folders = this.chosenMark.folders
			  }
			  //если в сторе нет данных берет с параметров урл

			  if(this.chosenStore?.folder){
					this.chosenFolder = this.chosenStore.folder
					this.generations = this.chosenStore.folder.generations.map(item => {
				        let generation = item.name + ` [${item.year_begin} - ${item.year_end || ' н.в.'}]`
				        return { ...item, name: generation }
			           })
			  }
			  else if(this.$route.params.folder){
				this.chosenFolder = this.folders.filter(el=>{ return String(el.slug) == this.$route.params.folder })[0]
				this.generations = this.chosenFolder.generations.map(item => {
				        let generation = item.name + ` [${item.year_begin} - ${item.year_end || ' н.в.'}]`
				        return { ...item, name: generation }
			           })
			  }

			  if(this.chosenStore?.generation){
				this.chosenGeneration = this.chosenStore.generation
			  }
			  else if(this.$route.params.generation){
				this.chosenGeneration = this.generations.filter(el=>{ return String(el.slug) == this.$route.params.generation })[0]
			  }

			  if(this.chosenStore?.price){
				this.selectPrice(this.chosenStore.price);
			  }
			  else if(this.$route.query.price_from){
				this.selectPrice(this.$route.query.price_from);
			  }
			  if(this.chosenStore?.year){
				this.chosenYear = this.chosenStore.year;
			  }
		   //если в сторе нет данных берет с параметров урл  
		   
		   await this.getFilters(this.filterParams)
		}
	},
	mounted(){
		this.searchProperties()
	}
}
</script>