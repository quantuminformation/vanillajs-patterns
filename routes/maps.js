// stored in /routes/maps.js

import { getGeoLocation } from '../lib/geoLocation.js';
import env from '../env.js';


export default async (hostComponent) => {
  const location = await getGeoLocation(true);
  let locationMarkers = [
    { lat: 34.0522, lng: -118.2437, name: 'Cafe 1', description: 'This is Cafe 1 in California' },
    { lat: 37.7749, lng: -122.4194, name: 'Cafe 2', description: 'This is Cafe 2 in California' },
    { lat: 51.5072, lng: -0.1276, name: 'Cafe 3', description: 'This is Cafe 3 in London' },
    { lat: 56.4907, lng: -4.2026, name: 'Cafe 4', description: 'This is Cafe 4 in Scotland' },
    { lat: 48.2082, lng: 16.3738, name: 'Cafe 5', description: 'This is Cafe 5 in Austria' },
  ];

  hostComponent.innerHTML = `
    <div id="map" style="width: 100%; height: 400px"></div>
  `;

  const loadGoogleMapsScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      // Use the environment variable here
      script.src = `https://maps.googleapis.com/maps/api/js?key=${env.API_KEY_GOOGLE_MAPS}&callback=initMap`;
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
      zoom: 4,
    };

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create marker for each cafe
    for (let i = 0; i < locationMarkers.length; i++) {
      let marker = new google.maps.Marker({
        position: locationMarkers[i],
        map: map,
        title: locationMarkers[i].name,
      });

      let infoWindowContent = document.createElement('div');
      infoWindowContent.innerHTML = `<div style='color: black;'><h2>${locationMarkers[i].name}</h2><p>${locationMarkers[i].description}</p></div>`;
      let infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      let infoWindowTimeout;

      marker.addListener('mouseover', function () {
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', function () {
        infoWindowTimeout = setTimeout(function () {
          infoWindow.close();
        }, 3000);
      });

      google.maps.event.addDomListener(infoWindowContent, 'mouseover', function () {
        clearTimeout(infoWindowTimeout);
      });

      google.maps.event.addDomListener(infoWindowContent, 'mouseout', function () {
        infoWindowTimeout = setTimeout(function () {
          infoWindow.close();
        }, 3000);
      });
    }
  };

  await loadGoogleMapsScript();
};
