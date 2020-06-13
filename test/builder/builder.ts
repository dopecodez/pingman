import test from 'ava'
import createBuilder from '../../src/builder/builder'

const sampleBuildCommands = {
    WIN_NO_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1']
    },
    WIN_GENERAL_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1', '-n', '6', '-l', '52', '-i', '2000', '-w', '2000']
    },
    WIN_GENERAL_ARGS_NO_PROTOCOL: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1', '-n', '6',]
    },
    WIN_IPV4_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1', '-4', '-f', '-r', '5', '-s', '5000']
    },
    WIN_IPV6_ARGS: {
        command: process.env.SystemRoot + '/system32/ping.exe',
        arguments: ['127.0.0.1', '-6', '-S', 'testAddress']
    },
    MAC_NO_ARGS: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '4']
    },
    MAC_GENERAL_ARGS: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '6', '-d', '-f', '-n', '-t', '10', '-W', '2000']
    },
    MAC_EXTENDED_ARGS: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '6', '-i', '100', '-I', 'testInterface', '-L', '-m', '3000']
    },
    MAC_EXTENDED_ARGS2: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '6', '-D', '-n', '-p', 'test', '-q', '-S', 'testAddr']
    },
    MAC_EXTENDED_ARGS3: {
        command: '/sbin/ping',
        arguments: ['127.0.0.1', '-c', '6', '-s', '52', '-v']
    },
    LINUX_NO_ARGS: {
        command: 'ping',
        arguments: ['127.0.0.1', '-c', '4']
    },
    LINUX_GENERAL_ARGS: {
        command: 'ping',
        arguments: ['127.0.0.1', '-c', '6',  '-d', '-f', '-n', '-W', '10', '-w', '2']
    },
    LINUX_EXTENDED_ARGS: {
        command: 'ping',
        arguments: ['127.0.0.1', '-c', '6', '-i', '100', '-I', 'testAddr', '-L', '-t', '1000']
    },
    LINUX_EXTENDED_ARGS2: {
        command: 'ping',
        arguments: ['127.0.0.1', '-c', '6', '-n', '-p', 'testPattern', '-q', '-s', '52', '-v']
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
    let command = createBuilder('127.0.0.1', 'win32', { numberOfEchos: 6, timeout: 2, TTL: 2000, bufferSize: 52 });
    t.deepEqual(command, sampleBuildCommands.WIN_GENERAL_ARGS);
})

test('Check if builder creates IPV4 command arguments corerectly for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32', { IPV4: true, doNotFragment: true, recordRouteHops: 5, hopTimestamp: 5000 });
    t.deepEqual(command, sampleBuildCommands.WIN_IPV4_ARGS);
})

test('Check if builder creates general command without explicit protocol metioned for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32', { numberOfEchos: 6, doNotFragment: true });
    t.deepEqual(command, sampleBuildCommands.WIN_GENERAL_ARGS_NO_PROTOCOL);
})

test('Check if builder creates IPV6 args for windows', t => {
    let command = createBuilder('127.0.0.1', 'win32', { IPV6: true, srcAddr: 'testAddress' });
    t.deepEqual(command, sampleBuildCommands.WIN_IPV6_ARGS);
})

test('Check if builder creates command arguments corerectly for mac', t => {
    let command = createBuilder('127.0.0.1', 'darwin');
    t.deepEqual(command, sampleBuildCommands.MAC_NO_ARGS);
})

test('Check if builder creates general command arguments corerectly for mac', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { numberOfEchos: 6, timeout: 2, numeric: true, timeBeforeExit: 10, soDebugOption: true, floodPing: true });
    t.deepEqual(command, sampleBuildCommands.MAC_GENERAL_ARGS);
})

test('Check if builder creates extended command arguments corerectly for mac 1', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { numberOfEchos: 6, interval: 100, interfaceAddress: 'testInterface', suppressLoopback: true, TTL: 3000 });
    t.deepEqual(command, sampleBuildCommands.MAC_EXTENDED_ARGS);
})

test('Check if builder creates extended command arguments corerectly for mac 2', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { numberOfEchos: 6, doNotFragment: true, numeric: true, pattern: 'test', quiet: true, srcAddr: 'testAddr' });
    t.deepEqual(command, sampleBuildCommands.MAC_EXTENDED_ARGS2);
})

test('Check if builder creates extended command arguments corerectly for mac 3', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { numberOfEchos: 6, bufferSize: 52, verboseOutput: true });
    t.deepEqual(command, sampleBuildCommands.MAC_EXTENDED_ARGS3);
})

test('Check if builder creates command arguments corerectly for linux', t => {
    let command = createBuilder('127.0.0.1', 'linux');
    t.deepEqual(command, sampleBuildCommands.LINUX_NO_ARGS);
})

test('Check if builder creates general command arguments corerectly for linux', t => {
    let command = createBuilder('127.0.0.1', 'linux', { numberOfEchos: 6, timeout: 2, numeric: true, timeBeforeExit: 10, soDebugOption: true, floodPing: true });
    t.deepEqual(command, sampleBuildCommands.LINUX_GENERAL_ARGS);
})

test('Check if builder creates extended command arguments corerectly for linux', t => {
    let command = createBuilder('127.0.0.1', 'linux', { numberOfEchos: 6, interval: 100, interfaceAddress: 'testAddr', suppressLoopback: true, TTL: 1000});
    t.deepEqual(command, sampleBuildCommands.LINUX_EXTENDED_ARGS);
})

test('Check if builder creates extended command arguments corerectly for linux 2', t => {
    let command = createBuilder('127.0.0.1', 'linux', { numberOfEchos: 6, numeric: true, pattern: 'testPattern', quiet: true, bufferSize: 52, verboseOutput: true });
    t.deepEqual(command, sampleBuildCommands.LINUX_EXTENDED_ARGS2);
})


test('Check if builder creates ping6 command for mac systems', t => {
    let command = createBuilder('127.0.0.1', 'darwin', { IPV6: true });
    t.deepEqual(command, sampleBuildCommands.MAC_IPV6_ARGS);
})

test('Check if builder creates ping6 command for linux systems', t => {
    let command = createBuilder('127.0.0.1', 'linux', { IPV6: true });
    t.deepEqual(command, sampleBuildCommands.LINUX_IPV6_ARGS);
})