export const state = () => ({
    filters: {},
    showFilters: true,
    chosen: null,
})

export const getters = {
    filters(state) {
        return state.filters
    },
    showFilters(state) {
        return state.showFilters
    },
    chosen(state) {
        return state.chosen
    }
}

export const mutations = {
    SET_FILTERS(state, data) {
        state.filters = data
    },
    SET_CHOSEN(state, data) {
        state.chosen = data
    },
    SET_SHOW_FILTERS(state, data) {
        state.showFilters = data
    },
}
