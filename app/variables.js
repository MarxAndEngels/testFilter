export const apiDomain = 'api.ac-sibtrakt.ru'
export const apiSlug = 'ac-sibtrakt'
export const domains = [
    //первый домен ГЛАВНЫЙ и используется для 'DEV'
    //если домен на кириллице, то домен в punycode
    {
        domain: 'ac-sibtrakt.ru',
        siteId: 109,
        catalogRoute: 'used',
        root: true
    },
    {
        domain: 'ac-vysota.ru',
        siteId: 107,
        catalogRoute: 'used',
        root: false
    }

]
export const mainDomain = domains.filter(value => value.root === true)[0]