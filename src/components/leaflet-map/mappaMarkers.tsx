/* eslint-disable qwik/valid-lexical-scope */
import {
  component$,
  noSerialize,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@qwik.dev/core";
import * as L from "leaflet";
import type { MapProps } from "~/models/map";
import { fvg } from "~/media/poly/FVG.geojson";
import styles from "./index.css?inline";

export const MappaMarkers = component$<MapProps>(
  ({ location, markers, group, variable, delta }: MapProps) => {
    // export const LeafletMap = component$<MapProps>( ({ location, markers, group, variable, delta  }: MapProps) => {
    useStyles$(styles);
    const mapContainerSig = useSignal<L.Map>();
    const markersLayerSig = useSignal<L.LayerGroup>();
    console.debug("MappaMarkers");

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ track }) => {
      track(location || variable || group || delta);

      // variable && track(variable);
      // group && track(group);
      // delta && track(delta);

      // if map doesn't exist
      if (!mapContainerSig.value) {
        console.debug("MappaMarkers - map does not exist");
        // layers
        markersLayerSig.value = noSerialize(new L.LayerGroup());
        const bordersLayer = new L.LayerGroup();
        const ll: any = [bordersLayer, markersLayerSig.value ?? null];

        // center locations
        const { value: locationData } = location;
        const centerPosition: [number, number] = locationData.point as [
          number,
          number,
        ];

        // map
        const map = L.map("map", {
          layers: ll,
        }).setView(centerPosition, locationData.zoom || 14);

        // map layer
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // center position marker
        if (locationData.marker) {
          L.marker(centerPosition).bindPopup(locationData.name).addTo(map);
        }

        // FVG border
        L.geoJSON(fvg, { style: { color: "#005DA4" } }).addTo(bordersLayer);

        markersLayerSig.value?.addTo(map);
        mapContainerSig.value = noSerialize(map);
      }

      // get markers list
      const markersList = await markers;
      // remove old markers
      if (markersList && markersLayerSig.value) {
        markersLayerSig.value.eachLayer((lay) => {
          markersLayerSig.value?.removeLayer(lay);
        });
      }
      // add markers to layer
      if (markersList) {
        markersList.forEach((m) => {
          const myIcon = L.divIcon({ className: "marker-point", html: m.html });
          if (markersLayerSig.value) {
            L.marker([+m.lat, +m.lon], { icon: myIcon })
              .addTo(markersLayerSig.value)
              .bindPopup(m.popup);
          }
        });
      }

      console.debug("MappaMarkers - render", mapContainerSig.value);
    });

    return <div id="map"></div>;
  },
);
