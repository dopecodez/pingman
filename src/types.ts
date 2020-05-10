export type options = {
    hostnameResolve?: boolean,
    numberOfEchos?: number,
    bufferSize?: number,
    doNotFragment?: boolean,
    TTL?: number,
    recordRouteHops?: number,
    hopTimestamp?: number,
    timeout?: number,
    srcAddr?: string,
    numberOfAttempts?: number,
    logToFile?: boolean,
    logFilePath?: string
    IPV6?: boolean,
    IPV4?: boolean
}

export type commandBuilder = {
    command: string,
    arguments: string[]
}