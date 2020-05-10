import { validateIp } from 'validator'
import { supportedError } from 'errors'
import windows from 'windows'
import unix from 'unix'
import { commandBuilder, options } from '../types'
import { ERROR_MESSAGES } from '../messages'

function createBuilder(ip: string, platform: string, options?: options): commandBuilder {
    let builder: commandBuilder;
    validateIp(ip);
    if (isPlatformSupported(platform)) {
        throw new supportedError(ERROR_MESSAGES.PLATFORM_NOT_SUPPORTED.replace('platform', platform));
    }
    if (platform === platformsSupported[0]) {
        builder = windows(ip, options);
    } else {
        builder = unix();
    }
    return builder;
}

function isPlatformSupported(platform: string): boolean {
    let supportedPlatform = platformsSupported.some((supportedPlatform) => {
        return platform === supportedPlatform
    });
    return supportedPlatform;
}

const platformsSupported = [
    'win32',
    'darwin',
    'linux',
    'freebsd',
    'aix'
]

export default createBuilder;

