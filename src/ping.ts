import { commandBuilder } from "./types"
import { spawn, ChildProcess } from 'child_process'
import { spawnError } from './errors'
import { ERROR_MESSAGES } from './messages'

const execute = async (builtCommand: commandBuilder): Promise<any> => {
    let ping: ChildProcess;
    let output: Array<string> = [];
    return new Promise<any>((resolve, reject) => {
        try {
            ping = spawn(builtCommand.command, builtCommand.arguments);
        } catch (error) {}
        ping.once("error", () => {
            reject(new spawnError(ERROR_MESSAGES.SPAWN_ERROR.replace('args', builtCommand.arguments.toString())));
        });
        ping.stdout?.on('data', (data) => {
            output.push(String(data));
        });
        ping.on("close", () => {
            resolve(output);
        })
    })
}

export default execute;