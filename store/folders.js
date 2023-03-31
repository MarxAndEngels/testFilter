export const state = () => ({
    folders: []
})

export const getters = {
    folders(state) {
        return state.folders
    },
}

export const mutations = {
    SET_FOLDERS(state, data) {
        state.folders = data
    }
}
