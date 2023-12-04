import { put, takeLatest } from "redux-saga/effects";
import { addToBooked, bookFlightAction } from "../slices/bookedSlice";
import flightsApi from "../../services/FlightsService";
import { removeFromCart } from "../slices/cartSlice";


export function* handleBookFlight(action : typeof bookFlightAction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const bookFlightPromise = yield put(flightsApi.endpoints.bookFlight.initiate({...action.payload}))
    const {data}  = yield bookFlightPromise
    yield put(addToBooked(data))
    yield put(removeFromCart(data))
}

export function* bookFlightSaga() {
    yield takeLatest(bookFlightAction.type, handleBookFlight);    
}