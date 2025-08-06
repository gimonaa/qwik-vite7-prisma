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
import moment from "moment";

export interface LocalWMSOption extends L.WMSOptions {
  map: string;
  YEAR?: string | undefined;
  DATE?: string | undefined;
  TIME?: string | undefined;
}

export const MappaMapserver = component$<MapProps>(
  ({ location, ymd, hm, opacity, product }: MapProps) => {
    // export const LeafletMap = component$<MapProps>( ({ location, markers, group, variable, delta  }: MapProps) => {
    useStyles$(styles);
    const mapContainerSig = useSignal<L.Map>();
    // const markersLayerSig = useSignal<L.LayerGroup>();
    const WMSLayerSig = useSignal<L.LayerGroup>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ track }) => {
      track(location);
      track(ymd || hm || opacity || product || location);
      // hm && track(hm);
      // opacity && track(opacity);
      // product && track(product);

      console.debug("ymd", ymd?.value);
      console.debug("hm", hm?.value);
      // variable && track(variable);
      // group && track(group);
      // delta && track(delta);

      // if map doesn't exist
      if (!mapContainerSig.value) {
        // layers
        // markersLayerSig.value = noSerialize(new L.LayerGroup());
        WMSLayerSig.value = noSerialize(new L.LayerGroup());
        const bordersLayer = new L.LayerGroup();
        // const ll: any = [bordersLayer, markersLayerSig.value ?? null];
        const ll: any = [bordersLayer, WMSLayerSig.value ?? null];

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

        // http://172.18.21.50/cgi-bin/mapserv?map=/var/www/html/map/meteo.map&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=humidity_925hPa&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=800&HEIGHT=600&FORMAT=image/png&STYLES=&service=WMS&request=GetMap&layers=&styles=&format=image%2Fjpeg&transparent=false&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=1487158.8223163893,5713820.738373496,1565430.3392804097,5792092.255337515

        // map.eachLayer((layer: L.Layer) => {
        //   console.debug('layer', layer);
        //   if (layer instanceof L.TileLayer.WMS) {
        //     console.debug('remove layer', layer);
        //     map.removeLayer(layer);
        //   }
        // });

        // // L.tileLayer.wms("http://172.18.21.50/cgi-bin/mapserv?map=/var/www/html/map/meteo.map&SERVICE=WMS&REQUEST=GetMap&STYLES=", {
        // L.tileLayer.wms(`http://172.18.21.50/cgi-bin/mapserv?map=/var/www/html/map/radar.map&SERVICE=WMS&REQUEST=GetMap&STYLES=&YEAR=2025&DATE=${ymd?.value}&TIME=1700`, {
        //   uppercase: true,
        //   crs: L.CRS.EPSG4326,
        //   bounds: [[-180, -90], [180, 90]],
        //   // layers: 'humidity_925hPa',
        //   layers: 'Radar_VMI',
        //   format: 'image/png',
        //   transparent: true,
        //   version: '1.1.1',
        //   opacity: 0.5,
        //   tileSize: 400,
        //   attribution: "Weather data from ARPA FVG mapserver",
        // }).addTo(map);

        // center position marker
        // locationData.marker &&
        // L.marker(centerPosition).bindPopup(locationData.name).addTo(map);

        // FVG border
        L.geoJSON(fvg, { style: { color: "#005DA4" } }).addTo(bordersLayer);

        // markersLayerSig.value?.addTo(map);
        WMSLayerSig.value?.addTo(map);
        mapContainerSig.value = noSerialize(map);
      }

      if (ymd) {
        WMSLayerSig.value?.eachLayer((lay) => {
          // console.debug('remove layer', lay);
          WMSLayerSig.value?.removeLayer(lay);
        });
      }

      // ymd && WMSLayerSig.value?.addLayer(L.tileLayer.wms(`https://172.18.21.50/cgi-bin/mapserv?map=/var/www/html/map/radar.map&SERVICE=WMS&REQUEST=GetMap&STYLES=&YEAR=${moment(ymd.value).format('YYYY')}&DATE=${moment(ymd.value).format('YYYYMMDD')}&TIME=${hm?.value.replace(':', '')}`, {
      if (ymd) {
        WMSLayerSig.value?.addLayer(
          L.tileLayer.wms(`https://172.18.21.50/cgi-bin/mapserv?`, {
            uppercase: true,
            crs: L.CRS.EPSG4326,
            bounds: [
              [-180, -90],
              [180, 90],
            ],
            // layers: 'humidity_925hPa',
            layers: product?.value,
            format: "image/png",
            transparent: true,
            version: "1.1.1",
            opacity: opacity?.value,
            tileSize: 400,
            attribution: "Weather data from ARPA FVG mapserver",
            // local options
            map: `/var/www/html/map/${product?.value.split("_")[0] || "null"}.map`,
            year: moment(ymd.value).format("YYYY"),
            date: moment(ymd.value).format("YYYYMMDD"),
            time: hm?.value.replace(":", ""),
          } as LocalWMSOption),
        );
      }

      // get markers list
      // const markersList = await markers;
      // remove old markers
      // markersList &&
      // markersLayerSig.value?.eachLayer((lay) =>
      // markersLayerSig.value?.removeLayer(lay),
      // );
      // add markers to layer
      // markersList &&
      // markersList.map((m) => {
      //   const myIcon = L.divIcon({ className: "marker-point", html: m.html });
      //   markersLayerSig.value &&
      //     L.marker([+m.lat, +m.lon], { icon: myIcon })
      //       .addTo(markersLayerSig.value)
      //       .bindPopup(m.popup);
      // });
    });

    return <div id="map"></div>;
  },
);
