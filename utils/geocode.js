const request = require('request');
module.exports = geocode = (city = 'haldwani', callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        city
    )}.json?access_token=${process.env.MAPBOX_ACCESSTOKEN}&limit=1`;
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
        } else if (response.body.features.length === 0) {
            callback(
                {
                    error:
                        'Invalid City Name provided! Unable to found location in earth!',
                    city,
                },
                undefined
            );
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                city: response.body.features[0].place_name,
            });
        }
    });
};

// request({ url: mapboxURL, json: true }, (error, response) => {
//     if (error) {
//         log(
//             "Unable to connect to api's! Please check your network connectivity try again!",
//             'error'
//         );
//         return;
//     }
//     if (response.body.features.length === 0) {
//         log(
//             'Invalid City Name provided! Unable to found location in earth!',
//             'error'
//         );
//         return;
//     }
//     const data = response.body;
//     log(
//         `The city ${data.features[0].text} have latitude of ${data.features[0].center[1]} and longitued of ${data.features[0].center[0]}`,
//         'success'
//     );
// });
