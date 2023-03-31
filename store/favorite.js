export const state = () => ({
    likesArray: [],
})
export const getters = {
    likesArray: (state) => {
        return state.likesArray
    },

}
export const actions = {
    getLikes({commit}) {
        commit('SET_LIKES_ARRAY', localStorage.getItem('likes') ? localStorage.getItem('likes').split(',') : [])
    },
    async liked({commit, dispatch, state}, payload) {
        let likes = state.likesArray.map(item => item)
        let id = String(payload)
        if (likes.some(item => item === id)) {
            likes = likes.filter(item => item !== id)
        } else {
            likes.push(id)
        }
        await commit('SET_LIKES_ARRAY', likes)
        localStorage.setItem('likes', state.likesArray)


    },

}
export const mutations = {
    SET_LIKES_ARRAY(state, data) {
        state.likesArray = data
    }
}
