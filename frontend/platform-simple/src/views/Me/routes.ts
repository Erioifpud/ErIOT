const Index = () => import(/* webpackChunkName: "me" */ '@/views/Me/pages/Index.vue')
const Me = () => import(/* webpackChunkName: "me" */ '@/views/Me/pages/Me.vue')
const Edit = () => import(/* webpackChunkName: "me" */ '@/views/Me/pages/Edit.vue')

export default [
  {
    path: '/me',
    name: 'Me',
    meta: {
      inMenu: {
        icon: 'person',
        title: '我的'
      }
    },
    component: Index,
    children: [
      {
        path: '',
        component: Me,
        meta: {
          isHome: true,
        }
      },
      {
        path: 'edit',
        component: Edit
      }
    ]
  }
]
