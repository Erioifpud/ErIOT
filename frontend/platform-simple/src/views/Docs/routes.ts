const Index = () => import(/* webpackChunkName: "docs" */ '@/views/Docs/pages/Index.vue')
const Docs = () => import(/* webpackChunkName: "docs" */ '@/views/Docs/pages/Docs.vue')

export default [
  {
    path: '/docs',
    // alias: '/',
    name: 'Docs',
    meta: {
      inMenu: {
        icon: 'book',
        title: '文档'
      }
    },
    component: Index,
    children: [
      {
        path: '',
        component: Docs,
        meta: {
          isHome: true
        }
      }
    ]
  }
]
