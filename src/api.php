<?php
require_once '../db.php';

function getWeatherData($city) {
    $url = WEATHER_API_URL . "?q=" . urlencode($city) . "&appid=" . WEATHER_API_KEY . "&units=metric";
    $response = file_get_contents($url);
    return json_decode($response, true);
}

if (isset($_GET['city'])) {
    $city = $_GET['city'];
    $weatherData = getWeatherData($city);

    // Save to database
    $stmt = $pdo->prepare('INSERT INTO weather_logs (city, temperature, description) VALUES (?, ?, ?)');
    $stmt->execute([
        $weatherData['name'],
        $weatherData['main']['temp'],
        $weatherData['weather'][0]['description']
    ]);

    echo json_encode($weatherData);
}
?>
