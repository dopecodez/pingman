import { extendedPingOptions, pingResponse } from "../types";

interface parser {
    config?: extendedPingOptions
    processHeader(line: string): void
    processBody(line: string): void
    processFooter(line: string): pingResponse
}

export default parser