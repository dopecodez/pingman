import fs from 'fs'

class Logger {
    logFile: any
    enabledLogging: boolean

    constructor(logFilePath: string, enabledLogging: boolean) {
        let fullPath = __dirname + logFilePath;
        if (enabledLogging) {
            this.logFile = fs.createWriteStream(fullPath, { flags: 'a' });
            this.enabledLogging = true
        } else {
            this.logFile = {}
            this.enabledLogging = false
        }
    }

    public writeToLogFile(message: string): void {
        if (this.enabledLogging) {
            this.logFile.write(message);
        }
    }
}

export default Logger;