import { options, commandBuilder} from 'types'
import createBuilder from 'builder/builder'
import * as os from 'os'

const ping = async (IpAddress: string, pingOptions?: options) => {
    let platform = os.platform();
    let command : commandBuilder = createBuilder(IpAddress, platform, pingOptions)
}

export default ping;