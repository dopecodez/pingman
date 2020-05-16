import { extendedPingOptions, commandBuilder, pingResponse } from './types'
import createBuilder from './builder/builder'
import * as os from 'os'
import Logger from './log'
import execute from './ping'
import parserFactory from './parser/parserFactory'

//the initial ping function call
const ping = async (ipAddress: string, pingOptions?: extendedPingOptions) => {
    let logger: Logger;
    //create a log file if logToFile option is enabled
    logger = new Logger(pingOptions?.logFilePath || 'log.txt', pingOptions?.logToFile || false);
    try {
        const platform = os.platform();
        const builtCommand: commandBuilder = createBuilder(ipAddress, platform, pingOptions);
        logger.writeToLogFile(JSON.stringify(builtCommand));
        const pingOutput : string[] = await execute(builtCommand);
        const parsedOutput: pingResponse = parserFactory(platform, pingOutput, pingOptions);
        logger.writeToLogFile(JSON.stringify(parsedOutput.output));
        return parsedOutput;
    } catch (error) {
        logger.writeToLogFile(error);
        throw error;
    }
}

export default ping;
// For CommonJS default export support
module.exports = ping;
module.exports.default = ping;

// Export types
export {
    extendedPingOptions, 
    pingOptions, 
    pingResponse
} from './types';