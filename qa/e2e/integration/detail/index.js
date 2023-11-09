import {URLS} from '../../fixtures/urls.js'

describe('detail /lucas ', function () {
  beforeEach(function () {
    cy.visit(URLS.HOME + 'lucas')
  })

  it('Should render Joan - Lion', function () {
    cy.get('h1').should('be.visible').contains('lucas')
  })
})
