export const state = () => ({
    thanksOffer: null,
    feedbackId:null
})

export const getters = {
    thanksOffer(state) {
        return state.thanksOffer
    },
    feedbackId(state) {
        return state.feedbackId
    },
}

export const mutations = {
    SET_THANKS_OFFER(state, data) {
        state.thanksOffer = data
    },
    SET_FEEDBACK_ID(state, data) {
        state.feedbackId = data
    }
}
