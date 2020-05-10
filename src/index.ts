import { options, commandBuilder } from 'types'
import createBuilder from 'builder/builder'
import * as os from 'os'

const ping = async (IpAddress: string, pingOptions?: options) => {
    const platform = os.platform();
    const builtCommand: commandBuilder = createBuilder(IpAddress, platform, pingOptions)
}

export default ping;