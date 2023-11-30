import { ReactElement } from "react";

interface Flight {
  key: string;
  name: string;
  flight: string;
  utc: string;
  flightPath: string;
  price: string;
  actions: ReactElement;
  sourceairport?: string;
  destinationairport?:string;
  added?: boolean;
}

type GetFlightsType = {
    from: string;
    to: string;
    leave?: string;
    return?: string;
}