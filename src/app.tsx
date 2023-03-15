import ReactDOM from 'react-dom'

import {withContext} from '@s-ui/hoc'
import Context from '@s-ui/react-context'
import {match, Router} from '@s-ui/react-router'

import contextFactory from './contextFactory.ts'
import routes from './routes.tsx'

import './index.scss'

export default contextFactory().then(context => {
  match({routes}, (err: Error | null, _: any, renderProps) => {
    if (err != null) console.error(err) // eslint-disable-line no-console

    const App = withContext(context)(Router)

    ReactDOM.render(
      <Context.Provider value={context}>
        <App {...renderProps} />
      </Context.Provider>,
      document.getElementById('app')
    )
  })
})
