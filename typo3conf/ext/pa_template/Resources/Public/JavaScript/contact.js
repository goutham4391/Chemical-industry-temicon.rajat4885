document.addEventListener('DOMContentLoaded', function () {
    var endpoint = '/api/contact';
    var baseUrl = 'https://' + window.location.hostname;
    //var baseUrl = 'https://www.temicon.com';


    Vue.component('product-group-filter', {
        props: [
            'groups',
            'changed',
            'language',
            'close'
        ],
        model: {
            prop: 'changed',
            event: 'change'
        },
        computed: {
            productGroup: function () {
                switch (this.language) {
                    case 'de':
                        return 'Produktgruppe'
                    case 'cn':
                        return 'Product group'
                    default:
                        return 'Product group'
                }
            },
            productGroupSelect: function () {
                switch (this.language) {
                    case 'de':
                        return 'Bitte Produktgruppe wählen'
                    case 'cn':
                        return 'Select product group'
                    default:
                        return 'Select product group'
                }
            },

        },
        watch: {
            close: function(val) {
                this.closeDropDown()
            }
        },
        data() {
            return {
                'groups': [],
                'selectedValue': '',
                selected: [],
                selectedValues: [],
                label: '',
                'selectName' : 'product-group-filter'
            }
        },
        mounted: function mounted() {

        },
        methods: {
            changeValue: function (value) {
                this.$refs.select.value = value
                this.selectedValue = value
                this.syncValue()
                this.closeDropDown()
            },
            triggerChange() {
                this.$emit('changed', this.selectedValue)
            },
            triggerOpened() {
                this.$emit('opened', this.selectName)
            },
            toggleDropDown: function () {
                this.$refs.field.classList.toggle('open')
                this.triggerOpened()
            },
            openDropDown: function () {
                this.$refs.field.classList.add('open')
            },
            closeDropDown: function () {
                this.$refs.field.classList.remove('open')
            },
            syncValue: function () {
                this.selected = this.$refs.select.selectedOptions

                let optionLabels = []
                this.selectedValues = []
                for (let i = 0; i < this.selected.length; i++) {
                    this.selectedValues.push(this.selected[i].value)
                    optionLabels.push(this.selected[i].text)
                }

                this.label = optionLabels.join(', ')
                this.triggerChange()
            },
        },
        /*template: '<div class="field">' +
            '<div class="product-group-filter">' +
            '<label class="label" for="product-group-filter">{{ productGroup }}</label>' +
            '<select class="v-select__field" name="product-group-filter" v-model="selected" v-on:change="triggerChange()">' +
            '<option value="">{{ productGroupSelect }}</option>' +
            '<option v-for="group in groups" :value="group.uid">{{ group.name }}</option>' +
            '</input>' +
            '</select>' +
            '</div>' +
            '</div>'*/
        template:
            '<div class="field">' +
            '<div class="v-select product-group-filter">' +
            '<label class="label" for="product-group-filter">{{ productGroup }}</label>' +
            ' <select @change="syncValue" @focus="openDropDown" @blur="closeDropDown" @keydown.enter="closeDropDown" class="v-select__input" tabindex="0" ref="select" v-model="selectedValue"><option v-for="group in groups" :value="group.uid" v-if="group.uid != 7">{{ group.name }}</option></select>' +
            ' <div aria-hidden="true" class="v-select__field" ref="field">' +
            '   <div class="v-select__label" @click="toggleDropDown">{{ label == "" ? productGroupSelect : label }}</div>' +
            '   <div class="option-wrapper" ref="dropdown">' +
            '     <div class="option" :class="{active: selectedValues.includes(group.uid)}" v-for="group in groups" @click="changeValue(group.uid)" v-if="group.uid != 7">{{ group.name }}</div>' +
            '   </div>' +
            ' </div>' +
            '</div>' +
            '</div>'
    })

    Vue.component('continent-filter', {
        props: [
            'continents',
            'disabled',
            'changed',
            'language',
            'close'
        ],
        model: {
            prop: 'changed',
            event: 'change'
        },
        computed: {
            continent: function () {
                switch (this.language) {
                    case 'de':
                        return 'Kontinent'
                    case 'cn':
                        return 'Continent'
                    default:
                        return 'Continent'
                }
            },
            continentSelect: function () {
                switch (this.language) {
                    case 'de':
                        return 'Bitte Kontinent wählen'
                    case 'cn':
                        return 'Select continent'
                    default:
                        return 'Select continent'
                }
            },
            disabledClass: function () {
                if(this.disabled) {
                    return 'v-select__field disabled'
                } else {
                    return 'v-select__field'
                }
            },

        },
        watch: {
            close: function(val) {
                this.closeDropDown()
            }
        },
        data() {
            return {
                'countries': [],
                'disabled': true,
                //'selected': '',
                'selectedValue': '',
                selected: [],
                selectedValues: [],
                label: '',
                'selectName' : 'continent-filter'
            }
        },
        mounted: function mounted() {
        },
        methods: {
            changeValue: function (value) {
                this.$refs.select.value = value
                this.selectedValue = value
                this.syncValue()
                this.closeDropDown()
            },
            triggerChange() {
                this.$emit('changed', this.selectedValue)
            },
            triggerOpened() {
                this.$emit('opened', this.selectName)
            },
            toggleDropDown: function () {
                this.$refs.field.classList.toggle('open')
                this.triggerOpened()
            },
            openDropDown: function () {
                this.$refs.field.classList.add('open')
            },
            closeDropDown: function () {
                this.$refs.field.classList.remove('open')
            },
            syncValue: function () {
                this.selected = this.$refs.select.selectedOptions


                let optionLabels = []
                this.selectedValues = []
                for (let i = 0; i < this.selected.length; i++) {
                    this.selectedValues.push(this.selected[i].value)
                    optionLabels.push(this.selected[i].text)
                }

                this.label = optionLabels.join(', ')
                this.triggerChange()
            },

            translateName(continent) {
                switch (this.language) {
                    case 'de':
                        return continent.nameDe
                    case 'cn':
                        if(continent.nameZh == '') {
                            return continent.nameEn
                        } else {
                            return continent.nameZh
                        }
                    default:
                        return continent.nameEn
                }

            }
        },
        template: '<div class="field">' +
            '<div class="v-select continent-filter">' +
            '<label class="label" for="continent-filter">{{ continent }}</label>' +
            ' <select @change="syncValue" @focus="openDropDown" @blur="closeDropDown" @keydown.enter="closeDropDown" class="v-select__input" tabindex="0" ref="select" v-model="selectedValue"><option v-for="continent in continents" :value="continent.unCodeNumber" :disabled="disabled">{{ translateName(continent) }}</option></select>' +
            ' <div aria-hidden="true" v-bind:class="disabledClass" ref="field">' +
            '   <div class="v-select__label" @click="toggleDropDown">{{ label == "" ? continentSelect : label }}</div>' +
            '   <div class="option-wrapper" ref="dropdown">' +
            '     <div class="option" :class="{active: selectedValues.includes(continent.unCodeNumber)}" v-for="continent in continents" @click="changeValue(continent.unCodeNumber)">{{ translateName(continent) }}</div>' +
            '   </div>' +
            ' </div>' +
            '</div>' +
            '</div>'

    })

    Vue.component('country-filter', {
        props: [
            'countries',
            'disabled',
            'changed',
            'language',
            'close'
        ],
        data() {
            return {
               // 'countries': [],
                'disabled': true,
                //'selected': ''
                'selectedValue': '',
                selected: [],
                selectedValues: [],
                label: '',
                'selectName' : 'country-filter'
            }
        },

        computed: {
            country: function () {
                switch (this.language) {
                    case 'de':
                        return 'Land'
                    case 'cn':
                        return 'Country'
                    default:
                        return 'Country'
                }
            },
            countrySelect: function () {
                switch (this.language) {
                    case 'de':
                        return 'Bitte Land wählen'
                    case 'cn':
                        return 'Select country'
                    default:
                        return 'Select country'
                }
            },
            disabledClass: function () {
                if(this.disabled) {
                    return 'v-select__field disabled'
                } else {
                    return 'v-select__field'
                }
            }
        },

        watch: {
            countries: function(val) {
                this.label = ''
            },
            close: function(val) {
                this.closeDropDown()
            }
        },

        mounted: function mounted() {
        },
        methods: {
            translateName(country) {
                switch (this.language) {
                    case 'de':
                        return country.nameDe
                    case 'cn':
                        return country.nameZh
                    default:
                        return country.nameEn
                }
            },
            changeValue: function (value) {
                this.$refs.select.value = value
                this.selectedValue = value
                this.syncValue()
                this.closeDropDown()
            },
            triggerChange() {
                this.$emit('changed', this.selectedValue)
            },
            triggerOpened() {
                this.$emit('opened', this.selectName)
            },
            toggleDropDown: function () {
                this.$refs.field.classList.toggle('open')
                this.triggerOpened()
            },
            openDropDown: function () {
                this.$refs.field.classList.add('open')
            },
            closeDropDown: function () {
                this.$refs.field.classList.remove('open')
            },
            syncValue: function () {
                this.selected = this.$refs.select.selectedOptions

                let optionLabels = []
                this.selectedValues = []
                for (let i = 0; i < this.selected.length; i++) {
                    this.selectedValues.push(this.selected[i].value)
                    optionLabels.push(this.selected[i].text)
                }

                this.label = optionLabels.join(', ')
                this.triggerChange()
            },
        },
        template: '<div class="field">' +
            '<div class="v-select country-filter">' +
            '<label class="label" for="country-filter">{{ country }}</label>' +
            ' <select @change="syncValue" @focus="openDropDown" @blur="closeDropDown" @keydown.enter="closeDropDown" class="v-select__input" tabindex="0" ref="select" v-model="selectedValue"><option v-for="country in countries" :value="country.id" :disabled="disabled">{{ translateName(country) }}</option></select>' +
            ' <div aria-hidden="true" v-bind:class="disabledClass" ref="field">' +
            '   <div class="v-select__label" @click="toggleDropDown">{{ label == "" ? countrySelect : label }}</div>' +
            '   <div class="option-wrapper" ref="dropdown">' +
            '     <div class="option" :class="{active: selectedValues.includes(country.id)}" v-for="country in countries" @click="changeValue(country.id)">{{ translateName(country) }}</div>' +
            '   </div>' +
            ' </div>' +
            '</div>' +
            '</div>'
    })

    Vue.component('contacts-bodytext', {
        props: [
            'contacts',
            'imageHidden'
        ],
        data() {
            return {
                'contacts': [],
            }
        },
        computed: {
            imageHiddenClass: function () {
                if(this.imageHidden) {
                    return 'hidden'
                } else {
                    return '';
                }
            }
        },
        mounted: function mounted() {
        },
        methods: {},
        template: '<div class="contacts-bodytext" v-bind:class="imageHiddenClass">' +
            '<contact-card v-for="contact in contacts" :contact="contact"/>' +
            '</div>'
    })

    Vue.component('contact-card', {
        props: [
            'contact',
        ],
        data() {
            return {
                'contact': [],
            }
        },
        mounted: function mounted() {
        },
        methods: {},
        template: '<div class="contact-card">' +
            '<img class="contact-image" :src="contact.image" v-if="contact.image" width="100" height=""/>' +
            '<div class="card-body">' +
            '<header><h3>{{ contact.name }}</h3></header>' +
            '<div class="card-content" v-html="contact.text"></div>' +
            '</div>' +
            '</div>'
    })


    var contactApp = new Vue({
        el: "#contact-app",
        data: {
            countries: [],
            allCountries: [],
            continents: [],
            groups: [],
            selectedGroup: '',
            selectedCountry: '',
            categories: [],
            loading: false,
            contacts: [],
            allContacts: [],
            content: {},
            countrySelectDisabled: true,
            continentSelectDisabled: true,
            language: 'en',
            imageHidden : false,
            closeProductGroupFilter: false,
            closeCountry: false,
            closeContinent: false

        },
        mounted: function mounted() {
            var _this = this;

            _this.setLanguage()

            _this.fetchData()

        },
        watch: {
            contacts(val) {
                if(val.length > 0) {
                    this.imageHidden = true;
                } else {
                    this.imageHidden = false;
                }
            }
        },
        methods: {
            fetchData: function fetchData() {
                var app = this;
                var request = new XMLHttpRequest();
                var query = baseUrl + endpoint;
                app.loading = true;
                var postData = new FormData();
                request.open('GET', query, true);

                request.onload = function () {
                    var _this2 = this;

                    if (this.status >= 200 && this.status < 400) {
                        (function () {
                            var data = JSON.parse(_this2.response);

                            data = data.content.colPos0[0].content.data

                            app.allContacts = data.contacts
                            app.countries = data.countries


                            let countriesUnsorted = data.countries;
                            app.countries = app.sortData(countriesUnsorted, app.language);

                            app.allCountries = data.countries

                            let continentsUnsorted = data.continents

                            app.continents = app.sortData(continentsUnsorted, app.language);

                            app.groups = data.categories

                        })();
                    }

                    app.loading = false;
                };

                request.onerror = function () {
                };

                request.send(postData);
            },

            sortData(data, language) {
                data.sort(function (a, b) {
                    switch (language) {
                        case 'de':
                            //var keyCountry  = 'nameDe'
                            var keyA = new String(a.nameDe),
                                keyB = new String(b.nameDe);
                            break;
                        case 'cn':
                            //var keyCountry  = 'nameZh'
                            var keyA = new String(a.nameZh),
                                keyB = new String(b.nameZh);
                            break
                        default:
                            //var keyCountry  = 'nameEn'
                            var keyA = new String(a.nameEn),
                                keyB = new String(b.nameEn);
                    }

                    return keyA.localeCompare(keyB);
                });

                return data
            },


            handleProductGroupChange(value) {
                if (value !== '') {
                //    this.countrySelectDisabled = false;
                    this.continentSelectDisabled = false;
                    this.selectedGroup = value;
                } else {
                    //this.countrySelectDisabled = true;
                    this.continentSelectDisabled = true;
                    this.selectedGroup = 0;
                }

                this.filterContacts()
            },

            handleContinentChange(value) {
                this.selectedCountry = ""
                this.contacts = []
                if (value !== '') {
                    this.countrySelectDisabled = false;
                 //   this.continentSelectDisabled = false;
                    //this.selectedGroup = value;
                } else {
                    this.countrySelectDisabled = true;
                  //  this.continentSelectDisabled = true;
                    this.selectedGroup = 0;
                }

                this.filterCountries(value)

                this.filterContacts()
            },

            filterCountries(value) {
                if (value !== '') {

                    var allCountries = this.allCountries;

                    this.countries = [];

                    for (let i = 0; i < allCountries.length; i++) {
                        if (allCountries[i].continent == value) {
                            this.countries.push(allCountries[i]);
                        }
                    }

                } else {

                }
                // this.selectedGroup = value;
            },

            countryEventFunction(value) {

                this.contacts = [];
                if (value !== '') {
                    this.selectedCountry = value;

                } else {

                }
                this.filterContacts()
            },

            handleSelectOpen(select){
                switch(select){
                    case 'continent-filter':
                        this.closeProductGroupFilter = !this.closeProductGroupFilter
                        this.closeCountry = !this.closeCountry
                        break;
                    case 'country-filter':
                        this.closeProductGroupFilter = !this.closeProductGroupFilter
                        this.closeContinent = !this.closeContinent
                        break;
                    case 'product-group-filter':
                        this.closeContinent = !this.closeContinent
                        this.closeCountry = !this.closeCountry
                        break;
                }
            },
            filterContacts() {
                this.contacts = [];
                var allContacts = this.allContacts;

                for (let i = 0; i < allContacts.length; i++) {
                    // if(allContacts[i].continent == value) {
                    let arrayCountries = allContacts[i].unLocode.split(",")
                    let arrayGroups = allContacts[i].categories.split(",")

                    if ((arrayCountries.indexOf(this.selectedCountry.toString()) != -1) && (arrayGroups.indexOf(this.selectedGroup.toString()) != -1)) {
                        //assign contact at top of array if isTop is selected in dataset
                        if (allContacts[i].isTop) {
                            this.contacts.unshift(allContacts[i])
                        } else {
                            this.contacts.push(allContacts[i])
                        }
                    }
                }
            },
            setLanguage() {
                let languageVar = document.getElementById('contact-language-var')


                if (languageVar) {
                    let languageId = languageVar.dataset.language;

                    switch (languageId) {
                        case '1':
                            this.language = 'de'
                            break;
                        case '2':
                            this.language = 'cn'
                            break;
                        default:
                            this.language = 'en'
                            break;
                    }
                }
            }
        },
        template:
            '<div class="ce ce-textmedia default 0 ce-left ce-intext flex wrap">' +
            '<div class="contacts featured-box__main" data-contrast="medium">' +
            '<div class="tile">' +
            '<div class="ce-gallery grid-1_lg-1_md-1_sm-1_xs-1 normal">' +
            '<div class="col">' +
            '<product-group-filter :groups="groups" :language="language" @changed="handleProductGroupChange" @opened="handleSelectOpen" :close="closeProductGroupFilter" />' +
            '<continent-filter :continents="continents" :language="language" @changed="handleContinentChange" @opened="handleSelectOpen" :disabled="continentSelectDisabled" :close="closeContinent"/>' +
            '<country-filter :countries="countries" :language="language" @changed="countryEventFunction" @opened="handleSelectOpen" :disabled="countrySelectDisabled" :close="closeCountry"/>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="contacts-container">' +
            '<contacts-bodytext :contacts="contacts" :imageHidden="imageHidden"/>' +
            '</div>' +
            '</div>' +
            '</div>'
    });
});