<template>
	<div class="header__modal">
		<div class="container">
			<lists-marks-modal />
		</div>
	</div>
</template>

<script>
export default {
	components: {
		ListsMarksModal: () => import(/* webpackChunkName: "lists-marks-modal" */ '~/components/Lists/MarksModal'),
	},
}
</script>