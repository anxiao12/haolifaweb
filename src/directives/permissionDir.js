import Vue from 'vue';
import store from '@/store';

const has = Vue.directive('has', {
    inserted: function (el, binding) {
        let btnPermission = binding.value;
        let permissionList = localStorage.getItem('permissionList');
        if (permissionList.indexOf(btnPermission) === -1) {
            el.parentNode.removeChild(el);
        }
    }
});
export default has;