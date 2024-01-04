let userLocation;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      alert(`Location obtained: ${userLocation.latitude}, ${userLocation.longitude}`);
    }, (error) => {
      console.error(`Geolocation error: ${error.message}`);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
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
    const restaurantData = await getRestaurantData(userLocation.latitude, userLocation.longitude);
    const restaurantChoices = restaurantData.map((restaurant) => restaurant.strMeal);

    const chosenRestaurant = restaurantChoices[Math.floor(Math.random() * restaurantChoices.length)];

    resultDisplay.innerText = `You should try: ${chosenRestaurant}`;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    resultDisplay.innerText = "Error fetching restaurant data";
  }
}


async function getRestaurantData(latitude, longitude) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=seafood`);
    const data = await response.json();

    return data.meals || [];
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return [];
  }
}
