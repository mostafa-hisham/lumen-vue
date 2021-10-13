import {createRouter, createWebHistory} from 'vue-router';

import UserDetail from './pages/users/UserDetail.vue';
import UsersList from './pages/users/UsersList.vue';
import Registration from './pages/auth/Registration.vue';
import Login from './pages/auth/Login.vue';
import NotFound from './pages/NotFound.vue';
import store from './store//index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/users'},
        {path: '/users', component: UsersList},
        {
            path: '/users/:id',
            component: UserDetail,
            props: true,
            meta: {requiresAuth: true}
            /*children: [
              { path: 'edit', component: ContactCoach } // /users/c1/edit
            ]*/
        },
        {path: '/register', component: Registration, meta: {requiresUnauth: true}},
        {path: '/login', component: Login, meta: {requiresUnauth: true}},
        {path: '/:notFound(.*)', component: NotFound}
    ]
});
router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters['auth/getLoggedUser']) {
        next('/login');
    } else if (to.meta.requiresUnauth && store.getters['auth/getLoggedUser']) {
        next('/users');
    } else {
        next();
    }
});
export default router;
