/* eslint-disable */

import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueCodemirror from 'vue-codemirror'
import 'vue-material-design-icons/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faItalic, faStrikethrough, faCopy, faCut, faUnderline, faBook, faEdit, faHeading, faSubscript, faSuperscript, faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'


library.add(faItalic, faBold, faStrikethrough, faCopy, faCut, faUnderline, faBook, faEdit, faHeading, faSuperscript, faSubscript, faHighlighter)

Vue.component('font-awesome-icon', FontAwesomeIcon)
 
window.blockstack = require('blockstack')
window.axios = require('axios')
Vue.config.productionTip = false
Vue.use(ElementUI, {locale}, VueCodemirror)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
