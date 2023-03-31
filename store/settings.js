import punycode from "punycode"
export const state = () => ({
    catalogRoute: 'cars',
    site_id: null,
    domain: '',
    settings: {}
})

export const getters = {
    catalogRoute: (state) => {
        return state.catalogRoute
    },
    settings: (state) => {
        return state.settings
    },
    site_id: state => {
        return state.site_id
    },
    site_id_mirror: state => {
        return state.site_id_mirror
    },
    domain: state => {
        return punycode.toUnicode(state.domain)
    },
}
export const mutations = {
    SET_SETTINGS(state, data) {
        state.settings = data
    },
    SET_CATALOG_ROUTE(state, data) {
        state.catalogRoute = data
    },
    SET_SITE_ID(state, data) {
        state.site_id = data
    },
    SET_DOMAIN(state, data) {
        state.domain = data
    }
}
