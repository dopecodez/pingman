import { commandBuilder } from "./types"
import { spawn } from 'child_process'
import { pingError } from './errors'
import { ERROR_MESSAGES } from './messages'

const execute = async (builtCommand: commandBuilder): Promise<any> => {
    let output: Array<string> = [];
    return new Promise<any>((resolve, reject) => {
        const ping = spawn(builtCommand.command, builtCommand.arguments);
        ping.once("error", () => {
            reject(
              new pingError(
                ERROR_MESSAGES.GENERAL_PING_ERROR.replace(
                  "cmd",
                  builtCommand.command
                ).replace("args", builtCommand.arguments.toString())
              )
            );
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