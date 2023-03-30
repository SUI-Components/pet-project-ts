import {loadPage} from '@s-ui/react-initial-props'
import {IndexRoute, Route} from '@s-ui/react-router'

import contextFactory from './contextFactory.ts'

const LoadHomePage = loadPage(
  contextFactory,
  async () =>
    // TODO: Fix this
    // eslint-disable-next-line import/extensions
    await import(/* webpackChunkName: "HomePage" */ './pages/Home/index')
)

export default (
  <Route>
    <Route path="/">
      <IndexRoute getComponent={LoadHomePage} />
    </Route>
  </Route>
)
