interface Flight {
  key: string;
  name: string;
  flight: string;
  utc: string;
  flightPath: string;
  price: string;
  actions: string;
  sourceairport?: string;
  destinationairport?:string;
}

type GetFlightsType = {
    from: string;
    to: string;
    leave?: string;
    return?: string;
}