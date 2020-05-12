const fs = require('fs');

//class for logging to file
class Logger {
    logFile: any
    enabledLogging: boolean

    //constructor to open a write stream if logging is enabled
    constructor(logFilePath: string, enabledLogging: boolean) {
        let fullPath = logFilePath;
        console.log(fullPath)
        if (enabledLogging) {
            this.logFile = fs.createWriteStream(fullPath, { flags: 'a+' , encoding: 'utf8'});
            this.enabledLogging = true
        } else {
            this.logFile = {}
            this.enabledLogging = false
        }
    }

    //write to file
    public async writeToLogFile(message: string): Promise<void> {
        if (this.enabledLogging) {
            this.logFile.write(message, 'utf8');
        }
    }
}

export default Logger;