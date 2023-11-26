import { all, fork, put, takeEvery } from "redux-saga/effects";
import { getFlightsByFromByToByTime, setOutgoingFlights, setReturningFlights } from "../slices/flightsSlice";
import flightsApi from "../../services/FlightsService";


function *getOutgoingFlights({from, to, leave} : GetFlightsType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const flightsByLocAndTimePromise = yield put(flightsApi.endpoints.flightsList.initiate({from: from, to: to, leave: leave}))
    const { data } = yield flightsByLocAndTimePromise
    yield put(setOutgoingFlights(data))
}

function *getReturningFlights({from, to, leave} : GetFlightsType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const flightsByLocAndTimePromise = yield put(flightsApi.endpoints.flightsList.initiate({from: from, to: to, leave: leave}))
    const { data } = yield flightsByLocAndTimePromise
    yield put(setReturningFlights(data))
}


function* getRoundtrip(action: {type: string; payload: GetFlightsType;}) {
    yield all([
        fork(getOutgoingFlights, {from: action.payload.from, to: action.payload.to, leave:action.payload.leave}), 
        fork(getReturningFlights, {from: action.payload.to, to: action.payload.from, leave:action.payload.return})
    ])
}

export function* loadFlightsSaga() {
    yield takeEvery(getFlightsByFromByToByTime.type, getRoundtrip)    
}