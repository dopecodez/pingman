import test from 'ava';
import { isPlatformSupported, validateIp } from '../src/helper'

test('check if validateIP throws error on empty IP', t => {
	t.throws(() => {
		validateIp('')
	});
});

test('check if validateIP throws error on invalid IP string', t => {
	t.throws(() => {
		validateIp('asdasdasdasd')
	});
});

test('check if validateIp works on valid IPV4', t => {
	let response = validateIp('127.0.0.1')
	t.is(response, true);
});

test('check if validateIp works on valid IPV6', t => {
	let response = validateIp('fe80::2940:90ec:a964:4b42%7')
	t.is(response, true);
});

test('check for validateIp website name', t => {
	let response = validateIp('www.github.com')
	t.is(response, true);
});

test('check if invalid platform throws error', t => {
	let response = isPlatformSupported('Unsupported')
	t.is(response, false);
});

test('check if valid platform returns true', t => {
	let response = isPlatformSupported('win32')
	t.is(response, true);
});