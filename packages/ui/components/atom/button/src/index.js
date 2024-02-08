import {useEffect} from 'react'

import domain from '@adv-ui/pet-domain'
//  import PropTypes from 'prop-types'

export default function AtomButton() {
  useEffect(() => {
    domain.get('get_movie_detail_use_case').execute({id: 1})
  }, [])

  return (
    <div className="@adv-ui-AtomButton">
      <h1>AtomButton</h1>
    </div>
  )
}

AtomButton.displayName = 'AtomButton'
AtomButton.propTypes = {}
