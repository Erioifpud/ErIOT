const Index = () => import(/* webpackChunkName: "home" */ '@/views/Login/pages/Index.vue')
const Login = () => import(/* webpackChunkName: "home" */ '@/views/Login/pages/Login.vue')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Index,
    children: [
      {
        path: '',
        component: Login,
        meta: {
          withoutAuth: true
        }
      }
    ]
  }
]
