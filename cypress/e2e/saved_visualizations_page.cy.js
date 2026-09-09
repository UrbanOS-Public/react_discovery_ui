import { Selectors, Routes as routes } from '../support/visualization_page.js'

const { errorText } = Selectors

describe('Saved visualizations', function () {
  beforeEach(function () {
    cy.intercept(routes.info.method, routes.info.url, routes.info.response)
    cy.intercept(routes.user.method, routes.user.url, routes.user.response).as('getUserVisualizations')
  })

  it('/user is not accessible to non-logged-in users', function () {
    cy.visit('/user')
    cy.wait('@getUserVisualizations')
    cy.get(errorText).contains('You must be signed in to see your saved visualizations')
  })
})
