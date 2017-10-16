'use strict';

const time = () => n

class Logger {

    constructor(name = 'root') {
        this.name = name;
    }

    info(message) {
        console.info(`${this.name} - ${(new Date).toLocaleString()} - ${message}`);
    }

};


module.exports = Logger;
Logger.log = new Logger()