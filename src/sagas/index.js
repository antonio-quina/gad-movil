import {all} from 'redux-saga/effects';
import {getCoordenates} from './googleMapsApiSaga';
import {getCategorias, getLugares, getLugaresByNombre} from './lugaresSaga';
import {getTipos, getServicios} from './serviciosSaga';
import {getImagenInicio} from './generalSaga';
import {
  getSecciones,
  getDetalleByInfo,
  getInfoByMenu,
  getMenuBySeccion,
} from './seccionesSaga';
import {getEmprendimiento, getEmprendimientos} from './emprendimientosSaga';

export default function* rootSaga() {
  yield all([
    getCoordenates(),
    getCategorias(),
    getLugares(),
    getLugaresByNombre(),
    getTipos(),
    getServicios(),
    getImagenInicio(),
    getSecciones(),
    getDetalleByInfo(),
    getMenuBySeccion(),
    getInfoByMenu(),
    getEmprendimiento(),
    getEmprendimientos(),
  ]);
}
