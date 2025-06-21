import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '@/firebase/firebase'

const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/frontend/HomeView'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () =>
            import ("@/components/NotFound")
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/LogIn'),
    },
    {
        path: '/forget',
        name: 'forget',
        component: () =>
            import ('@/views/ForegetPass'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('@/views/SignUp'),
    },
    {
        path: '/product',
        name: 'product',
        component: () =>
            import ('@/views/frontend/ProductView')
    }, {
        path: '/blog',
        name: 'blog',
        component: () =>
            import ('@/views/frontend/BlogView')
    },
    {
        path: '/contact',
        name: 'contact',
        component: () =>
            import ('@/views/frontend/ContactView')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('@/views/About.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import ('../views/backend/Dashboard'),
        redirect: { name: 'dashboard/overview' },
        meta: { requiresAuth: true },

        children: [{
                path: '/overview',
                name: 'dashboard/overview',
                component: () =>
                    import ('@/views/backend/OverView'),
            },
            {
                path: '/banner',
                name: 'dashboard/banner',
                component: () =>
                    import ("@/views/backend/Banner"),
            },
            {
                path: '/products',
                name: 'dashboard/products',
                component: () =>
                    import ("@/views/backend/Products"),
            }, {
                path: '/profile',
                name: 'dashboard/profile',
                component: () =>
                    import ("@/views/backend/Profile"),
            },
            {
                path: '/checkout',
                name: 'dashboard/checkout',
                component: () =>
                    import ("@/views/backend/Checkouts"),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.currentUser) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }

})

export default router