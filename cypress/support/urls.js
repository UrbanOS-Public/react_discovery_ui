export const URLs = {
    datasetSearchPage: {
        base: /^http:\/\/localhost:9001\/$/,
        pageOne: /^http:\/\/localhost:9001\/\?page=1$/,
        apiAccessible: /^http:\/\/localhost:9001\/\?apiAccessible=false&page=1$/,
        cogoDatasets: /^http:\/\/localhost:9001\/\?facets%5Borganization%5D%5B%5D=COGO&page=1$/,
        bicycleDatasets: /^http:\/\/localhost:9001\/\?facets%5Bkeywords%5D%5B%5D=bicycle&page=1$/
    },
    datasetDetailsPage: {
        ogrip: /^http:\/\/localhost:9001\/dataset\/ogrip\/622746a5_4e2a_4a4c_ac18_74cb1fb05ab3$/,
        activityNodesDatasets: /^http:\/\/localhost:9001\/\?facets%5Bkeywords%5D%5B%5D=Activity%20Nodes$/
    }
}