import {commandBuilder} from '../types'

const unix = () : commandBuilder => {
   return {
    command:'ping',
    arguments: ['sdasad']
   }
};

export default unix;