'use strict';

class Logger {

    constructor(system) {
        this.system = (system || 'tiny-frame') + ' | ';
    }

    logger(name) {
        const info = (message) => {
            console.info(`${this.system}[${(new Date).toLocaleString()}]:[${name}]${message}`);
        };
        const error = (message) => {
            console.error(`${this.system}[${(new Date).toLocaleString()}]:[${name}]${message}`);
        };
        return {
            info:info,
            error:error
        };
    }
}

module.exports = Logger;

