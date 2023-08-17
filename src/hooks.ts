import TYPES from '@s-ui/ssr/hooks-types'

export default {
  [TYPES.LOGGING]: (req, res, next) => {
    next()
  },

  [TYPES.PRE_HEALTH]: (req, res, next) => {
    next()
  }
}
