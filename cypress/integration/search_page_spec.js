const apiAccessibleCheckbox = '[data-testid=left-section] > :nth-child(2) > .checkbox-indicator'
const organizations = '[data-testid=facet-sidebar] > :nth-child(1)'
const keywords = '[data-testid=facet-sidebar] > :nth-child(2)'
const bicycleLink = '[data-testid=facet-sidebar] > :nth-child(2) > :nth-child(2)'
const cogoLink = '[data-testid=facet-sidebar] > :nth-child(1) > :nth-child(2)'
const sortSelectBox = '[data-testid=sort-select]'
const datasetsFoundCount = '[data-testid=result-count]'
const datasets = '[data-testid=dataset-list]'
const paginator = '[data-testid=paginator]'
const firstDataset = '[data-testid=dataset-list] > :nth-child(1)'
const dialogContent = '[data-testid=dialog-content]'
const showMoreLink = '[data-testid=show-more-link]'
const search = '[data-testid=search]'

const routes = {
  allDatasetsLastModified: {
    method: 'GET', 
    url: 'https://data.dev.internal.smartcolumbusos.com/api/v1/dataset/search?offset=0&limit=10&sort=last_mod&query=&apiAccessible=true',
    response: 'fixture:search_page_spec/all_datasets_last_modified'
  },
  allDatasetsNameAsc: { 
    method: 'GET', 
    url: '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=&apiAccessible=true', 
    response: 'fixture:search_page_spec/all_datasets_name_asc'
  },
  allDatasetsNameDesc: {
    method: 'GET', 
    url: '/api/v1/dataset/search?offset=0&limit=10&sort=name_desc&query=&apiAccessible=true',
    response: 'fixture:search_page_spec/all_datasets_name_desc'
  },
  allDatasetsPage2: {
    method: 'GET',
    url: '/api/v1/dataset/search?offset=10&limit=10&sort=name_asc&query=&apiAccessible=true',
    response: 'fixture:search_page_spec/all_datasets_page_2'
  },
  apiAccessibleFalseDatasets: {
    method: 'GET',
    url: '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=&apiAccessible=false',
    response: 'fixture:search_page_spec/apiAccessible_false_datasets'
  },
  bicycleDatasets: {
    method: 'GET',
    url: '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=&facets[keywords][]=bicycle&apiAccessible=true',
    response: 'fixture:search_page_spec/bicycle_datasets'
  },
  cogoDatasets: {
    method: 'GET',
    url: '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=&facets[organization][]=COGO&apiAccessible=true',
    response: 'fixture:search_page_spec/cogo_datasets'
  },
  cotaDatasets: {
    method: 'GET',
    url: '/api/v1/dataset/search?offset=0&limit=10&sort=name_asc&query=COTA&apiAccessible=true',
    response: 'fixture:search_page_spec/cota_datasets'
  },
  info: {
    method: 'GET',
    url: '/sockjs-node/*',
    response: 'fixture:search_page_spec/info.json'
  },
  ogripDataset: {
    method: 'GET',
    url: '/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3',
    response: 'fixture:search_page_spec/ogrip_dataset'
  }
}

function isDefaultPage () {
  cy.get(organizations).children('.checkbox').should('have.length', 8)
  cy.get(keywords).children('.checkbox').should('have.length', 10)
  cy.get(datasetsFoundCount).contains('19 datasets found')
  cy.get(datasets).find('data-card').should('have.length', 10)
  cy.get(paginator).find('button.page-number').should('have.length', 2)
  cy.get(sortSelectBox).should('have.value', 'name_asc')
  cy.get(apiAccessibleCheckbox).should('have.class', 'selected')
  cy.get(firstDataset).contains('100 Year Flood Plain -- GeoJSON')
}

function isCoGoPage () {
  cy.url().should('contain', '?facets%5Borganization%5D%5B%5D=COGO&page=1')
  cy.get(organizations).children('.checkbox').should('have.length', 1)
  cy.get(keywords).children('.checkbox').should('have.length', 6)
}

