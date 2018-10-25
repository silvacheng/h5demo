// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
// import Home from './components/HelloFromVux'
// import { AjaxPlugin } from 'vux'
// import vConsole from 'vconsole'
// Vue.use(VueRouter)
// console.log(AjaxPlugin)
// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)
// console.log(AjaxPlugin)
Vue.config.productionTip = false
// Vue.http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
