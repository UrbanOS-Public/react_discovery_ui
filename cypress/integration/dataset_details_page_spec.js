import { Selectors, Routes as routes } from '../support/details_page.js'
import { URLs as urls } from '../support/urls.js'
const ogrip_dataset = require('../fixtures/details_page_spec/ogrip_dataset')

const { datasetDetailsTab, writeSqlTab, visualizeTab, organizationLogo, organizationTitle,
  organizationDescription, datasetTitle, datasetDescription, keywords, showFullDatasetCheckbox, leafletContainer,
  datasetApiExample, activityNodesButton, curlExample0, curlExample1, curlExample2, queryInput,
  successMessage, errorMessage, numRecords, tableHeader, tableBody, reactTable, paginatorInput, totalPages,
  submitQueryButton, cancelQueryButton, savedVisualizationsIcon, savedVisualizationsPopover,
  loginButton, saveIcon, savePopover, queryPrompt, saveButton, saveIndicator, clearIcon, cancelButton,
  plotlyEditor, socialMediaTwitter, socialMediaFacebook, socialMediaLinkedin, clipboard, downloadButton } = Selectors

function validateSocialMedia() {
  cy.get(socialMediaTwitter)
  cy.get(socialMediaFacebook)
  cy.get(socialMediaLinkedin)
  cy.get(clipboard).contains('Copy Link')
  cy.get(clipboard).click()
  cy.get(clipboard).contains('Copied!')
}

function validateLeftSection() {
  validateTopLeft()
  validateSocialMedia()
}

function validateTopRight() {
  const ogripDatasetTitle = ogrip_dataset.title
  const ogripDatasetDescription = ogrip_dataset.description
  const numberOfKeywords = ogrip_dataset.keywords.length
  cy.get(datasetTitle).contains(ogripDatasetTitle)
  cy.get(downloadButton).contains("Download")
  cy.get(datasetDescription).contains(ogripDatasetDescription)
  cy.get(keywords).children('a.keyword').should('have.length', numberOfKeywords)
}

function validateLeaflet() {
  cy.get(showFullDatasetCheckbox).not('have.class', 'selected')
  cy.get(leafletContainer)
}

function validateCurlExamples() {
  const datasetApiValue = 'GET: http://localhost:4000/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/query?limit=200&_format=geojson'
  const get200RowsAllColumns = 'SELECT * FROM ohio_geographically_referenced_information_program_ogrip__622746a5_4e2a_4a4c_ac18_74cb1fb05ab3 LIMIT 200'
  const get200RowsFeatureColumns = 'SELECT feature FROM ohio_geographically_referenced_information_program_ogrip__622746a5_4e2a_4a4c_ac18_74cb1fb05ab3 WHERE feature IS NOT NULL LIMIT 200'
  const exampleIdColumnsMatch = 'SELECT t1.example_column, t2.joined_column FROM example_dataset_one t1 INNER JOIN example_dataset_two t2 ON t1.example_id = t2.example_id LIMIT 200'
  cy.get(datasetApiExample).contains(datasetApiValue)
  cy.get(curlExample0).contains(get200RowsAllColumns)
  cy.get(curlExample1).contains(get200RowsFeatureColumns)
  cy.get(curlExample2).contains(exampleIdColumnsMatch)
}

function validateTopLeft() {
  const ogripTitle = ogrip_dataset.organization.title
  const ogripDescription = ogrip_dataset.organization.description
  cy.get(organizationLogo).should('have.attr', 'src').should('include', 'ohio_geographically_referenced_information_program_ogrip.jpg')
  cy.get(organizationTitle).contains(ogripTitle)
  cy.get(organizationDescription).contains(ogripDescription)
}

function validateRightSection() {
  validateTopRight()
  validateLeaflet()
  validateCurlExamples()
}

function validateHeader() {
  cy.get(datasetDetailsTab).contains('Dataset Details')
  cy.get(writeSqlTab).contains('Write SQL')
  cy.get(visualizeTab).contains('Visualize')
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
    cy.url().should('match', urls.datasetDetailsPage.ogrip)
    validateHeader()
    validateLeftSection()
    validateRightSection()
  })

  it('Clicking a keyword takes you to datasets with that keyword', function () {
    cy.get(activityNodesButton).click()
    cy.url().should('match', urls.datasetDetailsPage.activityNodesDatasets)
  })

})

