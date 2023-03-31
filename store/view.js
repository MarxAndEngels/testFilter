export const state = () => ({
    view: 'long',
})

export const getters = {
    view(state) {
        return state.view
    }
}

export const mutations = {
    SET_VIEW(state, data) {
        state.view = data
    }
}
