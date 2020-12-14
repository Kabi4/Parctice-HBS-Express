const path = require('path');
const express = require('express');
const app = express(); //initialising express app

app.set('view engine', 'hbs'); //setting the view engines like PUG HBS
app.set('views', path.join(__dirname, 'views')); //setting the directory to search for the view files
app.use(express.static(path.join(__dirname, 'public'))); //setting the static path to look for at last when no where link to be found

//Setting up request managing

app.get('/', (req, res) => {
    res.render('index', {
        weather: 'Sunny',
        title: 'Overview',
    });
});

app.get('/about', (req, res) => {
    // res.send({
    //     name: 'Kushagra Singh Karki',
    //     age: 21,
    // });
    res.send('about', {
        title: 'About',
    });
});

app.get('/help', (req, res) => {
    res.render(`help`, {
        title: 'Help and Support',
        message:
            'We are looking forward to fix your problem please drop the problem with more and more information as possible and wait until our teams responses.',
    });
});

app.get('/weather', (req, res) => {
    res.send({
        temprature: 19.2,
        units: 'celcius',
        weather: '🌨 ',
    });
});

//starting up server
app.listen(3000, '127.0.0.1', () => {
    console.log('Sever listeing to requests');
});
