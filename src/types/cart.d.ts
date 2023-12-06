type Cart = {
  key: string;
  name: string;
  flight: string;
  from: string;
  flightPath?: string;
  actions?: ReactElement;
  price?: string;
  sourceairport?: string;
  destinationairport?: string;
};

type BookedType = Cart; 