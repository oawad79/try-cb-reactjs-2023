import { put, takeEvery } from "redux-saga/effects";
import { getAirportSuggestByCode, setAirportNames } from "../slices/airportsSlice";
import api from '../../services/AirportService'

function* handleGetAirportSuggestByCode(action: { type: string, payload: { airportCode: string; }; }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const airportsByCodePromise = yield put(api.endpoints.airportNamesByCode.initiate({airportCode: action.payload.airportCode}))
    const { data } = yield airportsByCodePromise
    console.log(data.data)
    yield put(setAirportNames(data.data))
    
}

export function* airportAutosuggestSaga() {
    yield takeEvery(getAirportSuggestByCode, handleGetAirportSuggestByCode);
}