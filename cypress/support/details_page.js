export const Selectors = {
  datasetDetailsTab: '[data-testid=dataset-details]',
  writeSqlTab: '[data-testid=dataset-write-sql]',
  visualizeTab: '[data-testid=visualize]',
  sqlHelp: '[href="https://en.wikipedia.org/wiki/SQL_syntax"]',
  plotlyHelp: '[href="https://plotly.com/chart-studio-help/tutorials/#basic"]',
  organizationLogo: '[data-testid=organization-logo]',
  organizationTitle: '[data-testid=organization-title]',
  organizationDescription: '[data-testid=organization-description]',
  datasetTitle: '[data-testid=dataset-title]',
  datasetDescription: '[data-testid=dataset-description] > div',
  keywords: '[data-testid=dataset-keywords]',
  showFullDatasetCheckbox: '[data-testid="checkbox-indicator-Show Full Dataset"]',
  leafletContainer: '[data-testid=preview-map] > .leaflet-container',
  datasetApiExample: '[data-testid="Simple query-api-example"]',
  activityNodesButton: '[href="/?facets%5Bkeywords%5D%5B%5D=Activity%20Nodes"]',
  curlExample0: '[data-testid=curl-example-0]',
  curlExample1: '[data-testid=curl-example-1]',
  curlExample2: '[data-testid=curl-example-2]',
  queryInput: '.npm__react-simple-code-editor__textarea',
  successMessage: '[data-testid=success-message]',
  errorMessage: '[data-testid=error-message]',
  numRecords: '#numRecords',
  reactTable: '#data-view-table > .ReactTable',
  tableHeader: '[data-testid=query-view] #data-view-table > .ReactTable > .rt-table > .rt-thead > .rt-tr',
  tableBody: '#data-view-table > .ReactTable > .rt-table > .rt-tbody',
  paginatorInput: '#data-view-table > .ReactTable input',
  pageNumber: '#react-tabs-15 > #data-view-table > .ReactTable > .pagination-bottom > .-pagination > .-center > .-pageInfo > .-pageJump > input',
  nextPageButton: '#react-tabs-15 > #data-view-table > .ReactTable > .pagination-bottom > .-pagination > .-next > .-btn',
  totalPages: '#data-view-table > .ReactTable .-totalPages',
  submitQueryButton: '[data-testid=submit-query-button]',
  cancelQueryButton: '[data-testid=cancel-query-button]',
  savedVisualizationsIcon: '[data-testid=visualization-list-menu-item]',
  savedVisualizationsPopover: '.MuiPaper-root',
  loginButton: '[data-testid=login-button]',
  saveIcon: '[data-testid=save-icon]',
  savePopover: '.MuiPaper-root',
  queryPrompt: '.title-input',
  saveButton: '[data-testid=save-button]',
  saveIndicator: 'save-indicator',
  clearIcon: '.clear-icon',
  cancelButton: '[data-testid=cancel-button]',
  plotlyEditor: '.plotly_editor',
  socialMediaTwitter: '[data-testid=social-media-twitter]',
  socialMediaFacebook: '[data-testid=social-media-facebook]',
  socialMediaLinkedin: '[data-testid=social-media-linkedin]',
  clipboard: '[data-testid=clipboard]',
  downloadButton: '[data-testid=call-to-action-button]'
}

export const Routes = {
  info: {
    method: 'GET',
    url: '/sockjs-node/*',
    response: {fixture: 'info.json'}
  },
  ogripDataset: {
    method: 'GET',
    url: '/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3',
    response: {fixture: 'details_page_spec/ogrip_dataset'}
  },
  '622746a5_4e2a_4a4c_ac18_74cb1fb05ab3': {
    downloadFormatGeojson: {
      method: 'GET',
      url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/download?_format=geojson',
      response: {fixture: 'details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/download_format_geojson.geojson'}
    },
    previewFormatGeojson: {
      method: 'GET',
      url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/preview?_format=geojson',
      response: {fixture: 'details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/preview_format_geojson.geojson'}
    },
    previewFormatJson: {
      method: 'GET',
      url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/preview?_format=json',
      response: {fixture: 'details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/preview_format_json.json'}
    },
    recommendations: {
      method: 'GET',
      url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/recommendations',
      response: []
    },
    query: {
      method: 'POST',
      url: '/api/v1/query',
      response: {fixture: 'details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/query_response.json'}
    }
  },
  sysDataset: {
    method: 'GET',
    url: '/api/v1/organization/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002_ORG/dataset/Cesious_Black_OBWEG',
    response: {fixture: 'details_page_spec/sysDataset'}
  },
  SYS_d3bf2154_1cda_11ea_a56a_0242ac110002: {
    previewFormatJson: {
      method: 'GET',
      url: '/api/v1/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/preview?_format=json',
      response: {fixture: 'details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/preview_format_json.json'}
    },
    recommendations: {
      method: 'GET',
      url: '/api/v1/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/recommendations',
      response: []
    },
    query1: {
      method: 'POST',
      url: '/api/v1/query',
      response: {fixture: 'details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/query_response.json'}
    },
    query2: {
      method: 'POST',
      url: '/api/v1/query',
      response: {fixture: 'details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/query_response2.json'}
    },
    query3: {
      method: 'POST',
      url: '/api/v1/query',
      response: {fixture: 'details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/query_response2.json'},
      delay: 1000
    }
  }
}
