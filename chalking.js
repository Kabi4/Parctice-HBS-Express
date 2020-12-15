const chalk = require('chalk');

const log = (message, type = 'default') => {
    message = JSON.stringify(message);

    switch (type) {
        case 'success':
            console.log(chalk.green.bold(message));
            break;
        case 'warning':
            console.log(chalk.yellow.bgBlue.bold(message));
            break;
        case 'error':
            console.log(chalk.red.bgWhite.bold(message));
            break;
        default:
            console.log(chalk.white.bgBlue.underline(message));
    }
};

module.exports = log;
