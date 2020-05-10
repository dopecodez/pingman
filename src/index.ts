import { extendedOptions, commandBuilder } from 'types'
import createBuilder from 'builder/builder'
import * as os from 'os'

const ping = async (IpAddress: string, pingOptions?: extendedOptions) => {
    const platform = os.platform();
    const builtCommand: commandBuilder = createBuilder(IpAddress, platform, pingOptions)
}

export default ping;