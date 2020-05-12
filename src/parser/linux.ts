import mac from "./mac";
import { pingResponse, extendedPingOptions } from "../types";

class linux extends mac {
    constructor(response: pingResponse, options?: extendedPingOptions) {
        super(response, options);
    }

    processHeader(line: string): void {
        // Get host and numeric_host
        let tokens = line.split(' ');
        let isProbablyIPv4 = tokens[1].indexOf('(') === -1;

        if (isProbablyIPv4) {
            this.response.host = tokens[1];
            this.response.numericHost = tokens[2].slice(1, -1);
        } else {
            // Normalise into either a 2 or 3 element array
            let foundAddresses = tokens.slice(1, -3).join('').match(/([^\s()]+)/g);
            if(foundAddresses){
                this.response.host = foundAddresses.shift();
                this.response.numericHost = foundAddresses.pop();
            }
        }
    }
}

export default linux;