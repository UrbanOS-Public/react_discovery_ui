describe('The Dataset Details Page', function () {
  beforeEach(function () {
    cy.visit('/dataset/ogrip/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3')
  })

  it.only('Write SQL link works', function () {
    const query = 'SELECT * FROM ohio_geographically_referenced_information_program_ogrip__622746a5_4e2a_4a4c_ac18_74cb1fb05ab3\nLIMIT 20000'
    cy.server()
    // Todo: Figure why the route below isn't matching
    // cy.route({ method: 'GET', url: '/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3', response: 'fixture:dataset_details_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3' })
    cy.route({ method: 'GET', url: 'https://data.dev.internal.smartcolumbusos.com/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3', response: {} })
    cy.route('GET', '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/recommendations', [])
    cy.route('POST', '/api/v1/query', 'fixture:dataset_details_spec/query_response')
    cy.contains('Write SQL').click()
    cy.get('[data-testid=query]').should('be.visible')
    cy.get('[data-testid=query]').should('have.value', query)
    cy.get('[data-testid=numRecords]').contains('852 records returned')
    // Todo check header and body of record table
  })
})
