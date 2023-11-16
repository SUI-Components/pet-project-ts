import {expect} from 'chai'

import {formatDuration} from '../src' // eslint-disable-line

describe('Format Duration', () => {
  it('Should format the number', () => {
    expect(formatDuration(1001)).to.be.eql('1 second, 1 millisecond')
  })
})
