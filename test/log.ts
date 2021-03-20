import test from 'ava'
import logger from '../src/log'
// const fs = require('fs');

test('Check if log file is created without logging enabled', async t => {
    const log = new logger('log.txt', false);
    const testData = 'Test';
    await log.writeToLogFile(testData);
    t.deepEqual(log.logFile, {})
    t.is(log.enabledLogging, false)
})

test('Check if log file is created and can be written to', async t => {
    const log = new logger('log.txt', true);
    const testData = 'Test';
    await log.writeToLogFile(testData);
    t.is(log.enabledLogging, true);
});