describe('Write SQL Tab for Ogrip dataset', function () {

  it('Clicking Write SQL takes you to query page', function () {
    cy.server()
    cy.route(routes.ogripDataset)
    cy.route(routes.info)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].downloadFormatGeojson)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].previewFormatGeojson)
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].recommendations)
    cy.visit('/dataset/ogrip/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3')
    cy.route(routes["622746a5_4e2a_4a4c_ac18_74cb1fb05ab3"].query).as('getQueryResults')
    const query = 'SELECT * FROM ohio_geographically_referenced_information_program_ogrip__622746a5_4e2a_4a4c_ac18_74cb1fb05ab3\nLIMIT 200'
    const numberOfRowsPerPage = 50
    cy.get(writeSqlTab).click()
    cy.wait(['@getQueryResults'])
    cy.contains('Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.')
    cy.get(queryInput).should('be.visible')
    cy.get(queryInput).should('have.value', query)
    cy.get(numRecords).contains('11 records returned')
    cy.get(reactTable).should('be.visible')
    cy.get(tableHeader).children().should('have.length', 1)
    cy.get(tableHeader).children().eq(0).contains('feature')
    cy.get(tableBody).children().should('have.length', numberOfRowsPerPage)
    cy.get(paginatorInput).should('have.value', '1')
    cy.get(totalPages).contains('1')
  })

})

describe('Write SQL Tab for System dataset', function () {

  beforeEach(function () {
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

  it('Writing query and hitting submit returns correct query result', function () {
    const query = 'SELECT is_alive, name, type FROM Rosa_Lucky__Cesious_Black_OBWEG\nLIMIT 200'
    cy.get(queryInput).clear().type(query)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query2).as('getQueryResults')
    cy.get(submitQueryButton).click()
    cy.wait(['@getQueryResults'])
    cy.get(successMessage).should('be.visible')
    cy.get(successMessage).contains('Query successful')
    cy.get(tableHeader).children().should('have.length', 3)
    cy.get(tableHeader).children().eq(0).contains('is_alive')
    cy.get(tableHeader).children().eq(1).contains('name')
    cy.get(tableHeader).children().eq(2).contains('type')
  })

  it('Submitting a new query resets the ReactTable to page 1', function () {
    const query = 'SELECT is_alive, name, type FROM Rosa_Lucky__Cesious_Black_OBWEG\nLIMIT 200'
    cy.get(queryInput).clear().type(query)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query2).as('getQueryResults')
    cy.get(submitQueryButton).click()
    cy.wait(['@getQueryResults'])
    cy.get('#react-tabs-15 > #data-view-table > .ReactTable > .pagination-bottom > .-pagination > .-center > .-pageInfo > .-pageJump > input').should('have.value', '1')
    cy.get('#react-tabs-15 > #data-view-table > .ReactTable > .pagination-bottom > .-pagination > .-next > .-btn').click()
    cy.get('#react-tabs-15 > #data-view-table > .ReactTable > .pagination-bottom > .-pagination > .-center > .-pageInfo > .-pageJump > input').should('have.value', '2')
    cy.get(submitQueryButton).click()
    cy.get('#react-tabs-15 > #data-view-table > .ReactTable > .pagination-bottom > .-pagination > .-center > .-pageInfo > .-pageJump > input').should('have.value', '1')
  })

  it('Writing query and hitting submit returns nothing if cancel is hit before response returns', function () {
    const query = 'SELECT is_alive, name, type FROM Rosa_Lucky__Cesious_Black_OBWEG\nLIMIT 200'
    cy.get(queryInput).clear().type(query)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query3).as('getQueryResults')
    cy.get(submitQueryButton).click()
    cy.get(cancelQueryButton).click()
    cy.get(errorMessage).should('be.visible')
    cy.get(errorMessage).contains('Your query has been stopped')
  })

  it('Clicking Saved Visualizations icon shows you the login popup', function () {
    cy.get(savedVisualizationsIcon).click()
    cy.get(savedVisualizationsPopover).should('be.visible')
    cy.get(loginButton).contains('Log in to your account')
  })

  it('Clicking save icon opens query popup', function () {
    cy.get(saveIcon).click()
    cy.get(savePopover).should('be.visible')
    cy.get(saveButton).should('be.disabled')
    cy.get(queryPrompt).type("My Query")
    cy.get(cancelButton).click()
    cy.get(saveIcon).click()
    cy.get(queryPrompt).clear()
    cy.get(saveButton).should('be.disabled')
  })
})

describe('Visualize Tab for System dataset', function () {
  beforeEach(function () {
    cy.server()
    cy.route(routes.sysDataset)
    cy.route(routes.info)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.previewFormatJson)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.recommendations)
    cy.route(routes.SYS_d3bf2154_1cda_11ea_a56a_0242ac110002.query1).as('getQueryResults')
    cy.visit('/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002_ORG/Cesious_Black_OBWEG')
  })

  it('loads successfully', function () {
    cy.get(visualizeTab).click()
    cy.get(plotlyEditor)
  })
})
