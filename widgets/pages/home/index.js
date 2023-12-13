import render from '@s-ui/widget-embedder/react/render'
import Widget from '@s-ui/widget-embedder/react/Widget'
import Widgets from '@s-ui/widget-embedder/react/Widgets'

import './index.scss'

const bootstrap = async () => {
  render(
    <Widgets>
      <Widget selector="body">
        <h1>Hola!!!!</h1>
      </Widget>
    </Widgets>,
    'global'
  )
}

bootstrap()
