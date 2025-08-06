// import { component$, noSerialize, useSignal,  useStyles$, useVisibleTask$,  } from "@qwik.dev/core";
// import * as L from "leaflet";
// import type { MapProps } from "~/models/map";
// import {fvg}  from "~/media/poly/FVG.geojson";
// import styles from "./index.css?inline";

// export const LeafletMap = component$<MapProps>( ({ location, markers, group }: MapProps) => {
//   useStyles$(styles);

//   const mapContainer$ = useSignal<L.Map>();

//   // eslint-disable-next-line qwik/no-use-visible-task
//   useVisibleTask$(async ({ track }) => {
//     track(location);
//     group && track(group);

//     if (mapContainer$.value) {
//       console.log("remove map")
//       mapContainer$.value.remove();
//     }

//     // center locations
//     const { value: locationData } = location;
//     const centerPosition: [number, number] = locationData.point as [
//       number,
//       number,
//     ];

//     // layers
//     const markersLayer  = new L.LayerGroup();
//     const bordersLayer  = new L.LayerGroup();

//     // map
//     const map = L.map("map", {
//       layers: [markersLayer, bordersLayer],
//     }).setView(
//       centerPosition,
//       locationData.zoom || 14,
//     );
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);

//     // save zomm and center position to signal
//     map.on("zoomend", () => {
//       const zoom = map.getZoom();
//       locationData.zoom = zoom;
//     })
//     map.on("dragend", () => {
//       const center = map.getCenter();
//       locationData.point = [center.lat, center.lng];
//     })

//     // center position marker
//     // locationData.marker && L.marker(centerPosition).bindPopup(`Udine`).addTo(map);

//     // add boundaries to map
//     L.geoJSON(fvg, { style: { color: "#005DA4" } }).addTo(bordersLayer);

//     // add markers to map
//     const markersList = await markers
//     markersList && markersList.map((m) => {
//       const myIcon = L.divIcon({ className: "marker-point", html: `<div class="marker-label" title="${m.nome}" >${m.sigla}</div>` });
//       L.marker([+m.lat, +m.lon], { icon: myIcon }).addTo(markersLayer);
//     })

//     mapContainer$.value = noSerialize(map);

//   });

//   return <div id="map"></div>

// });
