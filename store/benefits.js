export const state = () => ({
    benefitsCredit: ['guarantee', 'credit_first', 'credit_approve', 'sale_credit'],
    benefitsTradeIn: ['market_price', 'trade_in_guarantee', 'credit_approve', 'sale_tradein'],
    benefitsBuyout: ['market_price', 'free', 'appraiser',  'fast_pay'],
    benefits: [
        {
            text: 'Гарантия',
            slug: 'guarantee',
            icon: 'guarantee'
        },
        {
            text: 'Первый взнос от ',
            slug: 'credit_first',
            icon: 'credit'
        },
        {
            text: 'Одобрение',
            slug: 'credit_approve',
            icon: 'docs'
        },
        {
            text: 'Скидка <br/>',
            slug: 'sale_credit',
            icon: 'percent'
        },
        {
            text: 'Гарантия',
            slug: 'trade_in_guarantee',
            icon: 'guarantee'
        },
        {
            text: 'Выгода до <br/>',
            slug: 'sale_tradein',
            icon: 'percent'
        },
        {
            text: 'Рыночная цена',
            slug: 'market_price',
            icon: 'credit'
        },
        {
            text: 'Мгновенная выплата',
            slug: 'fast_pay',
            icon: 'guarantee'
        },
        {
            text: 'Бесплатная диагностика',
            slug: 'free',
            icon: 'guarantee'
        },
        {
            text: 'Выезд оценщика',
            slug: 'appraiser',
            icon: 'docs'
        },
    ]
})
export const getters = {
    benefits(state) {
        return state.benefits
    },
    benefit: (state) => {
        return state.benefit
    },
    benefitsCredit: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsCredit.indexOf(item.slug) !== -1;
        })
    },
    benefitsTradeIn: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsTradeIn.indexOf(item.slug) !== -1;
        })
    },
    benefitsBuyout: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsBuyout.indexOf(item.slug) !== -1;
        })
    },
    benefitsCar: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsCar.indexOf(item.slug) !== -1;
        })
    },
    benefitsCreditMobile: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsCreditMobile.indexOf(item.slug) !== -1;
        })
    },
    benefitModal: (state) => {
        return state.benefitModal
    },
}