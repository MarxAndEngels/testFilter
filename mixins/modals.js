import {mapActions, mapGetters} from "vuex"

export default {
    methods: {
        ...mapActions({
            openModal: 'modal/openModal',
            closeModal: 'modal/closeModal',
            openAutoteka:'modal/openAutoteka',
            closeAutoteka:'modal/closeAutoteka'
        })
    },
    computed: {
        ...mapGetters({
            modalTitle: 'modal/modalTitle',
            modalSubTitle: 'modal/modalSubTitle'
        })
    }
}