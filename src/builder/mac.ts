import { commandBuilder, extendedOptions } from '../types'
import { emitWarning } from 'process'
import { ERROR_MESSAGES } from '../messages'

const mac = (ip: string, options?: extendedOptions): commandBuilder => {
    let defaultNumberOfEchoes = '4';
    let args: Array<string> = [];
    let buildCommand: commandBuilder = {
        command: 'ping',
        arguments: args
    };
    args.push(ip);
    if (!options) {
        return buildCommand;
    }
    if (options?.numberOfEchos) {
        args.push('-n', options.numberOfEchos.toString());
    } else {
        args.push('-n', defaultNumberOfEchoes);
    }
    if (options?.soDebugOption) {
        args.push('-d');
    }
    if (options?.interval) {
        if (options?.floodPing) {
            args.push('-f');
            emitWarning(ERROR_MESSAGES.FLOOD_AND_INTERVAL_ARGS, 'argumentWarning');
        } else {
            args.push('-i', options?.interval.toString())
        }
    }
    if(options?.interfaceAddress){
        args.push('-I', options.interfaceAddress);
    }
    if(options?.suppressLoopback){
        args.push('-L');
    }
    if (options?.TTL) {
        args.push('-m', options.TTL.toString()); //TO-DO change to -t for linux
    }
    if (options?.numeric) {
        args.push('-n');
    }
    if(typeof options?.pattern === 'string'){
        args.push('-p', options.pattern);
    }
    if(options?.quiet){
        args.push('-q');
    }
    if(typeof options?.srcAddr === 'string'){
        args.push('-S', options.srcAddr); //Delete for Linux
    }
    if(typeof options?.bufferSize === 'number') {
        args.push('-s', options.bufferSize.toString())
    }
    if(typeof options?.timeBeforeExit === 'number'){
        args.push('-t', options.timeBeforeExit.toString()) //change to -w for linux
    }
    if(options?.verboseOutput){
        args.push('-v')
    }
    if(typeof options?.timeout === 'number'){
        args.push('-w', options.timeout.toString())
    }
    if (options?.IPV6) {
        buildCommand.command = 'ping6'
    }
    buildCommand.arguments = args;
    return buildCommand;
};

export default mac;