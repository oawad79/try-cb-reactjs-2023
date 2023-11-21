import { take, put, call, actionChannel, ActionPattern} from "redux-saga/effects"
import { getHotelsRequest, getHotelsRequestSuccess } from "../slices/hotelsSlice";
import axios, { AxiosResponse } from "axios";
import { createToast } from "../slices/toastsSlice";

function* getHotels({location, optional} : {
  location: string;
  optional: string;
})  {
  try {
      const response : AxiosResponse<{data: Hotel[]}> = yield axios.get(`http://localhost:8080/api/hotels/${optional? optional : '*'}/${location}/`);
      console.log("response = ", response)
      yield put(getHotelsRequestSuccess(response.data.data))
  } catch (error) {
      //emit a signal to the store, if Saga errors are not handled
      //then it will pubble up tp the root Saga which terminates.
      yield put(createToast(error));
  }
}

export function* loadHotelsSaga() {
  const hotelsChannel : ActionPattern = yield actionChannel(getHotelsRequest);
  while (true) {
    const { payload } = yield take(hotelsChannel)
    yield call(getHotels, payload)
  }
}


