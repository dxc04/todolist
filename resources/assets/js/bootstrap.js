import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highcharts';
import lodash from 'lodash';
// import BootstrapSass from 'bootstrap-sass';
import axios from 'axios';

window.Vue = Vue;
Vue.use(VueHighcharts, { Highcharts });

window._ = lodash;
// window.$ = window.jQuery = require('jquery');

window.axios = axios;
window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

