const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, '127.0.0.1', () => {
    console.log('Sever listeing to requests');
});
