export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
    resource: 'ANY',
    action: 'manage',
  },
  {
    title: 'Libros',
    route: 'book',
    icon: 'BookOpenIcon',
    resource: 'EDITORIAL',
    action: 'manage',
  },
  {
    title: 'Tienda',
    route: 'shop',
    icon: 'ShoppingBagIcon',
    resource: 'CLIENTE',
    action: 'manage',
  },
  {
    title: 'Solicitar Libros',
    route: 'request',
    icon: 'BookIcon',
    resource: 'CLIENTE',
    action: 'manage',
  },
  {
    title: 'Usuarios',
    icon: 'UserIcon',
    route: 'user',
    resource: 'ADMIN',
    action: 'manage',
  },
];
