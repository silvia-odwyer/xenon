// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueCodemirror from 'vue-codemirror'
import 'vue-material-design-icons/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faItalic, faStrikethrough } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faItalic, faBold, faStrikethrough)

Vue.component('font-awesome-icon', FontAwesomeIcon)

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false
Vue.use(ElementUI, {locale}, VueCodemirror)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
