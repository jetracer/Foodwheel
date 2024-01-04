let userLocation;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      alert(`Location obtained: ${userLocation.lat}, ${userLocation.lng}`);
    }, (error) => {
      console.error(`Geolocation error: ${error.message}`);
      askForZipCode();
    });
  } else {
    askForZipCode();
  }
}

function askForZipCode() {
  const zipInput = prompt("Geolocation not available. Enter your zip code:");
  if (zipInput) {
    getZipCodeLocation(zipInput);
  } else {
    alert("Zip code not provided. Please try again.");
  }
}

function getZipCodeLocation(zipCode) {
  // Add logic to convert the zip code to latitude and longitude.
  // This can be done using a geocoding service or an API.

  // For simplicity, let's assume the user entered a valid zip code and set a default location.
  userLocation = {
    lat: 40.7128, // Default to New York City latitude
    lng: -74.0060 // Default to New York City longitude
  };

  alert(`Location obtained from zip code: ${userLocation.lat}, ${userLocation.lng}`);
}

async function spinWheel() {
  const canvas = document.getElementById("spinnerCanvas");
  const resultDisplay = document.getElementById("result");

  if (!userLocation) {
    alert("Please get your location first.");
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.beginPath();
  ctx.arc(centerX, centerY, canvas.width / 2 - 10, 0, 2 * Math.PI);
  ctx.stroke();

  try {
    const restaurantData = await getRestaurantData(userLocation.lat, userLocation.lng);
    const restaurantChoices = restaurantData.businesses.map((business) => business.name);

    const chosenRestaurant = restaurantChoices[Math.floor(Math.random() * restaurantChoices.length)];

    resultDisplay.innerText = `You should try: ${chosenRestaurant}`;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    resultDisplay.innerText = "Error fetching restaurant data";
  }
}

async function getRestaurantData(lat, lng) {
  const yelpApiKey = 'ccfIzOXPFiiM5lnqEGmuKJdJ0L6MN6PblzQeT6sAm3Jo5ybRd-eprvsy5szeYQy-IMA-_Xqx_4jRqbQfDSh29iVHrYUwf32tQHDYz3FBE2NwGnXMLJhhPIBv6gSWZXYx';

  try {
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&categories=restaurants&limit=10`, {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
      },
      mode: 'cors', // Add this line
    });

    if (!response.ok) {
      throw new Error(`Yelp API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return [];
  }
}

