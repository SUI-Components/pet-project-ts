import {Route, IndexRoute} from '@s-ui/react-router'
import {loadPage} from '@s-ui/react-initial-props'
import contextFactory from './contextFactory'

const LoadHomePage = loadPage(
  contextFactory,
  async () =>
    await import(/* webpackChunkName: "HomePage" */ './pages/Home/index')
)

export default (
  <Route>
    <Route path="/">
      <IndexRoute getComponent={LoadHomePage} />
    </Route>
    -
  </Route>
)
