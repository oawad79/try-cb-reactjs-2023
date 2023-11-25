import { airportAutosuggestSaga } from './airportAutosuggestSaga';
import { loadFlightsSaga } from './loadFlightsSaga';
import {loadHotelsSaga} from './loadHotelsSaga'
import { all, fork } from 'redux-saga/effects';


export function* rootSaga() {
    yield all([fork(loadHotelsSaga), fork(airportAutosuggestSaga)]);
}