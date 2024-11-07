const os = require('os');
const fs = require('fs');

const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(msg) {
        //send an HTTP request
        console.log(msg);
        this.emit('messageLogged', { id: 1, url: 'http://' , message : {msg}});
    }
}

const logger = new Logger();
const logFile = './eventLog.txt';

const loggerToFile = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.msg}\n`;
    fs.appendFileSync(logFile, logMessage);
}

logger.on('messageLogged', loggerToFile);

setInterval(() => {
    const memorySpace = (os.freemem()/os.totalmem()) * 100;
    logger.log(`Memory Usage: ${memorySpace.toFixed(2)}%`);
}, 2000);

logger.log("envent started")
logger.log("application started");