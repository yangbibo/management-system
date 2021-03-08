export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/login',
            component: './login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/order/order',
              },
              {
                path:'/order',
                name:'订单管理',
                icon:'account-book',
                routes:[
                  {
                    path: 'catering',
                    name: '配餐管理',
                    component: './Order/Catering',
                  },
                  {
                    path: 'order',
                    name: '订单管理',
                    component: './Order/Order',
                  },
                  {
                    path: 'address',
                    name: '发货地址',
                    component: './Order/Address',
                  },
                ]
              },
              {
                path:'/goods',
                name:'商品管理',
                icon:'shopping',
                routes:[
                  {
                    path: 'goods',
                    name: '商品库',
                    component: './Goods/Goods',
                  }
                ]
              },
              {
                path:'/banner',
                name:'Banner管理',
                icon:'picture',
                routes:[
                  {
                    path: 'banner',
                    name: 'Banner管理',
                    component: './Banner/Banner',
                  }
                ]
              },
              {
                path:'/lunch',
                name:'午餐管理',
                icon:'cloud',
                routes:[
                  {
                    path: 'lunch',
                    name: '午餐管理',
                    component: './Lunch/Lunch',
                  },
                  {
                    path: 'config',
                    name: '午餐日期配置',
                    component: './Lunch/DateConfig',
                  }
                ]
              },
              {
                path:'/extension',
                name:'推广员',
                icon:'gold',
                routes:[
                  {
                    path: 'promoter',
                    name: '推广员管理',
                    component: './Extension/Promoter',
                  },
                  {
                    path: 'Extension',
                    name: '业绩管理',
                    component: './Extension/Achievement',
                  }
                ]
              },
              {
                path:'/setting',
                name:'设置',
                icon:'setting',
                routes:[
                  {
                    path: 'system',
                    name: '系统参数设置',
                    component: './Setting/System',
                  }
                ]
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
