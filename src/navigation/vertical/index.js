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
  {
    title: 'Bitacora Libros',
    icon: 'ListIcon',
    route: 'bitacora',
    resource: 'ADMIN',
    action: 'manage',
  },
  {
    title: 'Tracking',
    icon: 'MapIcon',
    route: 'tracking',
    resource: 'ADMIN',
    action: 'manage',
  },
  {
    title: 'Solicitudes de Libros',
    icon: 'FilePlusIcon',
    route: 'solicitudes',
    resource: 'EDITORIAL',
    action: 'manage',
  },
  {
    title: 'Impuestos',
    icon: 'DivideSquareIcon',
    route: 'impuestos',
    resource: 'EDITORIAL',
    action: 'manage',
  },
];
