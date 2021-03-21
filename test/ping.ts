import test from 'ava'
import execute from '../src/ping'

test('Spawn throws spawnError if command is wrong', async t => {
    let errored = {
        command: 'asasas',
        arguments: ['uu']
    }
    await t.throwsAsync(async () => {
		await execute(errored);
	});
})