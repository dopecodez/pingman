import { options } from 'types'
import {validateIp} from 'builder/validator'

const ping = async (IpAddress: string, pingOptions?: options) => {
    let isIpValid = validateIp(IpAddress);
    return isIpValid;
}

export default ping;