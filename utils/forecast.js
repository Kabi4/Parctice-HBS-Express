const request = require('request');

module.exports = forecast = (lag, lat, city, callback) => {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lag}&key=${process.env.WEATHER_APIKEY}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(
                {
                    error:
                        "Unable to connect to api's! Please check your network connectivity try again!",
                    city,
                },
                undefined
            );
        } else if (response.body.error) {
            callback(
                {
                    error:
                        'Invalid longitude or Latitude provided! Unable to found location!',
                    city,
                },
                undefined
            );
        } else {
            response.body.city = city;
            callback(undefined, response.body);
        }
    });
};

// request({ url: weatherURLCurrent, json: true }, (error, response) => {
//     if (error) {
//         log(
//             "Unable to connect to api's! Please check your network connectivity try again!",
//             'error'
//         );
//         return;
//     }
//     if (response.body.error) {
//         log(
//             'Invalid longitude or Latitude provided! Unable to found location!',
//             'error'
//         );
//         return;
//     }
//     const data = response.body;
//     log(
//         `The current temprature for city ${data.data[0].city_name} is ${data.data[0].temp} degree with rain chances of ${data.data[0].precip} precipitation.`,
//         'success'
//     );
// });
