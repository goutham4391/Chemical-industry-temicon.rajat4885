document.addEventListener('DOMContentLoaded', function () {
  Vue.component('v-select', {
    props: {
      'options': HTMLOptionsCollection,
      'name': String,
      'id': String
    },
    data: function () {
      return {
        selected: [],
        selectedValues: [],
        label: ''
      }
    },
    mounted () {
      this.selected = [{ text: this.$refs.select.options[this.$refs.select.selectedIndex].text }]
      this.syncValue()
    },
    methods: {
      changeValue: function (value) {
        this.$refs.select.value = value
        this.syncValue()
        this.closeDropDown()
      },
      syncValue: function () {
        this.selected = this.$refs.select.selectedOptions

        let optionLabels = []
        this.selectedValues = []
        for (let i = 0; i < this.selected.length; i++) {
          
          this.selectedValues.push(this.selected[i].value)
          optionLabels.push(this.selected[i].text)
        }

        this.label =  optionLabels.join(', ')
      },
      toggleDropDown: function () {
        this.$refs.field.classList.toggle('open')
      },
      openDropDown: function () {
        this.$refs.field.classList.add('open')
      },
      closeDropDown: function () {
        this.$refs.field.classList.remove('open')
      }
    },
    template:
      '<div class="v-select">' +
      ' <select @change="syncValue" @focus="openDropDown" @blur="closeDropDown" @keydown.enter="closeDropDown" class="v-select__input" :id="id" tabindex="0" :name="name" ref="select">' +
        '<option v-for="option in options" :key="option.index" :value="option.value" :selected="option.selected">{{ option.text }}</option>' +
        '</select>' +
      ' <div aria-hidden="true" class="v-select__field" ref="field">' +
      '   <div class="v-select__label" @click="toggleDropDown">{{ label }}</div>' +
      '   <div class="option-wrapper" ref="dropdown">' +
      '     <div class="option" :class="{active: selectedValues.includes(option.value)}" v-for="option in options" :key="option.index" @click="changeValue(option.value)">{{ option.text }}</div>' +
      '   </div>' +
      ' </div>' +
      '</div>'
  })

  let selects = document.querySelectorAll('.field select')

  let selectVueInstances = []
  selects.forEach(function (select) {
   // console.log(selects)
    selectVueInstances.push(
      new Vue({
        el: select,
        data: function () {
          return {
            options: select.options,
            name: select.name,
            id: select.id
          }
        },
        template: '<v-select :options="options" :name="name" :id="id"/>'
      }))
  })
})