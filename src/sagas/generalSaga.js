import {call, takeLatest, put, all} from 'redux-saga/effects';
import {URL} from '../utils/config';
import {GET_IMAGEN_INICIO, GOT_IMAGEN_INICIO} from '../reducers/general';
import {SET_LOADING} from '../reducers/navegacion';
const API = {
  getImagenInicio: () => `${URL.server}getInicio.php`,
};

export function* fetchGetImagenInicio(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(API.getImagenInicio(), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(API.getImagenInicio());
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
    yield put(GOT_IMAGEN_INICIO.action(response.responseJson[0].param_img_app));
  } catch (error) {
    console.error(error);
  }
}

export function* getImagenInicio() {
  yield takeLatest(GET_IMAGEN_INICIO.name, fetchGetImagenInicio);
}
