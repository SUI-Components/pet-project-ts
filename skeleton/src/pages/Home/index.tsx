import {useContext} from 'react'
import Context from '@s-ui/react-context'
import Helmet from 'react-helmet'
import LayoutHeader from '@adv-ui/sui-layout-header'

export default function HomePage(): JSX.Element {
  const {domain} = useContext(Context)

  console.log('domain', domain) // eslint-disable-line no-console
  console.log('domain config', domain.get('config')) // eslint-disable-line no-console

  return (
    <>
      <Helmet>
        <link rel="canonical" href="http://spa.mock/" />
      </Helmet>
      <LayoutHeader name="Jon" lastname="Snow" dni="3213342" />
      <h1>Home page test title</h1>
    </>
  )
}
