const apiKey = "196bdf4af8226ff4ad0de0388b08c461"; // API key dari OpenWeather

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML =
        `<p class="text-red-500">Kota tidak ditemukan!</p>`;
      return;
    }

    document.getElementById("weatherResult").innerHTML = `
      <h2 class="text-xl font-semibold mb-2">${data.name}, ${data.sys.country}</h2>
      <p class="text-lg capitalize">${data.weather[0].description}</p>
      <p class="text-3xl font-bold">${data.main.temp}°C</p>
      <p>🌡️ Min: ${data.main.temp_min}°C | Max: ${data.main.temp_max}°C</p>
      <p>💧 Kelembapan: ${data.main.humidity}%</p>
      <p>💨 Angin: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML =
      `<p class="text-red-500">Gagal mengambil data cuaca.</p>`;
  }
}
