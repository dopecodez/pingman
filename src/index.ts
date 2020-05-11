import { options, extendedOptions, commandBuilder, output } from 'types'
import createBuilder from 'builder/builder'
import * as os from 'os'
import Logger from './log'
import execute from './ping'
import parserFactory from './parser/parserFactory'


const ping = async (IpAddress: string, pingOptions?: extendedOptions) => {
    let logger: Logger;
    logger = new Logger(pingOptions?.logFilePath || 'log.txt', pingOptions?.logToFile || false);
    try {
        const platform = os.platform();
        const builtCommand: commandBuilder = createBuilder(IpAddress, platform, pingOptions);
        logger.writeToLogFile(JSON.stringify(builtCommand));
        const pingOutput : string[] = await execute(builtCommand);
        const parsedOutput: output = parserFactory(platform, pingOutput, pingOptions);
        logger.writeToLogFile(JSON.stringify(parsedOutput.output));
        return parsedOutput;
    } catch (error) {
        logger.writeToLogFile(error);
        throw error;
    }
}

export default ping;