import {useEffect} from 'react'

import {Domain} from '@adv-ui/pet-domain'
//  import PropTypes from 'prop-types'

const domain = Domain.create()

export default function AtomButton() {
  useEffect(() => {
    domain.GetMovieDetailUseCase.execute({id: 1})
  }, [])

  return (
    <div className="@adv-ui-AtomButton">
      <h1>AtomButton</h1>
    </div>
  )
}

AtomButton.displayName = 'AtomButton'
AtomButton.propTypes = {}
