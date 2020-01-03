describe('The Search Page', function () {
  beforeEach(function () {
    cy.server()
    cy.route('GET', '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=&apiAccessible=true', 'fixture:search_page_spec/initial_search_response')
    cy.route('GET', '/sockjs-node/*', 'fixture:search_page_spec/info.json')
    cy.visit('/')
  })

  it('successfully loads', function () {
    cy.get('[data-testid=result-count]').contains('19 datasets found')
    // Todo: use better selector
    cy.get('[data-testid=dataset-list]').find('data-card').should('have.length', 10)
    // Todo: use better selector
    cy.get('[data-testid=paginator]').find('button.page-number').should('have.length', 2)
    // Todo: use better selector
    cy.get('[name="select-order by"]').should('have.value', 'name_asc')
    // Todo: use better selector
    cy.get('.checkbox-indicator').should('have.class', 'selected')
    cy.contains('100 Year Flood Plain -- GeoJSON')   
  })

  it('search works', function () {
    //cy.route('GET', '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=COTA&apiAccessible=true', 'fixture:search_page_spec/cota_search_response')
    cy.get('[data-testid=search]').type('COTA{enter}')
    cy.get('[data-testid=result-count]').contains('1 datasets found for "COTA"')
  })
})
