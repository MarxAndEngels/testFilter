export const state = () => ({
    generations: []
})

export const getters = {
    generations(state) {
        return state.generations
    },
}

export const mutations = {
    SET_GENERATIONS(state, data) {
        state.generations = data
    }
}
