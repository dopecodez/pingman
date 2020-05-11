import { options, output } from "../types";

interface parser {
    config?: options
    processHeader(line: string): void
    processBody(line: string): void
    processFooter(line: string): output
}

export default parser