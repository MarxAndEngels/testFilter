export const state = () => ({
    modal: null,

    //     open: false
    //     type: ''
    //     title: ''
    //     subtitle: ''
    //     offer: null

    marksModal: false
})
export const getters = {
    modal(state) {
        return state.modal
    },
    marksModal(state) {
        return state.marksModal
    }
}
export const mutations = {
    SET_MODAL(state, data) {
        state.modal = data
    },
    SET_MARKS_MODAL(state, data) {
        state.marksModal = data
    },
}
export const actions = {

    async openModal({commit}, payload) {
        window.history.pushState({ id: 1 }, null, "?q=111")
        await commit('SET_MODAL', payload)
    },
    async closeModal({commit}) {
        await commit('SET_MODAL', null)
    },
}
