import { commandBuilder, extendedPingOptions } from '../types'
import { emitWarning } from 'process'
import { ERROR_MESSAGES } from '../messages'

const windows = (ip: string, options?: extendedPingOptions): commandBuilder => {
    let args: Array<string> = [];
    const windowsRootPath = process.env.SystemRoot + '/system32/ping.exe';
    //NO Allowing Unsanitized user input into spawn.Checking each param and assigning
    if (!options) {
        args.push(ip);
        return {
            command: windowsRootPath,
            arguments: args
        }
    } else {
        if (options?.numeric) {
            args.push('-a')
        }
        if (typeof options?.numberOfEchos === 'number') {
            args.push('-n', options.numberOfEchos.toString())
        }
        if (typeof options?.bufferSize === 'number') {
            args.push('-l', options.bufferSize.toString())
        }
        if (typeof options?.TTL === 'number') {
            args.push('-i', options.TTL.toString())
        }
        if (typeof options?.timeout === 'number') {
            args.push('-w', (options.timeout * 1000).toString())
        }
        args.push(...(checkForIpV4SpecificFields(options)));
        args.push(...(checkForIpV6SpecificFields(options)));
        args.push(ip);
    }
    return {
        command: windowsRootPath,
        arguments: args
    }
};

//Checking for windows IPV4 fields as per official documentation
function checkForIpV4SpecificFields(options: extendedPingOptions): Array<string> {
    let optionsUsed: string = "";
    let args: Array<string> = [];
    if (options?.IPV4) {
        args.push('-4');
        if (options.doNotFragment) {
            args.push('-f');
        }
        if (typeof options?.recordRouteHops === 'number') {
            args.push('-r', options.recordRouteHops.toString())
        }
        if (typeof options?.hopTimestamp === 'number') {
            args.push('-s', options.hopTimestamp.toString())
        }
    } else {
        if (options.doNotFragment) {
            optionsUsed.concat(',', options.doNotFragment.toString())
        }
        if (options.recordRouteHops) {
            optionsUsed.concat(',', options.recordRouteHops.toString())
        }
        if (options.hopTimestamp) {
            optionsUsed.concat(',', options.hopTimestamp.toString())
        }
        if (optionsUsed.length > 0) {
            emitWarning(ERROR_MESSAGES.ENABLE_IPV4_EXPLICIT.replace('commands', optionsUsed), 'IPV4OnlyWarning');
        }
    }
    return args;
}

//Checking for windows IPV6 fields as per official documentation
function checkForIpV6SpecificFields(options: extendedPingOptions): Array<string> {
    let optionsUsed: string = "";
    let args: Array<string> = [];
    if (options?.IPV6) {
        args.push('-6');
        if (options.srcAddr) {
            args.push('-S', options.srcAddr);
        }
    } else {
        if (typeof options.srcAddr === 'string') {
            optionsUsed.concat(',', options.srcAddr)
        }
        if (optionsUsed.length > 0) {
            emitWarning(ERROR_MESSAGES.ENABLE_IPV6_EXPLICIT.replace('commands', optionsUsed), 'IPV6OnlyWarning');
        }
    }
    return args;
}

export default windows;