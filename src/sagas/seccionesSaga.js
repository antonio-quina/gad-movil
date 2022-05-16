import {call, takeLatest, put, all} from 'redux-saga/effects';
import {URL} from '../utils/config';
import {
  GET_DETALLE_INFO,
  GET_INFO_MENU,
  GET_MENU_SECCION,
  GET_SECCIONES,
  GOT_DETALLE_INFO,
  GOT_INFO_MENU,
  GOT_MENU_SECCION,
  GOT_SECCIONES,
} from '../reducers/secciones';
import {SET_LOADING} from '../reducers/navegacion';
const API = {
  getSecciones: () => `${URL.server}getAllCategoriasGenerales.php`,
  getMenuBySeccion: seccion =>
    `${URL.server}getMenuByCategoria.php?cat=${seccion}`,
  getInfoByMenu: menu =>
    `${URL.server}getInformacionByCategoria.php?cat=${menu}`,
  getDetalleByInfo: info =>
    `${URL.server}getInfoDetalleByCategoria.php?info=${info}`,
};

export function* fetchGetSecciones(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getSecciones(), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getSecciones());
      let responseJson = await res.json();
      let responseStatus = await res.status;
      return {responseJson, responseStatus};
    } catch (error) {
      console.log('Error');
    }
  };
  try {
    const response = yield call(sincronizacion);
    console.log(response.responseJson);
    yield all([
      put(GOT_SECCIONES.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}
export function* fetchGetMenuBySeccion(action) {
  console.log(action.seccion);
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getMenuBySeccion(action.seccion), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getMenuBySeccion(action.seccion));
      let responseJson = await res.json();
      let responseStatus = await res.status;
      return {responseJson, responseStatus};
    } catch (error) {
      console.log('Error');
    }
  };
  try {
    const response = yield call(sincronizacion);
    console.log(response.responseJson);
    yield all([
      put(GOT_MENU_SECCION.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}
export function* fetchInfoByMenu(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getInfoByMenu(action.menu), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getInfoByMenu(action.menu));
      let responseJson = await res.json();
      let responseStatus = await res.status;
      return {responseJson, responseStatus};
    } catch (error) {
      console.log('Error');
    }
  };
  try {
    const response = yield call(sincronizacion);
    console.log(response.responseJson);
    yield all([
      put(GOT_INFO_MENU.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}
export function* fetchDetalleByInfo(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getDetalleByInfo(action.info), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getDetalleByInfo(action.info));
      let responseJson = await res.json();
      let responseStatus = await res.status;
      return {responseJson, responseStatus};
    } catch (error) {
      console.log('Error');
    }
  };
  try {
    const response = yield call(sincronizacion);
    console.log(response.responseJson);
    yield all([
      put(GOT_DETALLE_INFO.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}

export function* getSecciones() {
  yield takeLatest(GET_SECCIONES.name, fetchGetSecciones);
}
export function* getMenuBySeccion() {
  yield takeLatest(GET_MENU_SECCION.name, fetchGetMenuBySeccion);
}
export function* getInfoByMenu() {
  yield takeLatest(GET_INFO_MENU.name, fetchInfoByMenu);
}
export function* getDetalleByInfo() {
  yield takeLatest(GET_DETALLE_INFO.name, fetchDetalleByInfo);
}
