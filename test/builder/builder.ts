import test from 'ava'
import createBuilder from '../../src/builder/builder'

const sampleBuildCommands = {
    WIN_NO_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1']
    },
    WIN_GENERAL_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1', '-n', '6', '-w', '2000']
    },
    WIN_IPV4_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1', '-n', '6', '-w', '2000', '-4', '-f']
    },
    MAC_NO_ARGS: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '4']
    },
    MAC_GENERAL_ARGS: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '6', '-n', '-t', '10', '-W', '2000']
    },
    LINUX_NO_ARGS: {
        command: 'ping',
        arguments: ['127.0.0.1', '-c', '4']
    },
    LINUX_GENERAL_ARGS: {
        command: 'ping',
        arguments: ['127.0.0.1', '-c', '6', '-n', '-W', '10', '-w', '2']
    },
    MAC_IPV6_ARGS: {
        command: '/sbin/ping6',
        arguments: ['127.0.0.1', '-c', '4']
    },
    LINUX_IPV6_ARGS: {
        command: 'ping6',
        arguments: ['127.0.0.1', '-c', '4']
    }
}

test('Check if builder creates command arguments corerectly for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32');
    t.deepEqual(command, sampleBuildCommands.WIN_NO_ARGS);
})

test('Check if builder creates general command arguments corerectly for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32', { numberOfEchos: 6, timeout: 2 });
    t.deepEqual(command, sampleBuildCommands.WIN_GENERAL_ARGS);
})

test('Check if builder creates IPV4 command arguments corerectly for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32', { numberOfEchos: 6, timeout: 2, IPV4: true, doNotFragment: true });
    t.deepEqual(command, sampleBuildCommands.WIN_IPV4_ARGS);
})

test('Check if builder creates general command without explicit protocol metioned for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32', { numberOfEchos: 6, timeout: 2, doNotFragment: true });
    t.deepEqual(command, sampleBuildCommands.WIN_GENERAL_ARGS);
})

test('Check if builder creates command arguments corerectly for mac', t => {
    let command = createBuilder('127.0.0.1', 'darwin');
    t.deepEqual(command, sampleBuildCommands.MAC_NO_ARGS);
})

test('Check if builder creates general command arguments corerectly for mac', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { numberOfEchos: 6, timeout: 2, numeric: true, timeBeforeExit: 10 });
    t.deepEqual(command, sampleBuildCommands.MAC_GENERAL_ARGS);
})

test('Check if builder creates command arguments corerectly for linux', t => {
    let command = createBuilder('127.0.0.1', 'linux');
    t.deepEqual(command, sampleBuildCommands.LINUX_NO_ARGS);
})

test('Check if builder creates general command arguments corerectly for linux', t => {
    let command = createBuilder('127.0.0.1', 'linux', { numberOfEchos: 6, timeout: 2, numeric: true, timeBeforeExit: 10 });
    t.deepEqual(command, sampleBuildCommands.LINUX_GENERAL_ARGS);
})

test('Check if builder creates ping6 command for mac systems', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { IPV6: true });
    t.deepEqual(command, sampleBuildCommands.MAC_IPV6_ARGS);
})

test('Check if builder creates ping6 command for linux systems', t => {
    let command = createBuilder('127.0.0.1', 'linux', { IPV6: true });
    t.deepEqual(command, sampleBuildCommands.LINUX_IPV6_ARGS);
})