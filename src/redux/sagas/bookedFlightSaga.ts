import { put, takeLatest } from "redux-saga/effects";
import { addToBooked, bookFlightAction } from "../slices/bookedSlice";
import flightsApi from "../../services/FlightsService";

export function* handleBookFlight(action) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const bookFlightPromise = yield put(flightsApi.endpoints.bookFlight.initiate({username: }))
    const { data } = yield bookFlightPromise
    yield put(addToBooked(data))
}

export function* bookFlightSaga() {
    yield takeLatest(bookFlightAction.type, handleBookFlight);    
}