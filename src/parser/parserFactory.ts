import { isPlatformSupported } from '../helper'
import { supportedError } from '../errors'
import windows from './windows'
import mac from './mac'
import linux from './linux'
import { extendedPingOptions, pingResponse } from '../types'
import { ERROR_MESSAGES } from '../messages'
import parser from "./parser.interface";

//create instance of parser based on operating system
function parserFactory(platform: string, output?: string[], options?: extendedPingOptions): pingResponse {
    let parser: parser;
    let isWindows: boolean = false;
    if (!isPlatformSupported(platform)) {
        throw new supportedError(ERROR_MESSAGES.PLATFORM_NOT_SUPPORTED.replace('platform', platform));
    }
    if (platform === 'win32') {
        parser = new windows(defaultResponse, options);
        isWindows = true;
    } else if (platform === 'darwin') {
        parser = new mac(defaultResponse, options);
    } else {
        parser = new linux(defaultResponse, options);
    }
    let result = parseOutput(parser, isWindows, output);
    return result;
}

//parsing output line by line
function parseOutput(parser: parser, isWindows: boolean, output?: string[]): pingResponse {
    let lines = output?.join('').split('\n');
    let state = 0;
    let parsedOutput: pingResponse = defaultResponse;
    lines?.forEach((line) => {
        line = line.replace(stripRegex, '');
        if (line.length === 0) {
            // Do nothing if this is an empty line
        } else if (state === states.HEADER) {
            parser.processHeader(line);
            state = states.BODY
        } else if (state === states.BODY) {
            (!checkIfBodyEnded(line, isWindows)) ? parser.processBody(line) : state = states.FOOTER
        } else if (state === states.FOOTER) {
             parsedOutput = parser.processFooter(line)
        }
    });
    let result = createResult(parsedOutput, lines);
    return result;
}

//function to check if body ended and footer began
function checkIfBodyEnded(line: string, windows: boolean): boolean {
    if (windows) {
        let isPingSummaryLineShown = line.slice(-1) === ':';
        if (isPingSummaryLineShown) {
            return true;
        }
    } else {
        // Change state if it see a '---'
        if (line.indexOf('---') >= 0) {
            return true
        }
    }
    return false;
}

//Function to calculate and create the result
function createResult(result: pingResponse, lines?: Array<string>): pingResponse {
    // Concat output
    result.output = lines?.join('\n');

    // Determine alive
    result.alive = result?.times?.length > 0;

    // Update time at first successful line
    if (result.alive) {
        result.time = result.times[0];
    }

    // Get stddev
    if (result.stddev === undefined && result.alive) {
        let N = result.times.length;
        const mean = result.times.reduce((a: number, b: number) => a + b) / N;
        const stddev = Math.sqrt(result.times.map(x => Math.pow(x - mean, 2)).reduce((a: number, b: number) => a + b) / N);
        result.stddev = stddev;
    }

    // Fix min, avg, max, stddev up to 3 decimal points
    ['min', 'avg', 'max', 'stddev', 'packetLoss'].forEach((key) => {
        let v = (result as any)[key];
        if (typeof v === 'number') {
            (result as any)[key] = v.toFixed(3);
        }
    });

    return result;
}

//Default response object
const defaultResponse: pingResponse = {
    host: undefined,
    numericHost: undefined,
    alive: false,
    output: undefined,
    time: undefined,
    times: [],
    min: undefined,
    max: undefined,
    avg: undefined,
    stddev: undefined,
    packetLoss: undefined,
    bufferSize: undefined
};

//to strip space present at end of string
const stripRegex: RegExp = /[ ]*\r?\n?$/g;

//States of parsing - local use only
const states = {
    HEADER: 0,
    BODY: 1,
    FOOTER: 2
};

export default parserFactory;
