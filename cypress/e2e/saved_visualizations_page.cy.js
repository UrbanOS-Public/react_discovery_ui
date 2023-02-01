import { Selectors, Routes as routes } from '../support/visualization_page.js'

const { errorText } = Selectors

describe('Saved visualizations', function () {
  beforeEach(function () {
    cy.intercept(routes.info.url)
    cy.intercept(routes.user.url)
  })

  it('/user is not accessible to non-logged-in users', function () {
    cy.visit('/user')
    cy.get(errorText).contains('You must be signed in to see your saved visualizations')
  })
})
