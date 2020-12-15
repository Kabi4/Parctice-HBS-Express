const city = document.querySelector('#searchInput');
const goButton = document.querySelector('#go');
if (city) {
    // city.addEventListener('change', (e) => {
    //     console.log('changed');

    // });
    goButton.addEventListener('click', () => {
        // goButton.setAttribute(
        //     'href',
        //     `http://localhost:3000/weather?add=${city.value}`
        // );
        city.value.trim() !== ''
            ? (window.location = `http://localhost:3000/weather?add=${city.value}`)
            : alert('The input Field is empty!');
    });
    city.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            city.value.trim() !== ''
                ? (window.location = `http://localhost:3000/weather?add=${city.value}`)
                : alert('The input Field is empty!');
        }
    });
}
