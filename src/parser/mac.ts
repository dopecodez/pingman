import { options, output } from "../types";
import parser from "./parser.interface";

class mac implements parser {
    config: options | undefined;
    response: output;
    constructor(response: output, options?: options) {
        this.config = options
        this.response = response
    }

    processHeader(line: string): void {
        // Get host and numeric_host
        let tokens = line.split(' ');

        this.response.host = tokens[1];
        this.response.numericHost = tokens[2].slice(1, -2);
    }

    processBody(line: string): void {
        // XXX: Assume there is at least 3 '=' can be found
        let count = (line.match(/=/g) || []).length;
        if (count >= 3) {
            let regExp = /([0-9.]+)[ ]*ms/;
            let match = regExp.exec(line);
            match ? this.response.times.push(parseFloat(match[1])) : null;
        }
    }

    processFooter(line: string): output {
        let packetLoss = line.match(/ ([\d.]+)%/);
        if (packetLoss) {
            this.response.packetLoss = packetLoss[1];
        }

        // XXX: Assume number of keywords '/' more than 3
        const count = (line.match(/[/]/g) || []).length;
        if (count >= 3) {
            const regExp = /([0-9.]+)/g;
            // XXX: Assume min avg max stddev
            let m1 = regExp.exec(line);
            let m2 = regExp.exec(line);
            let m3 = regExp.exec(line);
            let m4 = regExp.exec(line);

            m1 ? this.response.min = parseFloat(m1[1]) : null;
            m2 ? this.response.avg = parseFloat(m2[1]) : null;
            m3 ? this.response.max = parseFloat(m3[1]) : null;
            m4 ? this.response.stddev = m4[1] : null;
        }
        return this.response;
    }
}

export default mac;