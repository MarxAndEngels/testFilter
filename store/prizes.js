export const state = () => ({
    prizes: [
        {
            text: 'Комплект шин в подарок',
            image: 'step-credit-1.png',
            slug: 'rezina',
        },
        {
            text: '300 литров бензина в подарок',
            image: 'step-credit-2.png',
            slug: 'benzin',
        },
        {
            text: 'КАСКО в подарок',
            image: 'step-credit-3.png',
            slug: 'kasko',
        },
    ]
})
export const getters = {
    prizes(state) {
        return state.prizes
    },
}