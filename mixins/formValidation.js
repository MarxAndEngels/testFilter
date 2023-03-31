import {mapGetters, mapActions, mapMutations} from "vuex";
import feedback from '@/apollo/mutations/feedback.gql'

export default {
    data() {
        return {
            form: {
                paymentValue: "0 %",
                periodValue: "84 мес",
                mark: {
                    valid: null,
                    value: '',
                },
                model: {
                    valid: null,
                    value: '',
                },
                year: {
                    valid: null,
                    value: 'Год',
                },
                gearbox: {
                    valid: null,
                    value: 'КПП',
                },
                engineType: {
                    valid: null,
                    value: 'Двигатель',
                },
                run: {
                    valid: null,
                    value: '',
                },
                owners: {
                    valid: null,
                    value: '',
                },
                price: {
                    valid: null,
                    value: '',
                },
                car: {
                    valid: null,
                    value: '',
                },
                location: {
                    valid: null,
                    value: null,
                },
                client_car: {
                    valid: null,
                    value: '',
                },
                name: {
                    valid: null,
                    value: '',
                },
                date: {
                    valid: null,
                    value: ''
                },
                phone: {
                    valid: null,
                    value: ''
                },
                agree: true,
                agreeRf: true,
            },
            error: ''
        }
    },
    computed: {
        ...mapGetters({
            modalOffer: 'modal/modalOffer',
            marks: 'marks/marks',
            site_id: 'settings/site_id'
        }),
        years_range() {
            let min_year = 2003
            let a = []
            while (min_year < new Date().getFullYear() + 1) {
                a.push(min_year)
                min_year++
            }
            return a;
        },
        gearboxes() {
            return [
                'АКПП',
                'МКПП',
                'Вариатор',
                'Робот'
            ]
        },
        engineTypes() {
            return [
                'Дизельный',
                'Бензиновый',
                'Гибридный',
            ]
        },
        //ВАШ АВТОМОБИЛЬ
        car_valid() {
            return this.form.car.value.length >= 2
        },
        car_invalid() {
            return this.form.car.valid === false
        },
        carClass() {
            if (this.car_valid) {
                return 'form__field-wrap--success'
            } else if (this.car_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //МАРКА
        mark_valid() {
            return this.form.mark.value.length >= 2
        },
        mark_invalid() {
            return this.form.mark.valid === false
        },
        markClass() {
            if (this.mark_valid) {
                return 'form__field-wrap--success'
            } else if (this.mark_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //ЦЕНА
        price_valid() {
            return this.form.price.value.length >= 2
        },
        price_invalid() {
            return this.form.price.valid === false
        },
        priceClass() {
            if (this.price_valid) {
                return 'form__field-wrap--success'
            } else if (this.price_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //МОДЕЛЬ
        model_valid() {
            return this.form.model.value.length >= 1
        },
        model_invalid() {
            return this.form.model.valid === false
        },
        modelClass() {
            if (this.model_valid) {
                return 'form__field-wrap--success'
            } else if (this.model_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //ГОД
        year_valid() {
            return this.form.year.value !== 'Год от'
        },
        year_invalid() {
            return this.form.year.valid === false
        },
        yearClass() {
            if (this.year_valid) {
                return 'form__field-wrap--success'
            } else if (this.year_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //ВЛАДЕЛЬЦЫ
        owners_valid() {
            return this.form.owners.value !== null
        },
        owners_invalid() {
            return this.form.year.valid === false
        },
        ownersClass() {
            if (this.owners_valid) {
                return 'form__field-wrap--success'
            } else if (this.owners_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //КОРОБКА
        gearbox_valid() {
            return this.form.gearbox.value !== 'КПП'
        },
        gearbox_invalid() {
            return this.form.gearbox.valid === false
        },
        gearboxClass() {
            if (this.gearbox_valid) {
                return 'form__field-wrap--success'
            } else if (this.gearbox_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //ДВИГАТЕЛЬ
        engine_type_valid() {
            return this.form.engineType.value !== 'Двигатель'
        },
        engine_type_invalid() {
            return this.form.engineType.valid === false
        },
        engineTypeClass() {
            if (this.engine_type_valid) {
                return 'form__field-wrap--success'
            } else if (this.engine_type_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //ПРОБЕГ
        run_valid() {
            return this.form.run.value.length >= 1
        },
        run_invalid() {
            return this.form.run.valid === false
        },
        runClass() {
            if (this.run_valid) {
                return 'form__field-wrap--success'
            } else if (this.run_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //ФИО
        name_valid() {
            return this.form.name.value.length >= 2
        },
        name_invalid() {
            return this.form.name.valid === false
        },
        nameClass() {
            if (this.name_valid) {
                return 'form__field-wrap--success'
            } else if (this.name_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //Дата рождения
        date_valid() {
            return this.form.date.valid
        },
        date_invalid() {
            return this.form.date.valid === false
        },
        dateClass() {
            if (this.date_valid) {
                return 'form__field-wrap--success'
            } else if (this.date_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //Прописка
        location_valid() {
            return this.form.location.valid
        },
        location_invalid() {
            return this.form.location.valid === false
        },
        locationClass() {
            if (this.location_valid) {
                return 'form__field-wrap--success'
            } else if (this.location_invalid) {
                return 'form__field-wrap--error'
            }
        },
        //Телефон
        phone_valid() {
            return this.form.phone.valid
        },
        phone_invalid() {
            return this.form.phone.valid === false
        },
        phoneClass() {
            if (this.phone_valid) {
                return 'form__field-wrap--success'
            } else if (this.phone_invalid) {
                return 'form__field-wrap--error'
            }
        },
    },
    methods: {
        ...mapMutations({
            setOrderId: 'order/SET_ORDER_ID',
            setOrderOffer: 'order/SET_ORDER_OFFER',
        }),
        ...mapActions({
            closeModal: 'modal/closeModal',
            requestPOST: 'request/requestPOST'
        }),
        changeCheckbox($event, type) {
            this.form[type] = $event
            this.error = ''
        },
        handlerInput(type) {
            this.form[type].valid = null
        },
        changeSelect($event, type) {
            this.form[type].valid = null
            this.form[type].value = $event
        },

        addCreditData(object) {
            if (this.modalOffer) {
                object.external_id = this.modalOffer.external_id
            } else if (this.chosenOffer) {
                object.external_id = this.chosenOffer.external_id
            }

            object.credit_initial_fee = this.form.paymentValue.toString()
            object.credit_period = this.form.periodValue.toString()

            console.log(this.form.paymentValue)
            console.log(this.form.periodValue)
            console.log(object)
        },
        addExchangeData(object) {
            if (this.modalOffer) {
                object.external_id = this.modalOffer.external_id
            } else if (this.chosenOffer) {
                object.external_id = this.chosenOffer.external_id
            }

            object.client_vehicle_mark = this.form.mark.value
            object.client_vehicle_model = this.form.model.value
            object.credit_initial_fee = this.form.paymentValue.toString()
            object.credit_period = this.form.periodValue.toString()
        },
        addBuyoutData(object) {
            if (this.modalOffer) {
                object.external_id = this.modalOffer.external_id
            } else if (this.chosenOffer) {
                object.external_id = this.chosenOffer.external_id
            }
            object.client_vehicle_mark = this.form.mark.value
            object.client_vehicle_model = this.form.model.value
            object.client_vehicle_run = this.form.run.value
            object.client_vehicle_year = '' + this.form.year.value
            object.client_vehicle_owners = '' + this.form.owners.value
            object.client_vehicle_gearbox = '' + this.form.gearbox.value
        },
        addCallBackData(object){
            if (this.modalOffer) {
                object.external_id = this.modalOffer.external_id
            } else if (this.chosenOffer) {
                object.external_id = this.chosenOffer.external_id
            }
        },
        addUtmData(object) {
            if (localStorage.utm_source) {
                object.utm_source = localStorage.utm_source
            }
            if (localStorage.utm_medium) {
                object.utm_medium = localStorage.utm_medium
            }
            if (localStorage.utm_campaign) {
                object.utm_campaign = localStorage.utm_campaign
            }
            if (localStorage.utm_term) {
                object.utm_term = localStorage.utm_term
            }
            if (localStorage.utm_content) {
                object.utm_content = localStorage.utm_content
            }
        },
        checkForm(type) {
            if (type === 'credit') {
                //если модалка с уже выбранной тачкой
                if (this.modal && this.modalOffer) {
                    // console.log('offer:', this.modalOffer)
                } else {
                    if (!this.chosenOffer) {
                        this.error = 'choseCar'
                        return false
                    }
                }
            }
            //проверяю основные поля
            if (this.form.name.value.length < 2) {
                this.form.name.valid = false
                return false
            }
            if (!this.form.phone.valid) {
                this.form.phone.valid = false
                return false
            }

            // if (type === 'callback' || type === 'buyout' || type === 'trade-in') {
            // } else {
            //     if (this.form.date.value === '' || this.form.date.value.split('_').length > 1) {
            //         this.form.date.valid = false
            //         return false
            //     }
            // }
            if(!this.form.phone.value || this.form.phone.value.split('_').length !== 1){
                this.form.phone.valid = false
                return false;
              }


            // if (!this.form.agree) {
            //     this.error = 'agree'
            //     return false
            // }
            // if (!this.form.agreeRf) {
            //     this.error = 'agreeRf'
            //     return false
            // }

            // динамичные поля


            return true
            // if (this.hasChose) {
            //     if (!this.currentCar) {
            //         this.error = 'invalid_car'
            //         setTimeout(function () {
            //             window.scrollTo(0, -100);
            //         }, 1);
            //         return false
            //     }
            // }

            // return true;
        },

        async submitForm(type) {
            if (this.checkForm(type)) {
                let formData = {
                    site_id: this.site_id,
                    type: type,
                    client_name: this.form.name.value,
                    client_phone: this.form.phone.value,
                    client_age: this.form.date.value,
                }
                if (type === 'credit') {
                    await this.addCreditData(formData)
                }
                if (type === 'trade-in') {
                    await this.addExchangeData(formData)
                }
                if (type === 'buyout') {
                    await this.addBuyoutData(formData)
                }
                if (type === 'callback') {
                    await this.addCallBackData(formData)
                }
                // utm
                await this.addUtmData(formData)
                await this.sendForm(formData)
                await this.closeModal()
            }
        },
        async sendForm(variables) {
            try {
                let response = await this.requestPOST({
                    query: feedback,
                    variables
                })
                await this.setOrderOffer(this.modalOffer || this.chosenOffer)
                await this.setOrderId(response.data.feedback.id)
                await this.$router.push('/thanks')
                await this.closeModal()
            } catch (error) {
                console.log(error)
                this.$nuxt.error({statusCode: 404})
            }

        }
    }
}