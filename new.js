function calculateWeather(temp, humidity, windSpeed) {
    const feelsLike = temp - (windSpeed * 0.2);
    const heatIndex = temp + (humidity * 0.1);
    
    let condition = "Normal";
    if (feelsLike < 0) condition = "Freezing";
    if (heatIndex > 32) condition = "Hot";
    if (windSpeed > 25) condition = "Windy";
    
    return {
        temperature: temp,
        humidity: humidity,
        windSpeed: windSpeed,
        feelsLike: feelsLike.toFixed(1),
        heatIndex: heatIndex.toFixed(1),
        condition: condition
    };
}

// module.exports = calculateWeather;