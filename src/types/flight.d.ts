import { ReactElement } from "react";

interface Flight {
  key?: string;
  name: string;
  flight: string;
  utc: string;
  flightPath?: string;
  price: string;
  actions?: ReactElement;
  sourceairport?: string;
  destinationairport?:string;
  added?: boolean;
  from?: string;
  to?: string;
}

type GetFlightsType = {
    from: string;
    to: string;
    leave?: string;
    return?: string;
}

type BookingRequestType = {
    token: string;
    flight: Flight;
    username: string;
    tenant: string;
}