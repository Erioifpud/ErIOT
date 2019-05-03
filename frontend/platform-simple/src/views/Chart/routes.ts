const Index = () => import(/* webpackChunkName: "chart" */ '@/views/Chart/pages/Index.vue')
const Chart = () => import(/* webpackChunkName: "chart" */ '@/views/Chart/pages/Chart.vue')

export default [
  {
    path: '/chart',
    // alias: '/',
    name: 'Chart',
    meta: {
      withoutAuth: true
    },
    component: Index,
    children: [
      {
        path: '',
        component: Chart,
        meta: {
          isHome: true
        }
      }
    ]
  }
]
