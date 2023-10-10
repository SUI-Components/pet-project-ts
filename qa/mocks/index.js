import {rest, setupMocker} from '@s-ui/mock'

const getMocker = (handlers = []) => setupMocker(handlers)

export {getMocker, rest}
