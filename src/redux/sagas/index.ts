import { airportAutosuggestSaga } from './airportAutosuggestSaga';
import { bookFlightSaga } from './bookedFlightSaga';
import { loadFlightsSaga } from './loadFlightsSaga';
import {loadHotelsSaga} from './loadHotelsSaga'
import { all, fork } from 'redux-saga/effects';


export function* rootSaga() {
    yield all([
        fork(loadHotelsSaga), 
        fork(airportAutosuggestSaga), 
        fork(loadFlightsSaga), 
        fork(bookFlightSaga)
    ]);
}