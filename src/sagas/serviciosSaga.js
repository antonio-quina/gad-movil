import {call, takeLatest, put, all} from 'redux-saga/effects';
import {URL} from '../utils/config';
import {
  GET_TIPOS,
  GET_SERVICIOS,
  GOT_TIPOS,
  GOT_SERVICIOS,
} from '../reducers/servicios';
import {SET_LOADING} from '../reducers/navegacion';
const API = {
  getTipos: () => `${URL.server}getAllCategoriaServicios.php`,
  getServicios: id =>
    `${URL.server}getServiciosTuristicosByCategoria.php?tipo_cat=${id}`,
};

export function* fetchGetTipos(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getTipos(), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getTipos());
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
    yield put(GOT_TIPOS.action(response.responseJson));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchGetServicios(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getServicios(action.id), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getServicios(action.id));
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
      put(GOT_SERVICIOS.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}

export function* getTipos() {
  yield takeLatest(GET_TIPOS.name, fetchGetTipos);
}

export function* getServicios() {
  yield takeLatest(GET_SERVICIOS.name, fetchGetServicios);
}
