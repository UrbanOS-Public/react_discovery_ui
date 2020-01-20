export const Selectors = {
    datasetDetailsTab: '[data-testid=dataset-details]',
    writeSqlTab: '[data-testid=dataset-write-sql]',
    visualizeTab: '[data-testid=visualize]',
    organizationLogo: '[data-testid=organization-logo]',
    organizationTitle: '[data-testid=organization-title]',
    organizationDescription: '[data-testid=organization-description]',
    datasetTitle: '[data-testid=dataset-title]',
    datasetDescription: '[data-testid=dataset-description] > div',
    keywords: '[data-testid=dataset-keywords]',
    showFullDatasetCheckbox: '[data-testid="checkbox-indicator-Show Full Dataset"]',
    leafletContainer: '[data-testid=preview-map] > .leaflet-container',
    datasetApiExample: '[data-testid="622746a5_4e2a_4a4c_ac18_74cb1fb05ab3-api-example"]',
    activityNodesButton: '[href="/?facets%5Bkeywords%5D%5B%5D=Activity%20Nodes"]',
    curlExample0: '[data-testid=curl-example-0]',
    curlExample1: '[data-testid=curl-example-1]',
    curlExample2: '[data-testid=curl-example-2]',
    queryInput: '[data-testid=query-input]',
    successMessage: '[data-testid=success-message]',
    errorMessage: '[data-testid=error-message]',
    numRecords: '[data-testid=numRecords]',
    reactTable: '[data-testid=dataset-preview-table] > .ReactTable',
    tableHeader: '[data-testid=dataset-preview-table] > .ReactTable > .rt-table > .rt-thead > .rt-tr',
    tableBody: '[data-testid=dataset-preview-table] > .ReactTable > .rt-table > .rt-tbody',
    paginatorInput: '[data-testid=dataset-preview-table] > .ReactTable input',
    totalPages: '[data-testid=dataset-preview-table] > .ReactTable .-totalPages',
    submitQueryButton: '[data-testid=submit-query-button]',
    cancelQueryButton: '[data-testid=cancel-query-button]',
    savedVisualizationsIcon: '[data-testid=user-page-button-popover]',
    savedVisualizationsPopover: '.MuiPaper-root',
    loginButton: '[data-testid=login-button]',
    saveIcon: '[data-testid=save-icon]',
    savePopover: '.MuiPaper-root',
    queryPrompt: '.prompt',
    saveButton: '[data-testid=save-button]',
    saveIndicator: 'save-indicator',
    clearIcon: '.clear-icon',
    cancelButton: '[data-testid=cancel-button]',
    plotlyEditor: '.plotly_editor',
    socialMediaTwitter: '[data-testid=social-media-twitter]',
    socialMediaFacebook: '[data-testid=social-media-facebook]',
    socialMediaLinkedin: '[data-testid=social-media-linkedin]',
    clipboard: '[data-testid=clipboard]',
    downloadButton: '[data-testid=download-button]'
}

export const Routes = {
    info: {
        method: 'GET',
        url: '/sockjs-node/*',
        response: 'fixture:info.json'
    },
    ogripDataset: {
        method: 'GET',
        url: '/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3',
        response: 'fixture:details_page_spec/ogrip_dataset'
    },
    "622746a5_4e2a_4a4c_ac18_74cb1fb05ab3": {
        downloadFormatGeojson: {
            method: 'GET',
            url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/download?_format=geojson',
            response: 'fixture:details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/download_format_geojson.geojson'
        },
        previewFormatGeojson: {
            method: 'GET',
            url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/preview?_format=geojson',
            response: 'fixture:details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/preview_format_geojson.geojson'
        },
        recommendations: {
            method: 'GET',
            url: '/api/v1/dataset/622746a5-4e2a-4a4c-ac18-74cb1fb05ab3/recommendations',
            response: []
        },
        query: {
            method: 'POST',
            url: '/api/v1/query',
            response: 'fixture:details_page_spec/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3/query_response.json'
        }
    },
    sysDataset: {
        method: 'GET',
        url: '/api/v1/organization/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002_ORG/dataset/Cesious_Black_OBWEG',
        response: 'fixture:details_page_spec/sysDataset'
    },
    "SYS_d3bf2154_1cda_11ea_a56a_0242ac110002": {
        previewFormatJson: {
            method: 'GET',
            url: '/api/v1/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/preview?_format=json',
            response: 'fixture:details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/preview_format_json.json'
        },
        recommendations: {
            method: 'GET',
            url: '/api/v1/dataset/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/recommendations',
            response: []
        },
        query1: {
            method: 'POST',
            url: '/api/v1/query',
            response: 'fixture:details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/query_response.json'
        },
        query2: {
            method: 'POST',
            url: '/api/v1/query',
            response: 'fixture:details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/query_response2.json'
        },
        query3: {
            method: 'POST',
            url: '/api/v1/query',
            response: 'fixture:details_page_spec/SYS_d3bf2154_1cda_11ea_a56a_0242ac110002/query_response2.json',
            delay: 1000
        }
    }
}