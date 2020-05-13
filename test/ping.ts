import test from 'ava'
import execute from '../src/ping'

test('Spawn throws error on incorrect command', async t => {
    let errored = {
        command: 'asasas',
        arguments: []
    }
    return execute(errored).catch(error => {
        t.truthy(error)
    });
})