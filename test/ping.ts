import test from 'ava'
import execute from '../src/ping'
import os from 'os'
import * as replies from './replies.json';

const platform = os.platform();
let command: { command: string; arguments: string[] };
if (platform == 'win32') {
    command = {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1']
    }
}

test('Spawn throws error on incorrect command', async t => {
    let errored = {
        command: 'asasas',
        arguments: []
    }
    return execute(errored).catch(error => {
        t.truthy(error)
    });
})

test.failing('Ping Executes correctly for platform', async t => {
    let result = await execute(command);
    if (platform === 'win32') {
        t.is(result, replies.windows_response_1);
    }
});