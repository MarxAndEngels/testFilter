export const actions = {
    async request({rootState}, {query, variables}) {
        let assignVariables = {
            site_id: Number(rootState.settings.site_id)
        }
        let client = this.app.apolloProvider.defaultClient
        let params = {...assignVariables, ...variables}
        let removeEmptyParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));
        return await client.query(
            {
                query: query,
                variables: removeEmptyParams,
                fetchPolicy: 'no-cache'
            })
    },
    async requestPOST({rootState}, {query, variables}) {
        let assignVariables = {
            site_id: Number(rootState.settings.site_id)
        }
        let client = this.app.apolloProvider.defaultClient
        let params = {...assignVariables, ...variables}
        let removeEmptyParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));
        return await client.mutate(
            {
                mutation: query,
                variables: removeEmptyParams
            })
    },
}