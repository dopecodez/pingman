import { options, output } from "../types";
import parser from "./parser.interface";

class unix implements parser{
    config: options | undefined;
    constructor(options?: options) {
        this.config = options
    }
    processHeader(line: string): void {
        throw new Error("Method not implemented.");
    }
    processBody(line: string): void {
        throw new Error("Method not implemented.");
    }
    processFooter(line: string): output {
        throw new Error("Method not implemented.");
    }
}

export default unix;