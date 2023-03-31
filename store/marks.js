export const state = () => ({
    marks: [],
    marksCount: null,
    popularMarks: [
        'toyota', 'hyundai', 'mitsubishi', 'honda', 'chevrolet', 'ford', 'kia', 'mazda', 'nissan', 'lada-vaz'
    ],
})

export const getters = {
    marks(state) {
       // state.marks.map(item => {
       //      if(item.title === 'Mercedes-Benz'){
       //          item.title = 'Mercedes'
       //      }
       //      return item
       //  })
        return state.marks
    },
    marksCount(state) {
        return state.marksCount
    },
    popularMarks: (state) => {
        return state.popularMarks
    }
}

export const mutations = {
    SET_MARKS(state, data) {
        const popular = state.popularMarks.map((name) => data.find((mark) => mark.slug === name));
        state.popularMarks = popular
        state.marks = data
    },
    SET_MARKS_COUNT(state, data) {
        state.marksCount = data
    }
}
