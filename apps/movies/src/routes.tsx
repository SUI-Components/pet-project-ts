import {loadPage} from '@s-ui/react-initial-props'
import {IndexRoute, Route} from '@s-ui/react-router'

import contextFactory from './contextFactory'

const LoadHomePage = loadPage(contextFactory, async () => import(/* webpackChunkName: "HomePage" */ './pages/Home')) // eslint-disable-line 

export default (
  <Route>
    <Route path="/">
      <IndexRoute getComponent={LoadHomePage} />
    </Route>
  </Route>
)
