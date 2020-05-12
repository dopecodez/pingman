import { commandBuilder } from "./types"
import { spawn, ChildProcess } from 'child_process'
import { pingError, spawnError } from './errors'
import { ERROR_MESSAGES } from './messages'

const execute = async (builtCommand: commandBuilder): Promise<any> => {
    let ping: ChildProcess;
    let output: Array<string> = [];
    try {
        ping = spawn(builtCommand.command, builtCommand.arguments);
    } catch (error) {
        throw new spawnError(ERROR_MESSAGES.SPAWN_ERROR.replace('args', builtCommand.arguments.toString()));
    }
    ping.once("error", handlePingError);
    ping?.stdout?.on('data', function (data) {
        output.push(String(data));
    });
    ping.on("close", () => {
        return output;
    })
}

const handlePingError = (): void => {
    throw new pingError(ERROR_MESSAGES.GENERAL_PING_ERROR)
}

export default execute;