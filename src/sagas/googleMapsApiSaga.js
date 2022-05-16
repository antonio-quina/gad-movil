import {call, takeLatest, put} from 'redux-saga/effects';
import {URL} from '../utils/config';
import {GET_COORDINATES, GOT_COORDINATES} from '../reducers/googlemaps';
import {APIKEY, mode} from '../utils/constants';
const API = {
  getDirections: (origin, destination) =>
    `${URL.google}directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${APIKEY}&mode=${mode}`,
};

export function* fetchGetDirections(action) {
  let sincronizacion = async () => {
    try {
      let res = await fetch(
        API.getDirections(action.origin, action.destination),
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(API.getDirections(action.origin, action.destination));
      let responseJson = await res.json();
      let responseStatus = await res.status;
      return {responseJson, responseStatus};
    } catch (error) {
      console.log('Error');
    }
  };
  try {
    const response = yield call(sincronizacion);
    var polyUtil = require('polyline-encoded');
    if (response.responseJson.routes.length > 0) {
      var encoded = response.responseJson.routes[0].overview_polyline.points;
      var latlngs = polyUtil.decode(encoded);
      var latlngsObj = [];
      latlngs.forEach(element => {
        const a = {latitude: element[0], longitude: element[1]};
        latlngsObj.push(a);
      });
      yield put(GOT_COORDINATES.action(latlngsObj));
    } else {
      var latlngsObj = [];
      yield put(GOT_COORDINATES.action(latlngsObj));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* getCoordenates() {
  yield takeLatest(GET_COORDINATES.name, fetchGetDirections);
}
