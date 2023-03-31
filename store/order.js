export const state = () => ({
    orderId: null,
    orderOffer: null
})
export const getters = {
    orderOffer(state) {
        return state.orderOffer
    },
    orderId(state) {
        return state.orderId
    }
}
export const mutations = {
    SET_ORDER_OFFER(state, data) {
        state.orderOffer = data
    },
    SET_ORDER_ID(state, data) {
        state.orderId = data
    },
}