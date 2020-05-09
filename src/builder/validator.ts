import {IpError} from 'errors'
import {ERROR_MESSAGES} from 'constants'

export function validateIp(ip: string): boolean {
    if (!ip) {
        throw new IpError(ERROR_MESSAGES.IP_NOT_PROVIDED);
    }
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
        throw new IpError(ERROR_MESSAGES.IP_NOT_PROVIDED);
    }
    return true;
}