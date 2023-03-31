export const state = () => ({
    crumbs: null,
})

export const getters = {
    crumbs(state) {
        return state.crumbs
    }
}

export const mutations = {
    SET_CRUMBS(state, data) {
        state.crumbs = data
    }
}
