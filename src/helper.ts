import { ipError } from 'errors'
import { ERROR_MESSAGES } from 'messages'

export function validateIp(ip: string): void {
    if (!ip) {
        throw new ipError(ERROR_MESSAGES.IP_NOT_PROVIDED);
    }
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
        throw new ipError(ERROR_MESSAGES.IP_NOT_VALID);
    }
}

export function isPlatformSupported(platform: string): boolean {
    let supportedPlatform = platformsSupported.some((supportedPlatform) => {
        return platform === supportedPlatform
    });
    return supportedPlatform;
}

const platformsSupported = [
    'win32',
    'darwin',
    'linux'
]
