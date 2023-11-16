import {loadPage} from '@s-ui/react-initial-props'
import {IndexRoute, Route} from '@s-ui/react-router'

import contextFactory from './contextFactory'

const LoadHomePage = loadPage(contextFactory, async () => import(/* webpackChunkName: "HomePage" */ './pages/Home')) // eslint-disable-line 

const LoadDetailPage = loadPage(contextFactory, async () => import(/* webpackChunkName: "DetailPage" */ './pages/Detail')) // eslint-disable-line 

export default (
  <Route>
    <Route path="/">
      <IndexRoute getComponent={LoadHomePage} />
      <Route path=":name" getComponent={LoadDetailPage} />
    </Route>
  </Route>
)
