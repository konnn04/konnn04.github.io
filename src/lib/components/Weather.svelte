<script>
    import { onMount } from 'svelte';
    export let location = 'Ho Chi Minh City';
    export let isShowDetails = true;
    export let isShowForecast = true;

    let weatherData = null;
    let currentWeather = null;
    let loading = true;
    let error = null;

    // Mapping weather code to icons and descriptions
    const weatherCodeMap = {
        0: { icon: 'bi-sun', description: 'Clear sky' },
        1: { icon: 'bi-sun-cloud', description: 'Mainly clear' },
        2: { icon: 'bi-cloud-sun', description: 'Partly cloudy' },
        3: { icon: 'bi-clouds', description: 'Overcast' },
        45: { icon: 'bi-cloud-fog', description: 'Fog' },
        48: { icon: 'bi-cloud-fog', description: 'Depositing rime fog' },
        51: { icon: 'bi-cloud-drizzle', description: 'Light drizzle' },
        53: { icon: 'bi-cloud-drizzle-fill', description: 'Moderate drizzle' },
        55: { icon: 'bi-cloud-drizzle-fill', description: 'Dense drizzle' },
        56: { icon: 'bi-cloud-sleet', description: 'Light freezing drizzle' },
        57: { icon: 'bi-cloud-sleet-fill', description: 'Dense freezing drizzle' },
        61: { icon: 'bi-cloud-rain', description: 'Slight rain' },
        63: { icon: 'bi-cloud-rain-fill', description: 'Moderate rain' },
        65: { icon: 'bi-cloud-rain-heavy-fill', description: 'Heavy rain' },
        66: { icon: 'bi-cloud-sleet', description: 'Light freezing rain' },
        67: { icon: 'bi-cloud-sleet-fill', description: 'Heavy freezing rain' },
        71: { icon: 'bi-cloud-snow', description: 'Slight snow fall' },
        73: { icon: 'bi-cloud-snow-fill', description: 'Moderate snow fall' },
        75: { icon: 'bi-cloud-snow-fill', description: 'Heavy snow fall' },
        77: { icon: 'bi-cloud-snow', description: 'Snow grains' },
        80: { icon: 'bi-cloud-rain', description: 'Slight rain showers' },
        81: { icon: 'bi-cloud-rain-fill', description: 'Moderate rain showers' },
        82: { icon: 'bi-cloud-rain-heavy-fill', description: 'Violent rain showers' },
        85: { icon: 'bi-cloud-snow', description: 'Slight snow showers' },
        86: { icon: 'bi-cloud-snow-fill', description: 'Heavy snow showers' },
        95: { icon: 'bi-cloud-lightning', description: 'Thunderstorm' },
        96: { icon: 'bi-cloud-lightning-rain', description: 'Thunderstorm with slight hail' },
        99: { icon: 'bi-cloud-lightning-rain-fill', description: 'Thunderstorm with heavy hail' }
    };

    async function fetchWeatherData() {
        try {
            loading = true;
            const response = await fetch('https://api.open-meteo.com/v1/forecast?timezone=Asia%2FBangkok&latitude=10.823&longitude=106.6296&hourly=temperature_2m,weather_code,rain,visibility,surface_pressure,pressure_msl,relative_humidity_2m,dew_point_2m,uv_index');
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            weatherData = data;
            
            // Get current hour's data
            const now = new Date();
            const currentHour = now.getHours();
            const currentIndex = currentHour;
            
            currentWeather = {
                temperature: weatherData.hourly.temperature_2m[currentIndex],
                weatherCode: weatherData.hourly.weather_code[currentIndex],
                rain: weatherData.hourly.rain[currentIndex],
                humidity: weatherData.hourly.relative_humidity_2m[currentIndex],
                pressure: weatherData.hourly.pressure_msl[currentIndex],
                uvIndex: weatherData.hourly.uv_index[currentIndex],
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                forecast: []
            };
            
            // Get forecast for next 6 hours
            for (let i = 1; i <= 6; i++) {
                const forecastIndex = (currentHour + i) % 24;
                currentWeather.forecast.push({
                    temperature: weatherData.hourly.temperature_2m[forecastIndex],
                    weatherCode: weatherData.hourly.weather_code[forecastIndex],
                    time: new Date(now.setHours(now.getHours() + 1)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
            }
            
            loading = false;
        } catch (err) {
            error = err.message;
            loading = false;
            console.error('Error fetching weather data:', err);
        }
    }

    onMount(() => {
        fetchWeatherData();
        // Update weather data every 30 minutes
        const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="weather-widget">
    {#if loading}
        <div class="loading">
            <i class="bi bi-cloud-sun loading-icon"></i>
            <p>Loading weather data...</p>
        </div>
    {:else if error}
        <div class="error">
            <i class="bi bi-exclamation-triangle"></i>
            <p>Failed to load weather data</p>
        </div>
    {:else}
        <div class="weather-card">
            <div class="location">
                <i class="bi bi-geo-alt"></i>
                <span>Ho Chi Minh City</span>
            </div>
            
            <div class="current-weather">
                <div class="weather-icon">
                    <i class="bi {weatherCodeMap[currentWeather.weatherCode]?.icon || 'bi-question-circle'}"></i>
                </div>
                
                <div class="temperature">
                    <span>{currentWeather.temperature.toFixed(1)}°C</span>
                </div>
                
                <div class="description">
                    {weatherCodeMap[currentWeather.weatherCode]?.description || 'Unknown'}
                </div>
            </div>
            
            {#if isShowDetails }
            <div class="weather-details">
                <div class="detail-item">
                    <i class="bi bi-droplet"></i>
                    <span>{currentWeather.humidity}%</span>
                    <small>Humidity</small>
                </div>
                
                <div class="detail-item">
                    <i class="bi bi-umbrella"></i>
                    <span>{currentWeather.rain} mm</span>
                    <small>Rain</small>
                </div>
                
                <div class="detail-item">
                    <i class="bi bi-sun"></i>
                    <span>{currentWeather.uvIndex}</span>
                    <small>UV Index</small>
                </div>
                
                <div class="detail-item">
                    <i class="bi bi-speedometer2"></i>
                    <span>{currentWeather.pressure} hPa</span>
                    <small>Pressure</small>
                </div>
            </div>
            {/if}
            
            {#if isShowForecast}            
            <div class="forecast">
                <h6>Hourly Forecast</h6>
                <div class="forecast-items">
                    {#each currentWeather.forecast as forecast, index}
                        <div class="forecast-item">
                            <span class="forecast-time">{forecast.time}</span>
                            <i class="bi {weatherCodeMap[forecast.weatherCode]?.icon || 'bi-question-circle'} forecast-icon"></i>
                            <span class="forecast-temp">{forecast.temperature.toFixed(0)}°</span>
                        </div>
                    {/each}
                </div>
            </div>
            
            <div class="last-updated">
                <small>Last updated: {new Date().toLocaleTimeString()}</small>
                <button class="refresh-btn" on:click={fetchWeatherData}>
                    <i class="bi bi-arrow-clockwise"></i>
                </button>
            </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .weather-widget {
        width: 100%;
        font-family: 'Inter', 'Roboto', sans-serif;
    }
    
    .loading, .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        color: white;
        text-align: center;
    }
    
    .loading-icon {
        font-size: 2rem;
        margin-bottom: 10px;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
    
    .weather-card {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 16px;
        padding: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        color: white;
    }
    
    .location {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-size: 1rem;
    }
    
    .location i {
        margin-right: 10px;
        color: #ff9800;
    }
    
    .current-weather {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .weather-icon {
        font-size: 3.5rem;
        margin-bottom: 10px;
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    
    .temperature {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 5px;
    }
    
    .description {
        font-size: 1rem;
        opacity: 0.8;
        text-align: center;
    }
    
    .weather-details {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    
    .detail-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    
    .detail-item i {
        font-size: 1.2rem;
        margin-bottom: 5px;
        color: #64b5f6;
    }
    
    .detail-item span {
        font-weight: 600;
        font-size: 1rem;
    }
    
    .detail-item small {
        font-size: 0.75rem;
        opacity: 0.8;
    }
    
    .forecast h6 {
        margin-bottom: 10px;
        font-weight: 600;
        opacity: 0.8;
    }
    
    .forecast-items {
        display: flex;
        justify-content: space-between;
        overflow-x: auto;
        padding-bottom: 10px;
    }
    
    .forecast-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 auto;
        margin-right: 15px;
    }
    
    .forecast-time {
        font-size: 0.75rem;
        margin-bottom: 5px;
        opacity: 0.8;
    }
    
    .forecast-icon {
        font-size: 1.2rem;
        margin-bottom: 5px;
    }
    
    .forecast-temp {
        font-weight: 600;
    }
    
    .last-updated {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .last-updated small {
        opacity: 0.7;
    }
    
    .refresh-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        padding: 5px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease;
    }
    
    .refresh-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(180deg);
    }
    
    /* Responsive adjustments */
    @media (max-width: 576px) {
        .weather-details {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .forecast-items {
            padding-bottom: 5px;
        }
        
        .forecast-item {
            margin-right: 10px;
        }
    }
</style>