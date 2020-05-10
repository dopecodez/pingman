export interface extendedOptions extends options{
    bufferSize?: number, 
    recordRouteHops?: number,
    hopTimestamp?: number,
    interval?: number,
    soDebugOption?: boolean,
    floodPing?: boolean,
    interfaceAddress?: string,
    suppressLoopback?: boolean,
    pattern?: string,
    quiet?: boolean,
    timeBeforeExit?: number,
    verboseOutput?: boolean
}

export interface options {
    numeric?: boolean,
    pingUntilAlive?: boolean,
    logToFile?: boolean,
    logFilePath?: string
    IPV6?: boolean,
    IPV4?: boolean,
    numberOfEchos?: number,
    doNotFragment?: boolean,
    TTL?: number,
    srcAddr?: string,
    timeout?: number
}

export type commandBuilder = {
    command: string,
    arguments: string[]
}