import Vue from 'nativescript-vue'
import Login from './components/Log in/Login'
import store from './Store/store'
import RadListView from 'nativescript-ui-listview/vue';

/**
 * Remove for an iOs build next in package.json
 */
//import VueDevtools from 'nativescript-vue-devtools'

/**
 * Remove for an iOs build
 */
//if(TNS_ENV !== 'production') {
//  Vue.use(VueDevtools)
//}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')



Vue.use(RadListView);

Vue.registerElement("Gradient", () => require("nativescript-gradient").Gradient);
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)


new Vue({
  store,
  render: h => h('frame', [h(Login)])
}).$start()
