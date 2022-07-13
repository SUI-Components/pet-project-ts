import ReactDOM from 'react-dom'
import Context from '@s-ui/react-context'
import {Router, match} from '@s-ui/react-router'
import {withContext} from '@s-ui/hoc'

import contextFactory from './contextFactory'
import routes from './routes'

import './index.scss'

export default contextFactory().then(context => {
  match({routes}, (err, _, renderProps) => {
    if (err) console.error(err) // eslint-disable-line no-console

    const App = withContext(context)(Router)

    ReactDOM.render(
      <Context.Provider value={context}>
        <App {...renderProps} />
      </Context.Provider>,
      document.getElementById('app')
    )
  })
})
