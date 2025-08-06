import { component$ } from "@qwik.dev/core";

export type DataSumType = {
  nomeMODELLO?: string;
  grib?: string;
  hass?: string;
  location?: string;
  color?: string;
  dashStyles?: string;
  visibile?: number;
  // data: [number | string, number | string][];
  // data: {x: string, y: number}[];
  data: (string | number)[][];
} | null;

export interface ModelInfoProps {
  info: DataSumType;
}

export const ModelInfo = component$<ModelInfoProps>((props) => {
  return (
    <div>
      <div>nome: {props.info?.nomeMODELLO}</div>
      <div>grib: {props.info?.grib}</div>
      <div>hass: {props.info?.hass}</div>
      <div>location: {props.info?.location}</div>
    </div>
  );
});
