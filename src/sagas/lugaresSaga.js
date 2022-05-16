import {call, takeLatest, put, all} from 'redux-saga/effects';
import {URL} from '../utils/config';
import {
  GET_CATEGORIAS,
  GET_LUGARES,
  GOT_CATEGORIAS,
  GOT_LUGARES,
  GET_LUGARES_BY_NOMBRE,
} from '../reducers/lugares';
import {SET_LOADING} from '../reducers/navegacion';
const API = {
  getCategorias: () => `${URL.server}getAllTipoAtractivo.php`,
  getLugares: id => `${URL.server}getAtractivoByTipo.php?tipo=${id}`,
  getLugaresByNombre: (id, nombre) =>
    `${URL.server}getAtractivoByTipoNombre.php?tipo=${id}&nombre=${nombre}`,
};

export function* fetchGetCategorias(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getCategorias(), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getCategorias());
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
    yield put(GOT_CATEGORIAS.action(response.responseJson));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchGetLugares(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getLugares(action.id), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getLugares(action.id));
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
      put(GOT_LUGARES.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}

export function* fetchGetLugaresNyNombre(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getLugaresByNombre(action.id, action.nombre), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getLugaresByNombre(action.id, action.nombre));
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
      put(GOT_LUGARES.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}

export function* getCategorias() {
  yield takeLatest(GET_CATEGORIAS.name, fetchGetCategorias);
}

export function* getLugares() {
  yield takeLatest(GET_LUGARES.name, fetchGetLugares);
}

export function* getLugaresByNombre() {
  yield takeLatest(GET_LUGARES_BY_NOMBRE.name, fetchGetLugaresNyNombre);
}
