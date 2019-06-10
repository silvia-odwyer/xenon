// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/

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
import VueRouter from 'vue-router'
import Landing from './components/Landing.vue'
import Dashboard2 from './components/Dashboard2.vue'
import '../theme/index.css'
import 'shards-ui/dist/css/shards.css'
import ShardsVue from 'shards-vue';
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueScrollReveal from 'vue-scroll-reveal';
 
library.add(faItalic, faBold, faStrikethrough, faCopy, faCut, faUnderline, faBook, faEdit, faHeading, faSuperscript, faSubscript, faHighlighter)

Vue.component('font-awesome-icon', FontAwesomeIcon)
 
window.blockstack = require('blockstack')
window.axios = require('axios')
Vue.config.productionTip = false
Vue.use(ElementUI, {locale}, VueCodemirror)
const Foo = { template: '<div>foo</div>' }

const routes = [
  { path: '/', component: Landing },
  { path: '/landing', component: Foo },
  { path: '/dash2', component: Dashboard2 }

]

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: 'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
