import { options, output } from "../types";
import parser from "./parser.interface";

class windows implements parser {
    config: options | undefined;
    response: output

    constructor(response: output, options?: options) {
        this.config = options
        this.response = response
    }

    processHeader(line: string): void {
        let isPingNumeric = line.indexOf('[') === -1;
        let ipv4Regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/

        // Get host and numeric_host
        let words = line.split(' ');

        if (isPingNumeric) {
            // For those missing [***], get the first token which match IPV4 regex
            this.response.host = words.find((word) => {
                return ipv4Regex.test(word);
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
        if (isIPV6) {
            this.processIPV6Body(dataFields);
        } else {
            this.processIPV4Body(dataFields);
        }
    }

    processFooter(line: string): output {
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

            m1? this.response.min = parseFloat(m1[1]):null;
            m2? this.response.max = parseFloat(m2[1]): null;
            m3? this.response.avg = parseFloat(m3[1]): null;
        }
        return this.response;
    }

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