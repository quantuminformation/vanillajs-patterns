
export async function getGeoLocation(privacy) {
  let latitude
  let longitude

  try {
    // Try to get user's current location using the geolocation API
    const { coords } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    latitude = coords.latitude
    longitude = coords.longitude
    console.log("Got user location using geolocation API:", {
      latitude,
      longitude
    })
  } catch (error) {
    // If unable to get user's location using the geolocation API, use a paid IP geolocation API or download a ip dataset
  }

  if (privacy) {
    // Round latitude and longitude to nearest 0.1 if privacy is enabled
    latitude = Math.round(latitude * 10) / 10;
    longitude = Math.round(longitude * 10) / 10;
    console.log("Rounded latitude and longitude to nearest 0.1:", {
      latitude,
      longitude
    });
  }


  return { latitude, longitude }
}
