export const state = () => ({
    offer: null,
})
export const getters = {
    offer(state) {
        return state.offer
    }
}
export const mutations = {
    SET_OFFER(state, data) {
        state.offer = data
    }
}