import {createRouter, createWebHashHistory} from 'vue-router';

//import CompatibilityDetail from './pages/compatibilities/CompatibilityDetail.vue';
import CompatibilitiesList from './pages/compatibilities/CompatibilitiesList.vue';
import AddCompatibility from './pages/compatibilities/AddCompatibility.vue';
import EditCompatibility from './pages/compatibilities/EditCompatibility.vue';
import Registration from './pages/auth/Registration.vue';
import Login from './pages/auth/Login.vue';
import NotFound from './pages/NotFound.vue';
import store from './store//index.js';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/rucss-safelist'},
        {path: '/rucss-safelist', component: CompatibilitiesList,query: { search: '', page :1}},
        {
            path: '/rucss-safelist/:id',
            component: EditCompatibility,
            props: true,
            meta: {requiresAuth: true}
        },
        {path: '/rucss-safelist/add', component: AddCompatibility, meta: {requiresAuth: true}},
        {path: '/register', component: Registration, meta: {requiresUnauth: true}},
        {path: '/login', component: Login, meta: {requiresUnauth: true}},
        {path: '/:notFound(.*)', component: NotFound}
    ]
});
router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters['auth/getLoggedUser']) {
        next('/login');
    } else if (to.meta.requiresUnauth && store.getters['auth/getLoggedUser']) {
        next('/rucss-safelist');
    } else {
        next();
    }
});
export default router;
