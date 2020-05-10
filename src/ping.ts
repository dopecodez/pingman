import { commandBuilder } from "./types"
import { spawn, ChildProcess } from 'child_process'
import { pingError } from 'errors'
import { ERROR_MESSAGES } from 'messages'

const execute = async (builtCommand: commandBuilder): Promise<any> => {
    let ping: ChildProcess;
    let output: Array<string>;
    let parsedOutput: any;
    try {
        ping = spawn(builtCommand.command, builtCommand.arguments);
    } catch (error) {
        throw error;
    }
    ping.once("error", handlePingError);
    ping?.stdout?.on('data', function (data) {
        output.push(String(data));
    });
    ping.on("close", () => {
        parsedOutput = parseOutput(output)
    })
    return [];
}

const handlePingError = (): void => {
    throw new pingError(ERROR_MESSAGES.GENERAL_PING_ERROR)
}

const parseOutput = (output: Array<string>): any => {
    throw new pingError('TO-DO Implement Parser')
}

export default execute;