export const state = () => ({
    banks: [],
    bank: null,
})

export const getters = {
    banks(state) {
        return state.banks
    },
    bank(state) {
        return state.bank
    }
}

export const mutations = {
    SET_BANKS(state, data) {
        state.banks = data
    },
    SET_BANK(state, data) {
        state.bank = data
    }
}
