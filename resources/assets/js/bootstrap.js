import Vue from 'vue';

import lodash from 'lodash';
// import BootstrapSass from 'bootstrap-sass';
import axios from 'axios';
import moment from 'moment';

window.Vue = Vue;
window.moment = moment;

window._ = lodash;
// window.$ = window.jQuery = require('jquery');

window.axios = axios;
window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

