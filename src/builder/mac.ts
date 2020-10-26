import { commandBuilder, extendedPingOptions } from '../types'
import { emitWarning } from 'process'
import { ERROR_MESSAGES } from '../messages'

const mac = (ip: string, options?: extendedPingOptions): commandBuilder => {
    let defaultNumberOfEchoes = '4'; //default needed because mac by default has continous ping till we cancel
    let args: Array<string> = [];
    let buildCommand: commandBuilder = {
        command: '/sbin/ping',
        arguments: args
    };
    //NO Allowing Unsanitized user input into spawn.Checking each param and assigning
    if (!options) {
        buildCommand.arguments.push('-c', defaultNumberOfEchoes);
        args.push(ip);
        return buildCommand;
    }
    if (typeof options?.numberOfEchos === 'number') {
        args.push('-c', options.numberOfEchos.toString());
    } else {
        args.push('-c', defaultNumberOfEchoes);
    }
    if (options?.soDebugOption) {
        args.push('-d');
    }
    if (typeof options?.interval === 'number') {
        if (options?.floodPing) {
            args.push('-f');
            emitWarning(ERROR_MESSAGES.FLOOD_AND_INTERVAL_ARGS, 'argumentWarning');
        } else {
            args.push('-i', options?.interval.toString())
        }
    }
    if (options?.floodPing) {
        if (typeof options?.interval === 'number') {
            args.push('-i', options?.interval.toString())
        } else {
            args.push('-f');
            emitWarning(ERROR_MESSAGES.FLOOD_AND_INTERVAL_ARGS, 'argumentWarning');
        }
    }
    if (typeof options?.interfaceAddress === 'string') {
        args.push('-I', options.interfaceAddress);
    }
    if (options?.suppressLoopback) {
        args.push('-L');
    }
    if (typeof options?.TTL === 'number') {
        args.push('-m', options.TTL.toString()); //change to -t for linux
    }
    if (options.doNotFragment) {
        args.push('-D');
    }
    if (options?.numeric) {
        args.push('-n');
    }
    if (typeof options?.pattern === 'string') {
        args.push('-p', options.pattern);
    }
    if (options?.quiet) {
        args.push('-q');
    }
    if (typeof options?.srcAddr === 'string') {
        args.push('-S', options.srcAddr); //Delete for Linux
    }
    if (typeof options?.bufferSize === 'number') {
        args.push('-s', options.bufferSize.toString())
    }
    if (typeof options?.timeBeforeExit === 'number') {
        args.push('-t', options.timeBeforeExit.toString()) //change to -w for linux
    }
    if (options?.verboseOutput) {
        args.push('-v')
    }
    if (typeof options?.timeout === 'number') {
        args.push('-W', (options.timeout * 1000).toString())
    }
    if (options?.IPV6) {
        buildCommand.command = '/sbin/ping6'
    }
    args.push(ip);
    buildCommand.arguments = args;
    return buildCommand;
};

export default mac;
