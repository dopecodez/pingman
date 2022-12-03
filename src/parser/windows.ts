import { extendedPingOptions, pingResponse } from "../types";
import parser from "./parser.interface";

class windows implements parser {
    config: extendedPingOptions | undefined;
    response: pingResponse

    constructor(response: pingResponse, options?: extendedPingOptions) {
        this.config = options
        this.response = response
        this.response.times = []
    }

    processHeader(line: string): void {
        let isPingNumeric = line.indexOf('[') === -1;
        const ipv4v6Regex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/

        // Get host and numeric_host
        let words = line.split(' ');

        if (isPingNumeric) {
            // For those missing [***], get the first token which match IPV4 regex
            this.response.host = words.find((word) => {
                return ipv4v6Regex.test(word);
            });
            this.response.numericHost = this.response.host;
        } else {
            // For those has [***], anchor with such token
            let numericHost = words.find(function (word) {
                return word.indexOf('[') !== -1;
            });
            if (numericHost) {
                let numericHostIndex = words.indexOf(numericHost);
                let match = /\[(.*)\]/.exec(numericHost);
                if (match) {
                    // Capture IP inside [] only. refs #71
                    this.response.numericHost = match[1];
                }
                this.response.host = words[numericHostIndex - 1];
            }
        }
    }

    processBody(line: string): void {
        let isIPV6 = this.config?.IPV6;
        let words = line.split(' ');
        let dataFields = words.filter((word) => {
            let isDataField = word.indexOf('=') >= 0 || word.indexOf('<') >= 0;
            return isDataField;
        });
        //if IPV6, body does not have as many fields as IPV4 based on testing
        if (isIPV6) {
            this.processIPV6Body(dataFields);
        } else {
            this.processIPV4Body(dataFields);
        }
    }

    processFooter(line: string): pingResponse {
        let packetLoss = line.match(/([\d.]+)%/);
        if (packetLoss) {
            this.response.packetLoss = packetLoss[1];
        }

        // XXX: Assume there is a keyword ms
        if (line.search(/(ms|мсек)/i) >= 0) {
            // XXX: Assume the ordering is Min Max Avg
            let regExp = /([0-9.]+)/g;
            let m1 = regExp.exec(line);
            let m2 = regExp.exec(line);
            let m3 = regExp.exec(line);

            m1 ? this.response.min = parseFloat(m1[1]) : null;
            m2 ? this.response.max = parseFloat(m2[1]) : null;
            m3 ? this.response.avg = parseFloat(m3[1]) : null;
        }
        return this.response;
    }

    //method to process IPV4 Specific Body
    processIPV4Body(dataFields: string[]): void {
        const expectDataFieldInReplyLine = 3;
        let isReplyLine = dataFields.length >= expectDataFieldInReplyLine;

        if (isReplyLine) {
            // XXX: Assume time will alaways get keyword ms for all language
            let timeField = dataFields.find((field) => {
                return field.search(/(ms|мс)/i) >= 0
            })
            if (timeField) {
                let regExp = /([0-9.]+)/;
                let match = regExp.exec(timeField);
                let timeFieldIndex = dataFields.indexOf(timeField);
                match ? this.response?.times?.push(parseFloat(match[1])) : null;

                // XXX: Assume byte field will be just before the time field
                let bytesField = dataFields[timeFieldIndex - 1]
                match = regExp.exec(bytesField)
                match ? this.response.bufferSize = parseFloat(match[1]) : null;
            }
        }
    }

    //method to process IPV6 Specific Body
    processIPV6Body(dataFields: string[]): void {
        let expectDataFieldInReplyLine = 1;
        if (dataFields.length >= expectDataFieldInReplyLine) {
            // XXX: Assume time will alaways get keyword ms for all language
            let timeField = dataFields.find((dataField) => {
                return dataField.search(/(ms|мс)/i) >= 0;
            });
            const regExp = /([0-9.]+)/;
            if (timeField) {
                let match = regExp.exec(timeField);
                match ? this.response?.times?.push(parseFloat(match[1])) : null;
            }
        }
    }
}

export default windows;