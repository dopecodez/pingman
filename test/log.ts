import test from 'ava'
import logger from '../src/log'
import {existsSync} from 'fs'

test('Check if log file is created without logging enabled', t => {
    const log = new logger('log.txt', false);
    t.deepEqual(log.logFile, {})
    t.is(log.enabledLogging, false)
})

test('Check if log file is created and can be written to', async t => {
    new logger('log.txt', true);
    // const testData = 'Test'
    // await log.writeToLogFile(testData);
    let exists = existsSync('log.txt');
    t.is(exists, true);
});
