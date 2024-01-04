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

function spinWheel() {
  const restaurantChoices = ["Restaurant A", "Restaurant B", "Restaurant C", "Restaurant D", "Restaurant E"];
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

  const angle = Math.random() * 2 * Math.PI;
  const chosenRestaurant = restaurantChoices[Math.floor(Math.random() * restaurantChoices.length)];

  resultDisplay.innerText = `You should try: ${chosenRestaurant}`;
}
