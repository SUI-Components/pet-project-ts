import {extractCSSFromApp} from '@s-ui/critical-css'

// Page display names
const displayNames = {
  home: 'Home'
}

const {PORT = 3000, HOST = 'localhost'} = process.env

// Those urls targets PROD
extractCSSFromApp({
  config: {
    healthCheckPath: '/_health',
    hostname: `http://${HOST}:${PORT}`
  },
  routes: {
    [displayNames.home]: {url: '/'}
  }
})
