$(document).ready(function () {
    $('#getWeather').click(function () {
        var city = $('#city').val();
        $.ajax({
            url: 'src/api.php',
            method: 'GET',
            data: { city: city },
            success: function (data) {
                var weather = JSON.parse(data);
                $('#weatherResult').html(
                    `<h3>Weather in ${weather.name}</h3>
                     <p>Temperature: ${weather.main.temp}°C</p>
                     <p>Description: ${weather.weather[0].description}</p>`
                );
                fetchWeatherLogs();
            }
        });
    });

    function fetchWeatherLogs() {
        $.ajax({
            url: 'src/fetch_weather.php',
            method: 'GET',
            success: function (data) {
                var logs = JSON.parse(data);
                var logsHtml = '<ul class="list-group">';
                logs.forEach(function (log) {
                    logsHtml += `<li class="list-group-item">
                                    <strong>${log.city}</strong>: 
                                    ${log.temperature}°C, 
                                    ${log.description} 
                                    <em>(${log.created_at})</em>
                                </li>`;
                });
                logsHtml += '</ul>';
                $('#weatherLogs').html(logsHtml);
            }
        });
    }

    fetchWeatherLogs();
});