import test from 'ava'
import parserFactory from '../../src/parser/parserFactory'
const fs = require('fs');
const readline = require('readline');
import * as response from './replies.json'

//function to read file line by line to mock actual response
async function processLineByLine(path: string): Promise<string[]> {
    let text: string[] = [];
    const fileStream = fs.createReadStream(path);

    //reading file line by line
    const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        console: false
    });
    for await (const line of rl) {
        // Each line in file will be successively available here as `line`.
        text.push(line + '\n');
    }
    return text;
}

test('ouput for windows IPV4 ping', async t => {
    let input = await processLineByLine(__dirname + '/samples/windowsIPV4.txt');
    let output = parserFactory("win32", input);
    t.deepEqual(output as any, response.windows_ipv4);
})