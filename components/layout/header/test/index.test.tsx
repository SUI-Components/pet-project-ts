/* global setupEnvironment */

import ReactDOM from 'react-dom'

import chai, {expect} from 'chai'
import chaiDOM from 'chai-dom'

import Component from '../src/index.js'

chai.use(chaiDOM)

describe('LayoutHeader', () => {
  // @ts-expect-error
  const setup = setupEnvironment(Component)

  it('should render without crashing', () => {
    // Given
    const props = {
      name: 'name',
      lastname: 'lastname'
    }

    // When
    const component = <Component {...props} />

    // Then
    const div = document.createElement('div')
    ReactDOM.render(component, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should NOT render null', () => {
    // Given
    const props = {}

    // When
    const {container} = setup(props)

    // Then
    expect(container.innerHTML).to.be.a('string')
    expect(container.innerHTML).to.not.have.lengthOf(0)
  })

  it('should render component', () => {
    // Given
    const props = {
      name: 'Jon',
      lastname: 'Snow'
    }

    // When
    const {getByText} = setup(props)

    // Then
    expect(getByText('Jon - Snow')).to.be.visible
  })
})
