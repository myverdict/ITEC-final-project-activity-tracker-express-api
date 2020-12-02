import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue";
import ActivityServiceAPI from "@/services/ActivityService";

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.prototype.$activity_record_api = ActivityServiceAPI;

new Vue({
    render: h => h(App),
}).$mount('#app')
