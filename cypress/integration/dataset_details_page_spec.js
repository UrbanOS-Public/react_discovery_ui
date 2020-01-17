import { Selectors, Routes as routes } from '../support/details_page.js'
import { URLs as urls } from '../support/urls.js'
import { getDefaultFormat } from '../../src/utils/file-type-utils.js'
const ogrip_dataset = require('../fixtures/details_page_spec/ogrip_dataset')

const { datasetDetailsTab, writeSqlTab, visualizeTab, organizationLogo, organizationTitle,
  organizationDescription, datasetTitle, keywords, showFullDatasetCheckbox, leafletContainer,
  datasetApiExample, activityNodesButton, queryInput, successMessage, numRecords, tableHeader, tableBody, reactTable,
  paginatorInput, totalPages, submitButton, savedVisualizationsIcon, savedVisualizationsPopover,
  loginButton, saveIcon, savePopover, queryPrompt, saveButton, saveIndicator, clearIcon, cancelButton } = Selectors

function validateLeftSection () {
  const ogripTitle = ogrip_dataset.organization.title
  const ogripDescription = ogrip_dataset.organization.description
  cy.url().should('match', urls.datasetDetailsPage.ogrip)
  cy.get(datasetDetailsTab).contains('Dataset Details')
  cy.get(writeSqlTab).contains('Write SQL')
  cy.get(visualizeTab).contains('Visualize')
  cy.get(organizationLogo).should('have.attr', 'src').should('include', 'ohio_geographically_referenced_information_program_ogrip.jpg')
  cy.get(organizationTitle).contains(ogripTitle)
  cy.get(organizationDescription).contains(ogripDescription)
  //Todo social media buttons
}

function validateRightSection () {
  const ogripDatasetTitle = ogrip_dataset.title
  const numberOfKeywords = ogrip_dataset.keywords.length
  //Todo do not hard code
  const apiHost = 'https://data.staging.internal.smartcolumbusos.com'
  const url = `${apiHost}/api/v1/organization/${ogrip_dataset.organization.name}/dataset/${ogrip_dataset.name}/query?limit=200&_format=${getDefaultFormat(ogrip_dataset)}`
  cy.get(datasetTitle).contains(ogripDatasetTitle)
  //Todo description
  cy.get(keywords).children('a.keyword').should('have.length', numberOfKeywords)
  cy.get(showFullDatasetCheckbox).not('have.class', 'selected')
  cy.get(leafletContainer)
  cy.get(datasetApiExample).contains(`GET: ${url}`)
  //Todo example bodies
  //Todo Data Dictionary
  //Todo Additional Information

}

describe('The Ogrip Dataset Details Tab', function () {
  beforeEach(function () {
    cy.server()
    cy.route(routes.ogripDataset)
    cy.route(routes.info)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].downloadFormatGeojson)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].previewFormatGeojson)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].recommendations)
    cy.visit('/dataset/ogrip/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3')
  })

  it('successfully loads', function () {
    validateLeftSection()
    validateRightSection()
  })

  it('Clicking a keyword takes you to datasets with that keyword', function () {
    cy.get(activityNodesButton).click()
    cy.url().should('match', urls.datasetDetailsPage.activityNodesDatasets)
  })

  it('Clicking Show Full Dataset shows full dataset', function() {
    //Todo: figure out why show full dataset checkbox is grayed out.
    cy.get(showFullDatasetCheckbox).click()
  })

})

describe('Write SQL Tab Ogrip dataset', function() {

  it('Clicking Write SQL takes you to query page', function () {
    cy.server()
    cy.route(routes.ogripDataset)
    cy.route(routes.info)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].downloadFormatGeojson)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].previewFormatGeojson)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].recommendations)
    cy.visit('/dataset/ogrip/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3')
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].query).as('getQueryResults')
    const query = 'SELECT * FROM ohio_geographically_referenced_information_program_ogrip__622746a5_4e2a_4a4c_ac18_74cb1fb05ab3\nLIMIT 20000'
    const numberOfRowsPerPage=10
    cy.get(writeSqlTab).click()
    cy.wait(['@getQueryResults'])
    cy.contains('Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.')
    cy.get(queryInput).should('be.visible')
    cy.get(queryInput).should('have.value', query)
    cy.get(numRecords).contains('852 records returned')
    cy.get(reactTable).should('be.visible')
    cy.get(tableHeader).children().should('have.length', 1)
    cy.get(tableHeader).children().eq(0).contains('feature')
    cy.get(tableBody).children().should('have.length', numberOfRowsPerPage)
    cy.get(paginatorInput).should('have.value', '1')
    cy.get(totalPages).contains('86')
  })

})

describe('Saving on Write SQL tab for System dataset', function() {

  beforeEach(function() {
    cy.server()
    cy.route(routes.sysDataset)
    cy.route(routes.info)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.previewFormatJson)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.recommendations)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query1).as('getQueryResults')
    cy.visit('/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002_ORG/Cesious_Black_OBWEG')
    cy.get(writeSqlTab).click()
    cy.wait(['@getQueryResults'])
  })

  it('Clicking Saved Visualizations icon shows you the login popup', function () {
    cy.get(savedVisualizationsIcon).click()
    cy.get(savedVisualizationsPopover).should('be.visible')
    cy.get(loginButton).contains('LOG IN')
  })
  
  it('Clicking save icon opens query popup', function () {
    cy.get(saveIcon).click()
    cy.get(savePopover).should('be.visible')
    cy.get(saveButton).should('be.disabled')
    cy.get(queryPrompt).type("My Query")
    cy.get(saveButton).not('be.disabled')
    cy.get(saveButton).click()
    cy.get(saveIndicator).should('be.visible')
    cy.get(saveIndicator).contains('Your visualization failed to save')
    cy.get(clearIcon).click()
    cy.get(saveIcon).click()
    cy.get(cancelButton).click()
    cy.get(saveIcon).click()
    cy.get(queryPrompt).clear()
    cy.get(saveButton).should('be.disabled')
  })
})

describe('Querying on Write SQL tab for System dataset', function () {

  it.only('Writing query in query input and hitting submit returns correct query result', function () {
    cy.server()
    cy.route(routes.sysDataset)
    cy.route(routes.info)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.previewFormatJson)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.recommendations)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query1).as('getQueryResults')
    cy.visit('/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002_ORG/Cesious_Black_OBWEG')
    cy.get(writeSqlTab).click()
    cy.wait(['@getQueryResults'])
    const query = 'SELECT is_alive, name, type FROM Rosa_Lucky__Cesious_Black_OBWEG\nLIMIT 20000'
    cy.get(queryInput).clear().type(query)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query2).as('getQueryResults')
    cy.get(submitButton).click()
    cy.wait(['@getQueryResults'])
    cy.get(successMessage).should('be.visible')
    cy.get(tableHeader).children().should('have.length', 3)
    cy.get(tableHeader).children().eq(0).contains('is_alive')
    cy.get(tableHeader).children().eq(1).contains('name')
    cy.get(tableHeader).children().eq(2).contains('type')
  })
})