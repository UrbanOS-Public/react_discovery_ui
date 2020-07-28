export const Selectors = {
    sortSelectBox: '[data-testid=sort-select]',
    datasetsFoundCount: '[data-testid=result-count]',
    paginator: '[data-testid=paginator]',
    dialogContent: '[data-testid=dialog-content]',
    search: '[data-testid=search]',
    datasets: '[data-testid=dataset-list]',
    firstDataset: '[data-testid=dataset-list] > :nth-child(1)',
    apiAccessibleCheckbox: '[data-testid="checkbox-indicator-Only Show API Accessible Datasets"]',
    organizations: '[data-testid=facet-list-organization]',
    cogoCheckBox: '[data-testid="checkbox-indicator-COGO (5)"]',
    keywords: '[data-testid=facet-list-keywords]',
    bicycleCheckBox: '[data-testid="checkbox-indicator-bicycle (5)"]'
}

export const Routes = {
    allDatasetsLastModified: {
        method: 'GET', 
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=last_mod&query=&apiAccessible=true',
        response: 'fixture:search_page_spec/all_datasets_last_modified'
    },
    allDatasetsNameAsc: { 
        method: 'GET', 
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=name_asc&query=&apiAccessible=true', 
        response: 'fixture:search_page_spec/all_datasets_name_asc'
    },
    allDatasetsRelevance: {
        method: 'GET', 
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=relevance&query=&apiAccessible=true',
        response: 'fixture:search_page_spec/all_datasets_relevance'
    },
    allDatasetsNameDesc: {
        method: 'GET', 
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=name_desc&query=&apiAccessible=true',
        response: 'fixture:search_page_spec/all_datasets_name_desc'
    },
    allDatasetsPage2: {
        method: 'GET',
        url: '/api/v2/dataset/search?offset=10&limit=10&sort=name_asc&query=&apiAccessible=true',
        response: 'fixture:search_page_spec/all_datasets_page_2'
    },
    apiAccessibleFalseDatasets: {
        method: 'GET',
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=name_asc&query=&apiAccessible=false',
        response: 'fixture:search_page_spec/apiAccessible_false_datasets'
    },
    bicycleDatasets: {
        method: 'GET',
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=name_asc&query=&facets[keywords][]=bicycle&apiAccessible=true',
        response: 'fixture:search_page_spec/bicycle_datasets'
    },
    cogoDatasets: {
        method: 'GET',
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=name_asc&query=&facets[organization][]=COGO&apiAccessible=true',
        response: 'fixture:search_page_spec/cogo_datasets'
    },
    cotaDatasets: {
        method: 'GET',
        url: '/api/v2/dataset/search?offset=0&limit=10&sort=name_asc&query=COTA&apiAccessible=true',
        response: 'fixture:search_page_spec/cota_datasets'
    },
    info: {
        method: 'GET',
        url: '/sockjs-node/*',
        response: 'fixture:info.json'
    },
    ogripDataset: {
        method: 'GET',
        url: '/api/v1/organization/ogrip/dataset/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3',
        response: 'fixture:details_page_spec/ogrip_dataset'
    }
}