import type { LocationsProps } from "./location";
import { type Signal } from "@qwik.dev/core";
export interface MapProps {
  // default options
  location: Signal<LocationsProps>;
  // add other options to customization map
  markers?: Promise<MarkersProps[] | null>;
  group?: Signal<string>;
  variable?: Signal<string>;
  delta?: Signal<string>;
  ymd?: Signal<string>;
  hm?: Signal<string>;
  opacity?: Signal<number>;
  product?: Signal<string>;
}

export interface StationsProps {
  id: number;
  nome: string;
  sigla: string;
  codice: string;
  data_inizio: string;
  data_fine: string | null;
  proprietario: {
    id: number;
    ragione_sociale: string;
  };
  lat: string;
  lon: string;
  alt: string;
}

export interface StationsDataProps {
  id: number;
  nome: string;
  sigla: string;
  codice: string;
  lat: string;
  lon: string;
  alt: string;
  misura_id: number;
  data: [
    {
      orario: string;
      dato: number;
      tas: boolean;
      flag_id: number;
      dato_sensore_id: number;
    },
  ];
}

export interface MarkersProps {
  lat: string;
  lon: string;
  id: string;
  html: string;
  popup: string;
}
