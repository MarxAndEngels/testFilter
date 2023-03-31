<template>
	<div class="footer">
		<div class="container">
			<div class="footer__label">
				Автоцентр «{{ settings.dealer }}»
			</div>
			<div class="footer__disclaimer">
				<p>
					Данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной
					офертой, определяемой положениями Статьи 437 Гражданского кодекса РФ. Для получения подробной информации о
					наличии и стоимости указанных товаров и (или) услуг, пожалуйста, обращайтесь к менеджерам
					автосалона.
				</p>
			</div>
			<div class="footer__legal"
			     v-if="settings.legal">
				{{ settings.legal }}
			</div>
			<div class="footer__disclaimer footer__disclaimer--border-top">
				<p>
					Годовая ставка автокредита варьируется от {{ settings.credit_percent }} до {{ settings.credit_max_percent }} и
					зависит от конкретного банка, суммы займа и
					кредитной программы. Минимальный срок погашения от 61 дня, максимальный - 84 месяца. При этом любые
					дополнительные комиссии автоцентром «{{ settings.dealer }}» не взимаются.
				</p>
				<p>
					В случае невозвращения в условленный срок суммы автокредита или суммы процентов по автокредиту банк-партнер
					оставляет за собой право начислить штраф за просрочку платежа в среднем размере 0,1% от первоначальной суммы
					автокредита. При несоблюдении условий погашения автокредита данные о нарушителе могут быть переданы в
					специальный реестр должников и коллекторское агентство для взыскания задолженности.
				</p>
				<p>
					Кредит предоставляется банком АО «Тинькофф Банк»,
				</p>
				<nuxt-link to="https://acdn.tinkoff.ru/static/documents/d7f200ac-6949-4baa-ab9b-186b11d6b168.pdf">Лицензия ЦБ РФ № 2673 от 11.04.2022</nuxt-link>
			</div>
			<div class="footer__disclaimer">
				<img class="footer__disclaimer-bank"
				     src="/img/logo-tinkoff.svg" />
				<p class="footer__disclaimer-bank-text">
					Обязательного страхования гражданской ответственности владельцев транспортных средств осуществляется АО
					«Тинькофф Страхование» по лицензии ОС № 0191-03 от 19.05.2015 г.
				</p>
			</div>
			<div class="footer__payment">
				<div class="footer__payment-title">
					Принимаем к оплате:
				</div>
				
				<div class="footer__payment-line">
					<img loading="lazy" data-src="/img/visa.svg" class="footer__payment-item lazyload" alt="visa">
					<img loading="lazy" data-src="/img/mastercard.svg" class="footer__payment-item lazyload" alt="mastercard">
					<img loading="lazy" data-src="/img/maestro.svg" class="footer__payment-item lazyload" alt="maestro">
					<img loading="lazy" data-src="/img/mir.svg" class="footer__payment-item lazyload" alt="mir">
				</div>
			
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>