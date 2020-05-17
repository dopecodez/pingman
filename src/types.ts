export interface extendedPingOptions extends pingOptions{
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
    verboseOutput?: boolean,
    doNotFragment?: boolean,
    srcAddr?: string
}

export interface pingOptions {
    numeric?: boolean,
    bufferSize?: number,
    logToFile?: boolean,
    logFilePath?: string
    IPV6?: boolean,
    IPV4?: boolean,
    numberOfEchos?: number,
    TTL?: number,
    timeout?: number
}

export type commandBuilder = {
    command: string,
    arguments: string[]
}

export type pingResponse = {
    host: string | undefined,
    numericHost: string | undefined,
    alive: boolean | undefined,
    output: string | undefined,
    time: number | undefined,
    times: Array<number>,
    min: number | undefined,
    max: number | undefined,
    avg: number | undefined,
    bufferSize: number | undefined,
    stddev: number | undefined,
    packetLoss: string | undefined,
}