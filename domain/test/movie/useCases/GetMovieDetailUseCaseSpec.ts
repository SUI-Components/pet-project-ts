/* eslint no-undef:0 */
import {expect} from 'chai'

function be(bool: boolean) {
  return bool
}

describe('Get Movie Detail', () => {
  it('should be true', () => {
    expect(be(true)).to.be.true
  })
})
