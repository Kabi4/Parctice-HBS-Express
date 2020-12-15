const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express(); //initialising express app
const log = require('./chalking'); //Importing Colored Logs

app.set('view engine', 'hbs'); //setting the view engines like PUG HBS
app.set('views', path.join(__dirname, 'templates/views')); //setting the directory to search for the view files
app.use(express.static(path.join(__dirname, 'public'))); //setting the static path to look for at last when no where link to be found
hbs.registerPartials(path.join(__dirname, './templates/partials'));

//Setting Path for accessing enviroment Variables
dotenv.config({ path: './config.env' });

//Setting up request managing

app.get('/', (req, res) => {
    res.render('index', {
        // weather: 'Sunny',
        title: 'Overview',
        name: 'Kushagra Singh Karki',
    });
});

app.get('/about', (req, res) => {
    // res.send({
    //     name: 'Kushagra Singh Karki',
    //     age: 21,
    // });
    res.render('about', {
        title: 'About',
        name: 'Kushagra Singh Karki',
    });
});

app.get('/help', (req, res) => {
    res.render(`help`, {
        title: 'Help and Support',
        message:
            'We are looking forward to fix your problem please drop the problem with more and more information as possible and wait until our teams responses.',
        name: 'Kushagra Singh Karki',
    });
});

app.get('/weather', (req, res) => {
    if (req.query.add) {
        const city = req.query.add.replace(/"/g, '').replace(/'/g, '');
        geocode(city, (error, data) => {
            error &&
                res.render('weather', {
                    title: 'Weather',
                    city: error.city,
                    error: error.error,
                    temp: 'Not Available',
                    preci: 'Not Available',
                    name: 'Kushagra Singh Karki',
                });
            // data && log(data, 'success');
            data &&
                forecast(
                    data.longitude,
                    data.latitude,
                    data.city,
                    (error, data) => {
                        error &&
                            res.render('weather', {
                                title: 'Weather',
                                city: error.city,
                                error: error.error,
                                temp: 'Not Available',
                                preci: 'Not Available',
                                name: 'Kushagra Singh Karki',
                            });
                        // data &&
                        //     console.log(
                        //         `Today's sky will be ${data.data[0].weather.description}.The current temprature for ${data.city} is ${data.data[0].temp} degree with rain chances of ${data.data[0].precip} precipitation.`
                        //     );
                        data &&
                            res.render('weather', {
                                title: 'Weather',
                                city: data.city,
                                error: `Today's sky will be ${data.data[0].weather.description}.The current temprature for ${data.city} is ${data.data[0].temp} degree with rain chances of ${data.data[0].precip} precipitation.`,
                                temp: data.data[0].temp,
                                preci: data.data[0].precip,
                                name: 'Kushagra Singh Karki',
                            });
                    }
                );
        });

        return;
    }

    res.render('weather', {
        temp: 'N/A',
        preci: 'N/A',
        title: 'Weather',
        error: 'No city mentioned to fetch weather details!',
        name: 'Kushagra Singh Karki',
    });
});

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404|Page Not Found',
        name: 'Kushagra Singh Karki',
        message:
            '😞 Sorry Could not help with this article Please Contact Our Team',
    });
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404|Page Not Found',
        name: 'Kushagra Singh Karki',
        message: "Sorry we can't find the page you looking for 🥦 .",
    });
});

//starting up server
app.listen(3000, '127.0.0.1', () => {
    console.log('Sever listeing to requests');
});
