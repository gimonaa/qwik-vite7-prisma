import { component$, useStore, useVisibleTask$ } from "@qwik.dev/core";

export const Geolocation = component$(() => {
  const locationStore = useStore({
    latitude: null as number | null,
    longitude: null as number | null,
    city: null as string | null,
    county: null as string | null,
    country: null as string | null,
    road: null as string | null,
    houseNumber: null as string | null,
    error: null as string | null,
  });

  // const getLocation = $(() => {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         locationStore.latitude = position.coords.latitude;
  //         locationStore.longitude = position.coords.longitude;
  //         locationStore.error = null;
  //       },
  //       (error) => {
  //         locationStore.error = `Errore: ${error.message}`;
  //       }
  //     );
  //   } else {
  //     locationStore.error = 'La geolocalizzazione non è supportata da questo browser.';
  //   }
  // })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          locationStore.latitude = latitude;
          locationStore.longitude = longitude;

          // Chiamata all'API Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=it`,
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            locationStore.city =
              data.address.city || data.address.town || data.address.village;
            locationStore.country = data.address.country;
            locationStore.road = data.address.road;
            locationStore.houseNumber = data.address.house_number;
            locationStore.county = data.address.county;
          } else {
            locationStore.error =
              "Errore nella richiesta di geolocalizzazione.";
          }

          //locationStore.error = null;
        },
        (error) => {
          locationStore.error = `Errore: ${error.message}`;
        },
      );
    } else {
      locationStore.error =
        "La geolocalizzazione non è supportata da questo browser.";
    }
  });

  return (
    <div class="m-8">
      {/*<button onClick$={getLocation}>Ottieni la mia posizione</button>*/}
      {locationStore.error && <p>{locationStore.error}</p>}
      {locationStore.latitude && locationStore.longitude ? (
        <p class="">
          <div>
            Latitudine: {locationStore.latitude}, Longitudine:{" "}
            {locationStore.longitude}
          </div>
          <div>
            {locationStore.city} ({locationStore.county},{" "}
            {locationStore.country})
          </div>
          <div>
            {locationStore.road}, {locationStore.houseNumber}
          </div>
        </p>
      ) : (
        <p>acquisiziojne posizione in corso...</p>
      )}
    </div>
  );
});
