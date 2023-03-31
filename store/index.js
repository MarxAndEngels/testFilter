import settings from '~/apollo/queries/settings'
import markFolderGeneration from '~/apollo/queries/markFolderGeneration'
import {domains, mainDomain} from '~/app/variables'

export const actions = {
    async nuxtServerInit({dispatch, commit, state}, {app, req}) {

        let filteredDomain = domains.filter(value => value.domain === req.headers.host)
        let currentDomain = filteredDomain.length ?  filteredDomain[0] : mainDomain

        await commit('settings/SET_SITE_ID', currentDomain.siteId)
        await commit('settings/SET_DOMAIN', currentDomain.domain)
        await commit('settings/SET_CATALOG_ROUTE', currentDomain.catalogRoute)

        let client = app.apolloProvider.defaultClient
        let response = await client.query(
            {
                query: markFolderGeneration,
                variables: {
                    site_id: currentDomain.siteId
                }
            })
        let count = 0
        response.data.markFolderGeneration.map((item) => count += item.offers_count)
        await commit('marks/SET_MARKS', response.data.markFolderGeneration)
        await commit('marks/SET_MARKS_COUNT', count)

        let currentSettings = {}
        let settingsResponse = await client.query(
            {
                query: settings,
                variables: {
                    site_id: currentDomain.siteId
                }
            })
        settingsResponse.data.settings.settings.map(value => {
            currentSettings[value.key] = value.value
        })
        commit('settings/SET_SETTINGS', currentSettings)
    },

}