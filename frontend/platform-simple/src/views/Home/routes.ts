const Index = () => import(/* webpackChunkName: "home" */ '@/views/Home/pages/Index.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home/pages/Home.vue')
const Test = () => import(/* webpackChunkName: "home" */ '@/views/Home/pages/Test.vue')

export default [
  {
    path: '/home',
    // alias: '/',
    name: 'Home',
    meta: {
      inMenu: {
        icon: 'analytics',
        title: '仪表盘'
      }
    },
    component: Index,
    children: [
      {
        path: '',
        component: Home,
        meta: {
          isHome: true
        }
      },
      {
        path: 'test',
        component: Test
      }
    ]
  }
]
