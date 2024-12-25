function searchData() {
    const country = document.getElementById("country").value.trim();
    if (!country) {
        alert("Please enter a country name.");
        return;
    }

    const countryUrl = `https://restcountries.com/v3.1/name/${country}`;
    fetch(countryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(data => showCountryData(data[0]))
        .catch(error => alert(error.message));
}

function showCountryData(data) {
    const output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous results

    const countryCard = document.createElement("div");
    countryCard.className = "col-md-6 col-lg-4 mb-4";
    countryCard.innerHTML = `
        <div class="card h-100">
            <img src="${data.flags.png}" class="card-img-top" alt="Flag of ${data.name.common}">
            <div class="card-body">
                <h5 class="card-title">${data.name.official}</h5>
                <p class="card-text">
                    <strong>Capital:</strong> ${data.capital ? data.capital[0] : "N/A"}<br>
                    <strong>Region:</strong> ${data.region}<br>
                    <strong>Population:</strong> ${data.population.toLocaleString()}<br>
                </p>
                <button class="btn btn-primary" onclick="fetchWeather('${data.name.common}')">More Details</button>
            </div>
        </div>
    `;
    output.appendChild(countryCard);
}

function fetchWeather(capital) {
    const apiKey = "d161cc6fc1cc49be9b534950240812"; 
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not found");
            }
            return response.json();
        })
        .then(data => showWeatherData(data))
        .catch(error => alert(error.message));
}


function showWeatherData(data) {
    const weatherModal = document.createElement("div");
    weatherModal.className = "modal fade";
    weatherModal.id = "weatherModal";
    weatherModal.tabIndex = -1;
    weatherModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Weather Information for ${data.location.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Temperature:</strong> ${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
                    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                    <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
                    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                    <p><strong>Last Updated:</strong> ${data.current.last_updated}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(weatherModal);
    const modal = new bootstrap.Modal(weatherModal);
    modal.show();

    weatherModal.addEventListener("hidden.bs.modal", () => {
        weatherModal.remove();
    });
}
