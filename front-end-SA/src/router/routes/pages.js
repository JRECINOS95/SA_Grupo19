export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/registro',
    name: 'auth-register',
    component: () => import('@/views/pages/authentication/Register.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/pages/user/users-list/UsersList.vue'),
    meta: {
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Usuarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/user/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/pages/user/users-edit/UsersEdit.vue'),
    meta: {
      pageTitle: 'Editar Usuario',
      breadcrumb: [
        {
          text: 'Editar Usuario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ForgotPassword',
    name: 'auth-forgot-password-v1',
    component: () => import('@/views/ForgotPassword-v2.vue'),
  },
  {
    path: '/order_location',
    name: 'order-location',
    component: () => import('@/views/OrderLocation.vue'),
    meta: {
      pageTitle: 'Catalogo',
      breadcrumb: [
        {
          text: 'Catalogo',
          active: true,
        },
      ],
    },
  },
  {
    path: '/libro',
    name: 'book',
    component: () => import('@/views/Order.vue'),
    meta: {
      pageTitle: 'Libros',
      breadcrumb: [
        {
          text: 'Libros',
          active: true,
        },
      ],
    },
  },
];
