// stored in /routes/maps.js

import { getGeoLocation } from '../lib/geoLocation.js';
import env from '../env.js';

export default async (hostComponent) => {
    const location = await getGeoLocation(true);

    hostComponent.innerHTML = `
    <div id="map" style="width: 100%; height: 400px"></div>
  `;

    const loadGoogleMapsScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCNmLH1_G7oAQNCE31nqVrtKkO4QXji-pg&callback=initMap`;
            script.async = true;
            script.defer = true;
            window.initMap = initMap;
            document.body.appendChild(script);
            script.onload = resolve;
        });
    };


    const initMap = () => {
        const mapOptions = {
            center: new google.maps.LatLng(location.latitude, location.longitude),
            zoom: 14,
        };
        new google.maps.Map(document.getElementById('map'), mapOptions);
    };

    await loadGoogleMapsScript();
 //   initMap();
};
