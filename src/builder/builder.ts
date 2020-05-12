import { validateIp, isPlatformSupported } from '../helper'
import { supportedError } from '../errors'
import windows from './windows'
import linux from './linux'
import mac from './mac'
import { commandBuilder, extendedPingOptions } from '../types'
import { ERROR_MESSAGES } from '../messages'

function createBuilder(ip: string, platform: string, options?: extendedPingOptions): commandBuilder {
    let builder: commandBuilder;
    validateIp(ip);
    if (isPlatformSupported(platform)) {
        throw new supportedError(ERROR_MESSAGES.PLATFORM_NOT_SUPPORTED.replace('platform', platform));
    }
    if (platform === 'win32') {
        builder = windows(ip, options);
    } else if (platform === 'darwin') {
        builder = mac(ip, options);
    } else {
        builder = linux(ip, options);
    }
    return builder;
}

export default createBuilder;

