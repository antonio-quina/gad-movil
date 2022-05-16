import {call, takeLatest, put, all} from 'redux-saga/effects';
import {URL} from '../utils/config';
import {
  GET_EMPRENDIMIENTOS,
  GOT_EMPRENDIMIENTOS,
  GET_EMPRENDIMIENTO,
  GOT_EMPRENDIMIENTO,
} from '../reducers/emprendimientos';
import {SET_LOADING} from '../reducers/navegacion';
import {GET_DESTINATION} from '../reducers/googlemaps';
const API = {
  getEmprendimientos: () => `${URL.server}getAllEmprendimientos.php`,
  getEmprendimiento: emprendimiento =>
    `${URL.server}getEmprendimientoById.php?emp=${emprendimiento}`,
};

export function* fetchGetEmprendimientos(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getEmprendimientos(), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getEmprendimientos());
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
      put(GOT_EMPRENDIMIENTOS.action(response.responseJson)),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}
export function* fetchGetEmprendimiento(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getEmprendimiento(action.emprendimiento), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getEmprendimiento(action.emprendimiento));
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
      put(GOT_EMPRENDIMIENTO.action(response.responseJson)),
      put(
        GET_DESTINATION.action({
          latitude: response.responseJson[0].em_latitud.trim(),
          longitude: response.responseJson[0].em_longitud.trim(),
        }),
      ),
      put(SET_LOADING.action(false)),
    ]);
  } catch (error) {
    console.error(error);
  }
}

export function* getEmprendimientos() {
  yield takeLatest(GET_EMPRENDIMIENTOS.name, fetchGetEmprendimientos);
}
export function* getEmprendimiento() {
  yield takeLatest(GET_EMPRENDIMIENTO.name, fetchGetEmprendimiento);
}
