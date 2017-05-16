const Vue = require('../../node_modules/vue/dist/vue');
Vue.use(require('../../node_modules/vue-resource/dist/vue-resource'));

Vue.component('dynamic-component', require('./components/dynamic-component'));
Vue.component('entity-manager', require('./components/entity-manager/entity-manager.vue'));
Vue.component('entity', require('./components/entity-manager/entity.vue'));
Vue.component('project', require('./components/entity-manager/entities/project.vue'));
Vue.component('room', require('./components/entity-manager/entities/room.vue'));
Vue.component('placeholder', require('./components/entity-manager/entities/placeholder.vue'));
Vue.component('rectangle', require('./components/entity-manager/entities/rectangle.vue'));

Vue.directive('movable', require('./directives/movable'));
Vue.directive('rotatable', require('./directives/rotatable'));

new Vue({
	el: window.app,
	mounted: function () {
		console.log('OKAY');
	}
});