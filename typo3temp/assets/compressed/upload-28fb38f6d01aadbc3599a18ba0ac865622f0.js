document.addEventListener('DOMContentLoaded', function () {

  Vue.component('v-file', {
    props: {
      'name': String,
      'id': String,
      'accept': String
    },
    data: function () {
      return {
        value: ''
      }
    },
    mounted () {
      this.syncValue()
    },
    methods: {
      changeValue: function (value) {
      },
      syncValue: function () {
        this.value = this.$refs.input.value ? this.$refs.input.value.split("\\").pop() : '-';
      },
    },
    template:
      '<div class="v-file">' +
      ' <input class="v-file__input" ref="input" type="file" :id="id" :accept="accept" :name="name" @change="syncValue" />' +
      ' <div aria-hidden="true" class="v-file__field" ref="field"><span class="v-file__label">{{ value }}</span></div>' +
      '</div>'
  })

  let fileInputs = document.querySelectorAll('.field input[type="file"]')

  let uploadVueInstances = []
  fileInputs.forEach(function (input) {
    uploadVueInstances.push(
      new Vue({
        el: input,
        data: function () {
          return {
            name: input.name,
            id: input.id,
            accept: input.getAttribute('accept')
          }
        },
        template: '<v-file :name="name" :id="id" :accept="accept"/>'
      }))
  })
})