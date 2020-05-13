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

test('ouput for windows IPV6 ping', async t => {
    let input = await processLineByLine(__dirname + '/samples/windowsIPV6.txt');
    let output = parserFactory("win32", input, {IPV6:true});
    t.deepEqual(output as any, response.windows_ipv6);
})

test('ouput for linux IPV4 ping', async t => {
    let input = await processLineByLine(__dirname + '/samples/linuxIPV4.txt');
    let output = parserFactory("linux", input);
    t.deepEqual(output as any, response.linux_ipv4);
})

test('ouput for linux IPV6 ping', async t => {
    let input = await processLineByLine(__dirname + '/samples/linuxIPV6.txt');
    let output = parserFactory("linux", input, {IPV6:true});
    t.deepEqual(output as any, response.linux_ipv6);
})

test('ouput for mac IPV4 ping', async t => {
    let input = await processLineByLine(__dirname + '/samples/macIPV4.txt');
    let output = parserFactory("darwin", input);
    t.deepEqual(output as any, response.macos_ipv4);
})

//TO-DO - Add a mac ipv6 test