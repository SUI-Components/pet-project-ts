import * as ReactDOM from 'react-dom'

import {withContext} from '@s-ui/hoc'
import Context from '@s-ui/react-context'
import {HeadProvider} from '@s-ui/react-head'
import {match, Router} from '@s-ui/react-router'

import contextFactory from './contextFactory.ts'
import routes from './routes.tsx'

import './index.scss'

export default contextFactory().then(context => {
  match({routes}, async (err: Error | null, _: any, renderProps) => {
    if (err != null) console.error(err) // eslint-disable-line no-console

    const App = withContext(context)(Router)

    if (process.env.MOCK_API_REQUESTS === 'true') {
      const mocker = await import('@adv-ui/pet-mocks').then(pkg =>
        pkg.getMocker()
      )
      mocker.start({onUnhandledRequest: 'bypass'})
    }

    ReactDOM.render(
      <Context.Provider value={context}>
        <HeadProvider>
          <App {...renderProps} />
        </HeadProvider>
      </Context.Provider>,
      document.getElementById('app')
    )
  })
})
