import seoTags from "@/apollo/queries/seoTags";
import bank from "@/apollo/queries/bank/bank";
import {mapGetters, mapMutations} from "vuex";
import {mainDomain} from '~/app/variables'

export default {
    async asyncData({app, route, store, error}) {
        let site_id = store.getters['settings/site_id']
        let client = app.apolloProvider.defaultClient
        let seo = await client.query({
            query: seoTags,
            variables: {site_id: site_id, url: route.path === '/' ? '/home' : route.path}
        })
        if (route.params.bank) {
            try {
                let response = await client.query(
                    {
                        query: bank,
                        variables: {
                            site_id,
                            slug: route.params.bank,
                        }
                    })
                store.commit('banks/SET_BANK', response.data.bank)
            } catch (er) {
                error({statusCode: 404, message: '404'})
            }
        }
        if (seo.data.seoTag.title === null && seo.data.seoTag.page_title === null) {

            error({statusCode: 404, message: '404'})
        }
        store.commit('crumbs/SET_CRUMBS', seo.data.seoTag.crumbs)
        return {
            description: seo.data.seoTag.description,
            pageTitle: seo.data.seoTag.page_title,
            title: seo.data.seoTag.title,
            crumbs: seo.data.seoTag.crumbs
        }
    },
    methods: {
        ...mapMutations({
            setCrumbs: 'crumbs/SET_CRUMBS'
        }),
        makeUrl(slug) {
            return 'https://' + this.domain + slug
        },
        jsonld() {
            let result = []

            let breadcrumbs_items = this.crumbs?.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@id': this.makeUrl(item.link),
                    name: item.title,
                },
            }));

            const breadcrumbs = this.crumbs ? {
                type: 'application/ld+json',
                json: {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: breadcrumbs_items,
                }
            } : {}
            const seller = {
                type: 'application/ld+json',
                json: {
                    "@context": "https://schema.org/",
                    "@type": "Order",
                    "seller": {
                        "@type": "Organization",
                        "name": this.settings.dealer,
                        "telephone": this.settings.phone
                    }
                }
            }
            const organization = {
                type: 'application/ld+json',
                json: {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": this.settings.dealer,
                    "url": this.domain,
                    "logo": this.makeUrl('/about/dealer.jpg'),
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": this.settings.phone,
                        "contactType": "customer service",
                        "areaServed": "RU",
                        "availableLanguage": "Russian"
                    }
                }
            }
            result.push(breadcrumbs, seller, organization)

            if (this.$route.params.id && this.offer) {
                const product = {
                    type: 'application/ld+json',
                    json: {
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": this.offer?.name,
                        "image": this.offer?.images[0].medium,
                        "description": this.description,
                        "brand": this.offer?.mark.title,
                        "gtin14": 2918,
                        "sku": 2918,
                        "offers": {
                            "@type": "Offer",
                            "url": this.makeUrl(this.$route.fullPath),
                            "priceCurrency": "RUB",
                            "price": this.offer?.price,
                            "priceValidUntil": "2029-12-31",
                            "availability": `${this.offer?.is_active ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}`,
                            "itemCondition": "https://schema.org/UsedCondition"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": this.offer?.rating?.rating_total.toFixed() || 5,
                            "ratingCount": (Math.random() * (20 - 10) + 10).toFixed()
                        }
                    }
                }
                const qv = {
                    type: 'application/ld+json',
                    json: {
                        "@context": "https://schema.org/",
                        "@type": "QuantitativeValue",
                        "unitCode": "KMT",
                        "value": this.offer?.run
                    }
                }
                const oic = {
                    type: 'application/ld+json',
                    json: {
                        "@context": "https://schema.org/",
                        "@type": "OfferItemCondition",
                        "name": "used"
                    }
                }
                const es = {
                    type: 'application/ld+json',
                    json: {
                        "@context": "https://schema.org/",
                        "@type": "EngineSpecification",
                        "name": `${this.offer?.engine_volume} л. ${this.offer?.engine_power} л.с.`
                    }
                }

                result.push(product, qv, oic, es)
            }

            return result

        },
    },
    computed: {
        ...mapGetters({
            settings: 'settings/settings',
            domain: 'settings/domain'
        })
    },
    metaInfo() {
        let currentMeta = [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                vmid: 'desctiption',
                name: 'description',
                content: this.description
            },
            {
                vmid: 'og:type',
                property: 'og:type',
                content: 'website',
            },
            {
                vmid: 'og:url',
                property: 'og:url',
                content: 'https://' + this.domain + this.$route.fullPath,
            },
            {
                vmid: 'og:title',
                property: 'og:title',
                content: this.title,
            },
            {
                vmid: 'og:description',
                property: 'og:description',
                content: this.description
            },
            {
                vmid: 'og:image',
                property: 'og:image',
                content: this.offer ? this.offer.images[0].medium : 'https://' + this.domain + '/img/prevue.png'
            }
        ]
        if (this.domain !== mainDomain.domain) {
            currentMeta.push({
                name: 'robots',
                content: 'noindex, nofollow'
            })
        }
        return {
            title: this.title,
            link: [
                {
                    rel: 'canonical',
                    href: 'https://' + this.domain + this.$route.fullPath
                }
            ],
            meta: currentMeta,
            script: this.jsonld()
        }
    }
}