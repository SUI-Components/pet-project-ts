import {URLS} from '../../fixtures/urls.js'

describe('Home / ', function () {
  beforeEach(function () {
    cy.visit(URLS.HOME)
  })

  it('Should render Joan - Lion', function () {
    cy.get('h1').should('be.visible').contains('Joan - Lion')
  })
})
