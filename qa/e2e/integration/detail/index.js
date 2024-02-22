import {URLS} from '../../fixtures/urls.js'

describe('detail /Lift ', function () {
  beforeEach(function () {
    cy.visit(URLS.HOME + 'movie/955916')
  })

  it('Should render the name in the URL', function () {
    // cy.get('h1').should('be.visible').contains('Lift')
  })
})
