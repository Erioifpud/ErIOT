const Index = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Index.vue')
const Channels = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Channels.vue')
const Fields = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Fields.vue')
const Datapoints = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Datapoints.vue')
const Actions = () => import(/* webpackChunkName: "manage" */ '@/views/Manage/pages/Actions.vue')

export default [
  {
    path: '/manage',
    name: 'Manage',
    meta: {
      inMenu: {
        icon: 'outlet',
        title: '频道'
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
      {
        name: 'manage-field',
        path: 'field/:channelId',
        component: Fields,
      },
      {
        name: 'manage-datapoint',
        path: 'datapoint/:fieldId',
        component: Datapoints,
      },
      {
        name: 'manage-action',
        path: 'action/:fieldId',
        component: Actions,
      }
    ]
  }
]
