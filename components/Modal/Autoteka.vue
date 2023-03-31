<template>
	<div class="autoteka">
		<div class="autoteka__info"
		     v-if="ready">
			<div class="autoteka__header">
				<div class="autoteka__title">
					Отчёт куплен на сайте Autoteka.ru
				</div>
				<div class="autoteka__description">
					Автотека - сервис по проверке автомобиля по VIN
				</div>
				<div class="autoteka__date">
					Отчет от
					<span>
						{{ offer.createdAt }}
					</span>
				</div>
			</div>
			<div class="autoteka__offer">
				<div class="autoteka__offer-title">
					{{ offer.name }}
				</div>
				<div class="autoteka__offer-info">
					<div class="autoteka__offer-line"
					     v-for="item in offerInfo"
					     v-if="offer[item.slug]"
					     :key="item.name">
						<div>
							{{ item.name }}
						</div>
						<div v-if="item.default">
							{{ item.default }}
						</div>
						<div v-else-if="item.format">
							{{ offer[item.slug] | numberFormat }} {{ item.postfix }}
						</div>
						<div v-else-if="offer[item.slug]">
							{{ offer[item.slug].title || offer[item.slug] }} {{ item.postfix }}
						</div>
					</div>
					<div class="autoteka__offer-vin-text">
						VIN номер скрыт из соображений безопасности.
					</div>
				</div>
			</div>
			<div class="autoteka__blocks">
				<div class="autoteka__block"
				     v-for="(item, index) in items"
				     :key="index">
					<div class="autoteka__block-title">
						{{ item.title }}
					</div>
					<div class="autoteka__block-text"
					     v-if="item.text">{{ item.text }}
					</div>
				</div>
			</div>
		</div>
		
		<div class="autoteka__loader"
		     v-else>
			<div class="autoteka__loader-text">
				Загрузка отчета...
			</div>
			<div class="autoteka__loader-line"></div>
			<!--<loader class="autoteka__loader-icon"-->
			<!--        large />-->
		</div>
	
	</div>
</template>

<script>
import filters from "@/mixins/filters";

export default {
	// components: {
	// 	loader: () => import('@/components/loader/loader'),
	// },
	mixins: [filters],
	data() {
		return {
			ready: false,
			offerInfo: [
				{
					name: 'VIN',
					slug: 'vin',
					postfix: ''
				},
				{
					name: 'Госномер',
					default: 'Отсутствует'
				},
				{
					name: 'Номер кузова',
					slug: 'vin',
					postfix: ''
				},
				{
					name: 'Год выпуска',
					slug: 'year',
					postfix: 'г.'
				},
				{
					name: 'Тип ТС',
					slug: 'bodyType',
					postfix: ''
				},
				{
					name: 'Цвет',
					slug: 'color',
					postfix: ''
				},
				{
					name: 'Объём двигателя',
					slug: 'engine_volume',
					postfix: 'л.'
				},
				{
					name: 'Мощность',
					slug: 'engine_power',
					postfix: 'л.с.'
				},
				{
					name: 'Последний пробег',
					slug: 'run',
					postfix: 'км',
					format: true
				},
			],
			items: [
				{
					title: 'Не найдены ограничения на регистрацию',
					text: 'Запрет регистрационных действий на машину накладывается, если у автовладельца есть неоплаченные штрафы и налоги, либо если имущество стало предметом спора.',
					isOpen: false,
				},
				{
					title: 'Нет сведений о розыске',
					text: 'Покупка разыскиваемого автомобиля грозит тем, что его отберут в ГИБДД при регистрации, и пока будет идти следствие, а это может затянуться на долгий срок, автомобиль будет стоять на штрафплощадке.',
					isOpen: false,
				},
				{
					title: 'Залог не найден',
					text: 'Мы проверили базы данных Федеральной нотариальной палаты (ФНП) и Национального бюро кредитных историй (НБКИ).',
					isOpen: false,
				},
				{
					title: `${this.offer.owner.title} по ПТС`,
					text: '',
					isOpen: false,
				},
				{
					title: 'ДТП не найдены',
					text: 'В отчёт не попадут аварии, которые произошли раньше 2015 года или не оформлялись в ГИБДД.',
					isOpen: false,
				},
				{
					title: 'Не найдены расчёты стоимости ремонта',
					text: 'Мы проверяем, во сколько эксперты страховых компаний оценили восстановление автомобиля после ДТП. Расчёт не означает, что машину ремонтировали.',
					isOpen: false,
				},
				{
					title: 'Не найдено разрешение на работу в такси',
					text: 'Данные представлены из региональных баз по регистрации автомобиля в качестве такси.',
					isOpen: false,
				},
				{
					title: 'Не найдены сведения об использовании в каршеринге',
					text: 'На каршеринговых авто ездят практически круглосуточно. Они много времени проводят в пробках — от этого двигатель и сцепление быстро изнашиваются. Салон тоже страдает от большого количества водителей и пассажиров.',
					isOpen: false,
				},
				{
					title: 'Не найдены сведения о диагностике',
					text: 'В блоке представлены данные по оценке состояния автомобиля по результатам офлайн диагностики. В ходе диагностики специалисты проверяют состояние ЛКП, всех конструкций автомобиля, состояние салона, фактическую комплектацию и проводят небольшой тест-драйв.',
					isOpen: false,
				},
				{
					title: 'Не найдены сведения о техосмотрах',
					text: 'В данном блоке отображаются данные о прохождении техосмотра на основании данных диагностических карт ТС. Срок прохождения технического осмотра для автомобилей категории «B»: — первые четыре года — не требуется; — возраст от 4 до 10 лет — каждые 2 года; — старше 10 лет — ежегодно.',
					isOpen: false,
				},
				{
					title: 'Нет сведений о ввозе из-за границы',
					text: 'Данные из таможенной декларации, которую заполняет компания, осуществляющая ввоз транспортного средства на территорию РФ.',
					isOpen: false,
				},
				{
					title: 'Нет полиса ОСАГО',
					isOpen: false,
				},
				{
					title: 'Не найдены сведения об отзывных кампаниях',
					text: 'Для данного автомобиля не проводилось или нет действующих отзывных кампаний. Отзыв автомобиля представляет собой устранение выявленного брака. Практически все автомобильные производители периодически отзывают свои продукты для устранения дефектов.',
					isOpen: false,
				},
			]
		}
	},
	props: {
		offer: Object
	},
	mounted() {
		setTimeout(() => {
			this.ready = true
		}, 1000)
	}
}
</script>
