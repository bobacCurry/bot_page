import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInBread: true,
      title: '基础配置',
      icon: 'md-home',
      access: []
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/view/index/home')
      },
      {
        path: '/user_setting',
        name: 'user_setting',
        meta: {
          // hideInMenu: true,
          title: '用户设置'
        },
        component: () => import('@/view/index/user-setting.vue')
      }
    ]
  },
  {
    path: '/bot',
    name: 'bot',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'bot_page',
        name: 'bot_page',
        meta: {
          icon: ' iconfont iconbot',
          title: '机器人'
        },
        component: () => import('@/view/bot/index.vue')
      }
    ]
  },
  {
    path: '/cburl',
    name: 'cburl',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'cburl_page',
        name: 'cburl_page',
        meta: {
          icon: ' iconfont iconcburl',
          title: 'cburl'
        },
        component: () => import('@/view/cburl/index.vue')
      }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'chat_page',
        name: 'chat_page',
        meta: {
          icon: ' iconfont iconchat',
          title: '群组/频道'
        },
        component: () => import('@/view/chat/index.vue')
      }
    ]
  },
  {
    path: '/cat',
    name: 'cat',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'cat_page',
        name: 'cat_page',
        meta: {
          icon: ' iconfont iconcat',
          title: '分类'
        },
        component: () => import('@/view/cat/index.vue')
      }
    ]
  },
  {
    path: '/menu',
    name: 'menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'menu_page',
        name: 'menu_page',
        meta: {
          icon: ' iconfont iconmenu',
          title: '菜单'
        },
        component: () => import('@/view/menu/index.vue')
      }
    ]
  },
  {
    path: '/ads',
    name: 'ads',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'ads_page',
        name: 'ads_page',
        meta: {
          icon: ' iconfont iconads',
          title: '广告'
        },
        component: () => import('@/view/ads/index.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'order_page',
        name: 'order_page',
        meta: {
          icon: ' iconfont iconorder',
          title: '订单'
        },
        component: () => import('@/view/order/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'template',
        name: 'template',
        meta: {
          icon: 'md-planet',
          title: '模板'
        },
        component: () => import('@/view/template/index.vue')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'check_table_page',
        name: 'check_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '筛选表格'
        },
        component: () => import('@/view/components/check-table/index.vue')
      },
      {
        path: 'style_table_page',
        name: 'style_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '多效果表格'
        },
        component: () => import('@/view/components/style-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
