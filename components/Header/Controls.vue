<template>
	<div class="header__controls">
		<lists-header-marks :class="{'list__header--active' : showMarks}" />
		<div class="button button--all-marks"
		     :class="{'button--all-marks--active':marksModal}"
		     @click="setMarksModal(!marksModal)">
			 <div class="wrapper__select_car" :class="{ 'active': stateButtonMarks}">
				<svg-icon name="icon-search" v-if="!stateButtonMarks" @click="changeStateButtonMarks"/>
				<svg-icon name="icon-close" v-if="stateButtonMarks"  @click="changeStateButtonMarks"/>
			 </div>
		</div>
		<header-back :class="{'header__back--active' : !showMarks}" />
		<transition name="marks">
			<header-modal v-if="marksModal" />
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	data(){
      return{
		stateButtonMarks: false
	  }
	},
	components: {
		ListsHeaderMarks: () => import(/* webpackChunkName: "lists-header-marks" */ '~/components/Lists/HeaderMarks'),
		HeaderBack: () => import(/* webpackChunkName: "header-back" */ '~/components/Header/Back'),
		HeaderModal: () => import(/* webpackChunkName: "header-modal" */ '~/components/Header/Modal')
	},
	methods: {
		...mapMutations({
			setMarksModal: 'modal/SET_MARKS_MODAL'
		}),
		changeStateButtonMarks(){
             this.stateButtonMarks = !this.stateButtonMarks
		}
	},
	computed: {
		...mapGetters({
			marksModal: 'modal/marksModal'
		}),
		showMarks() {
			return !this.$route.params.folder
		}
	}
}
</script>