import render from '@s-ui/widget-embedder/react/render'
import Widget from '@s-ui/widget-embedder/react/Widget'
import Widgets from '@s-ui/widget-embedder/react/Widgets'
import LayoutHeader from '@adv-ui/pet-layout-header'

import './index.scss'

const bootstrap = async () => {
  render(
    <Widgets>
      <Widget selector="body">
        <LayoutHeader name="Joan" lastname="Lion" dni={324324} />
        <h1>Home page test title</h1>
      </Widget>
    </Widgets>,
    'global'
  )
}

bootstrap()
