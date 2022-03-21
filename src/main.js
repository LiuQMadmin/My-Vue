import Vue from './index.js'
let vm = new Vue({
  el: '#app',
  data() {
    return {
      name: 'lqm',
      age: 23,
      className: 'helloworld',
      flag: 'model',
      html: '<p1>hello</p1>',
      person: { b: 2 },
      arr: [{ a: 1 }, { b: 2 }],
    }
  },
  methods: {
    aa() {
      console.log(this.$data.arr)
      vm.$data.age = 13
      this.$data.flag = 123456789
      vm.$data.html = '<p1>world</p1>'
    },
  },
})
