
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';


import swal from 'sweetalert2';
window.swal = swal;

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.toast = toast;


window.Form = Form;


window.Fire = new Vue();


Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.05s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false,
  height: '3px'
}
Vue.use(VueProgressBar, options)


let routes = [
  { path: '/dashboard', component: require('./components/Dashboard.vue') },
  { path: '/users', component: require('./components/Users.vue') },
  { path: '/profile', component: require('./components/Profile.vue') }
]


const router = new VueRouter({
  mode: 'history',
  routes // raccourci pour `routes: routes`
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});


Vue.filter('upText', function(text){
	return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('myDate', function(created){
	return moment(created).format('MMMM Do YYYY');
});
