const globalDefecto = {
  instancia: process.env.VUE_APP_INSTANCE,

  url_tecno: process.env.VUE_APP_URL_TECNO,

  tokenDefault: process.env.VUE_APP_TOKENDEFAULT,
  tokenTecno: process.env.VUE_APP_TOKENTECNO,
};
globalDefecto.instancia = localStorage.getItem('sermesa_sesion_inst')
  ? JSON.parse(atob(localStorage.getItem('sermesa_sesion_inst'))).instancia
  : process.env.VUE_APP_INSTANCE;
globalDefecto.url = process.env[`VUE_APP_URL_${globalDefecto.instancia}`];

// *From Auth - Data will be received from auth provider
const usuarioDefecto = {
  photoURL: '',
  corporativo: 0, // From Auth
  usuario: '', // From Auth
  about: '',
  ip: '',
  token: globalDefecto.tokenDefault,
  status: 'online',
  status_socket: false, // indica si el socket esta activo y en linea
  appPC_socket: null, // indica si el socket del appPC esta activo
  bienvenida: true, // muestra el mensaje de bienvenida
  // indica se ha seleccionado la empresa
  sesion_validar: false, // indica si ya se valido la información
  sesion_empresa: '',
  sesion_sucursal: '',
  sesion_sucursal_nombre: '',
  sesion_tiempo_defecto: 3600, // 60seg * 10min -> utilizado como constante
  sesion_tiempo: null, // 60seg * 5min
};

const state = {
  AppActiveUser: usuarioDefecto,
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  verticalNavMenuWidth: 'default',
  verticalNavMenuItemsMin: false,
  scrollY: 0,

  // informacion global
  global: globalDefecto,

  // funcionalidades
  funcionalidades: localStorage.getItem('sermesa_sesion_funcionalidad')
    ? JSON.parse(atob(localStorage.getItem('sermesa_sesion_funcionalidad')))
    : [],
  id_funcionalidad: null,

  // privilegios
  privilegios: [],

  // sesion
  sesion: localStorage.getItem('sermesa_sesion')
    ? JSON.parse(atob(localStorage.getItem('sermesa_sesion')))
    : usuarioDefecto,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null,
};

export default state;
