import { Selectors, Routes } from '../support/search_page.js'
const { sortSelectBox, datasetsFoundCount, paginator, dialogContent, search, datasets, firstDataset, 
  apiAccessibleCheckbox, organizations, cogoCheckBox, keywords, bicycleCheckBox} = Selectors
const {
  routes
} = Routes

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
  cy.url().should('contain', 'organization%5D%5B%5D=COGO&')
  cy.get(organizations).children('.checkbox').should('have.length', 1)
  cy.get(keywords).children('.checkbox').should('have.length', 6)
}

function isBicyclePage () {
  cy.url().should('contain', 'keywords%5D%5B%5D=bicycle')
  cy.get(organizations).children('.checkbox').should('have.length', 1)
  cy.get(keywords).children('.checkbox').should('have.length', 6)
}

function isFacetList () {
  cy.get(dialogContent).find('.section-header').contains('keywords')
  cy.get(dialogContent).find('.section').children('.checkbox').should('have.length', 46)
}

describe('Search interactions on the page', function () {
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

describe('Facet interaction on the page', function() {
  beforeEach(function () {
    cy.server()
    cy.route(routes.allDatasetsNameAsc)
    cy.route(routes.info)
    cy.visit('/')
    cy.route(routes.cogoDatasets)
    cy.route(routes.bicycleDatasets)
  })

  it('Organization facet works', function () {
    cy.get(cogoCheckBox).click()
    isCoGoPage()
    cy.get(cogoCheckBox).click()
    isDefaultPage()
  })

  it('keywords facet works', function () {
    cy.get(bicycleCheckBox).click()
    isBicyclePage()
    cy.get(bicycleCheckBox).click()
    isDefaultPage()
  })

  it('Show more link works', function () {
    cy.get(keywords).contains('Show more').click()
    isFacetList()
  })

})

describe('Deep linking', function () {
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