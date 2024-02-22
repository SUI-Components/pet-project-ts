import {URLS} from '../../fixtures/urls.js'

describe('Home / ', function () {
  beforeEach(function () {
    cy.visit(URLS.HOME)
  })

  it('Should render Popular movies', function () {
    cy.get('h1').contains('Popular movies')
  })
})
