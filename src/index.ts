import { extendedOptions, commandBuilder } from 'types'
import createBuilder from 'builder/builder'
import * as os from 'os'
import Logger from './log'
import execute from './ping'

const ping = async (IpAddress: string, pingOptions?: extendedOptions) => {
    let logger: Logger;
    logger = new Logger(pingOptions?.logFilePath || 'log.txt', pingOptions?.logToFile || false);
    try {
        const platform = os.platform();
        const builtCommand: commandBuilder = createBuilder(IpAddress, platform, pingOptions);
        const pingOutput : any = execute(builtCommand);
        return pingOutput;
    } catch (error) {
        logger.writeToLogFile(error);
    }
}

export default ping;