function isBicyclePage () {
  cy.url().should('contain', '/?page=1&facets%5Bkeywords%5D%5B%5D=bicycle')
  cy.get(organizations).children('.checkbox').should('have.length', 1)
  cy.get(keywords).children('.checkbox').should('have.length', 6)
}

function isFacetList () {
  cy.get(dialogContent).find('.section-header').contains('keywords')
  cy.get(dialogContent).find('.section').children('.checkbox').should('have.length', 46)
}

describe('Test functionality on default page', function () {
  beforeEach(function () {
    cy.server()
    cy.route(routes.allDatasetsNameAsc)
    cy.route(routes.info)
    cy.visit('/')
  })

  it('successfully loads', function () {
    isDefaultPage()
  })

  it('search works', function () {
    cy.route(routes.cotaDatasets)
    cy.get(search).type('COTA{enter}')
    cy.get(datasetsFoundCount).contains('1 datasets found for "COTA"')
    cy.contains('COTA Real Time Bus Locations')
  })

  it('sort works', function () {
    cy.route(routes.allDatasetsNameDesc).as('getDatasetsInDescendingOrderByName')
    cy.route(routes.allDatasetsLastModified).as('getDatasetsByLastModifiedDate')
    cy.get(sortSelectBox).select('name_desc')
    cy.wait(['@getDatasetsInDescendingOrderByName'])
    cy.get(sortSelectBox).should('have.value', 'name_desc')
    cy.get(firstDataset).contains('Sample XML Dataset - DEV')
    cy.get(sortSelectBox).select('last_mod')
    cy.wait(['@getDatasetsByLastModifiedDate'])
    cy.get(sortSelectBox).should('have.value', 'last_mod')
    cy.get(firstDataset).contains('COTA Real Time Bus Locations')
  })

  it('facet list works', function () {
    cy.route(routes.cogoDatasets)
    cy.route(routes.bicycleDatasets)
    cy.get(cogoLink).click()
    isCoGoPage()
    cy.get(cogoLink).click()
    isDefaultPage()
    cy.get(bicycleLink).click()
    isBicyclePage()
    cy.get(bicycleLink).click()
    isDefaultPage()
    cy.get(showMoreLink).click()
    isFacetList()
  })

  it('API Accessible works', function() {
    cy.route(routes.apiAccessibleFalseDatasets)
    cy.get(apiAccessibleCheckbox).click()
    cy.get(apiAccessibleCheckbox).not('have.class', 'selected')
    cy.url().should('contain', '?apiAccessible=false&page=1')
  })

  it('Dataset links work', function() {
    cy.route(routes.ogripDataset)
    cy.get(firstDataset).find('.details > .title').click()
    cy.url().should('contain', '/dataset/ogrip/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3')
  })
})

describe('Test deep linking', function () {
  beforeEach(function () {
    cy.server()
    cy.route(routes.info)
  })

  it('sort desc works', function () {
    cy.route(routes.allDatasetsNameDesc)
    cy.route(routes.allDatasetsNameAsc)
    cy.visit('/?sort=name_desc')
    cy.get(sortSelectBox).should('have.value', 'name_desc')
    cy.visit('/?sort=name_asc')
    cy.get(sortSelectBox).should('have.value', 'name_asc')
  })

  it('api accessible works', function () {
    cy.route(routes.apiAccessibleFalseDatasets)
    cy.route(routes.allDatasetsNameAsc)
    cy.visit('/?apiAccessible=false')
    cy.get(apiAccessibleCheckbox).not('have.class', 'selected')
    cy.visit('/?apiAccessible=true')
    cy.get(apiAccessibleCheckbox).should('have.class', 'selected')
  })

  it('page=2 works', function () {
    cy.route(routes.allDatasetsPage2)
    cy.visit('/?page=2')
    cy.get(firstDataset).contains('CoGo GBFS Station Status test no jpath')
  })

  it('organization=COGO works', function () {
    cy.route(routes.cogoDatasets)
    cy.visit('/?page=1&apiAccessible=true&facets%5Borganization%5D%5B%5D=COGO')
    cy.get(firstDataset).contains('CoGo GBFS Station Information')
  })
})