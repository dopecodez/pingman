import { commandBuilder } from "./types"
import { spawn, ChildProcess } from 'child_process'
import { pingError, spawnError } from './errors'
import { ERROR_MESSAGES } from './messages'

const execute = async (builtCommand: commandBuilder): Promise<any> => {
    let ping: ChildProcess;
    let output: Array<string> = [];
    return new Promise<any>((resolve, reject) => {
        try {
            ping = spawn(builtCommand.command, builtCommand.arguments);
        } catch (error) {
            reject(new spawnError(ERROR_MESSAGES.SPAWN_ERROR.replace('args', builtCommand.arguments.toString())));
            return;
        }
        ping?.once("error", () => {
            reject(new pingError(ERROR_MESSAGES.GENERAL_PING_ERROR));
            return;
        });
        ping?.stdout?.on('data', (data) => {
            output.push(String(data));
        });
        ping?.on("close", () => {
            resolve(output);
            return;
        })
    })
}

export default execute;