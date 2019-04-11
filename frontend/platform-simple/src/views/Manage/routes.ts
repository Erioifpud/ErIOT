const Index = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Index.vue')
const Channels = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Channels.vue')

export default [
  {
    path: '/manage',
    name: 'Manage',
    meta: {
      inMenu: {
        icon: 'outlet',
        title: '管理'
      }
    },
    component: Index,
    children: [
      {
        path: '',
        component: Channels,
        meta: {
          isHome: true,
        }
      },
      // {
      //   name: 'me-edit',
      //   path: 'edit',
      //   component: Edit
      // }
    ]
  }
]
