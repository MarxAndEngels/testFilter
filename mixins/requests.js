import {mapActions, mapGetters, mapMutations} from "vuex"
import folders from "@/apollo/queries/folders";
import generations from "@/apollo/queries/generations";
import offers from "@/apollo/queries/offer/offers";
import offer from "@/apollo/queries/offer/offer";
import banks from "@/apollo/queries/bank/banks";
import {apiDomain} from '~/app/variables'

export default {
    computed: {
        ...mapGetters({
            banks: 'banks/banks'
        })
    },
    methods: {
        ...mapMutations({
            setFolders: 'folders/SET_FOLDERS',
            setGenerations: 'generations/SET_GENERATIONS',
            setOffers: 'offers/SET_OFFERS',
            setNodata: 'offers/SET_NODATA',
            setBanks: 'banks/SET_BANKS',
        }),
        ...mapActions({
            request: 'request/request',
            requestPost: 'request/requestPOST'
        }),
        //TODO запрос на список банков
        async getBanks() {
            try {
                if (!this.banks.length) {
                    let response = await this.request({
                        query: banks,
                    })
                    let rootApiLink = 'https://api.carro.ru/'
                    let localApiLink = `https://${apiDomain}/`

                    let banksList = response.data.banks.map((bank) => {
                        bank.image = bank.image.replace(rootApiLink, localApiLink)
                        bank.license_file = bank.license_file.replace(rootApiLink, localApiLink)
                        return bank;
                    })
                    this.setBanks(banksList)
                }
            } catch {
                return this.$nuxt.error({statusCode: 404, message: '404'})
            }
        },
        //TODO запрос на модели
        async getFolders(mark_slug, needStore) {
            if (needStore) {
                await this.setFolders([])
            }

            try {
                let response = await this.request({
                    query: folders,
                    variables: {mark_slug}
                })
                if (needStore) {
                    await this.setFolders(response.data.folders)
                } else {
                    return response.data.folders
                }
            } catch {
                return this.$nuxt.error({statusCode: 404, message: '404'})
            }
        },
        //TODO запрос на поколения
        async getGenerations(mark_slug, folder_slug) {
            await this.setGenerations([])
            try {
                let response = await this.request({
                    query: generations,
                    variables: {folder_slug}
                })
                await this.setGenerations(response.data.generations)
            } catch {
                return this.$nuxt.error({statusCode: 404, message: '404'})
            }
        },
        //TODO запрос на список тачек
        async getOffers(variables) {
            try {
                let response = await this.request({
                    query: offers,
                    variables: variables
                })
                return response.data.offers

            } catch (e) {
                return this.$nuxt.error({statusCode: 404, message: '404'})
            }
        },
        //TODO запрос на автомобиль
        async getOffer(variables) {
            try {
                let response = await this.request({
                    query: offer,
                    variables: variables
                })
                return response.data.offer

            } catch (e) {
                return this.$nuxt.error({statusCode: 404, message: '404'})
            }
        },
        //TODO запрос на список лайкнутых тачек
        async getFavoriteOffers(variables) {
            try {
                let response = await this.request({
                    query: offers,
                    variables: variables
                })
                return response.data.offers.data
            } catch (e) {
                return this.$nuxt.error({statusCode: 404, message: '404'})
            }
        }
    }
}