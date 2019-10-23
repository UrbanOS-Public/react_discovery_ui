import reducer from "./index";
import {
  SELECT_DATA_LIST,
  DISPLAY_ERROR,
  DATASET_DETAILS,
  RETRIEVE_DATASET_PREVIEW,
  DATASET_PREVIEW,
  CLEAR_DATASET_DETAILS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DOWNLOAD_DATASET_SUCCEEDED,
  CLEAR_DATASET_PREVIEW,
  DATASET_SEARCH,
  DATASET_SEARCH_SUCCEEDED,
  UPDATE_DATASET_SEARCH_PARAMS
} from "../actions";
import datasetListStub from "../../../stubs/dataset-list-stub";
import datasetStub from "../../../stubs/dataset-details-stub";

describe("Dataset Reducer", () => {
  it("SELECT_DATA_LIST places Dataset list in the state", () => {
    let currentState = {
      datasetReducer: {
        total: 0
      }
    };
    let newState = reducer(currentState, {
      type: SELECT_DATA_LIST,
      value: datasetListStub
    });

    expect(newState.datasetReducer.datasets).toEqual(datasetListStub.results);
    expect(newState.datasetReducer.total).toEqual(
      datasetListStub.metadata.totalDatasets
    );
  });

  it("DISPLAY_ERROR sets datasetError to true", () => {
    let currentState = {
      datasetReducer: {
        datasetError: false
      }
    };
    let newState = reducer(currentState, { type: DISPLAY_ERROR });

    expect(newState.datasetReducer.datasetError).toEqual(true);
  });

  it("DATASET_DETAILS places dataset in the state", () => {
    let currentState = {};
    let newState = reducer(currentState, {
      type: DATASET_DETAILS,
      value: datasetStub
    });

    expect(newState.datasetReducer.dataset).toEqual(datasetStub);
  });

  it("DOWNLOAD_DATASET_SUCCEEDED places downloaded data in state", () => {
    let currentState = {};
    const response = { id: 123 };

    let newState = reducer(currentState, {
      type: DOWNLOAD_DATASET_SUCCEEDED,
      value: response
    });

    expect(newState.datasetReducer.downloadedDataset).toEqual(response);
  });

  describe("CLEAR_DATASET_DETAILS", () => {
    const currentState = {
      datasetReducer: {
        dataset: { id: 123 },
        downloadedDataset: { id: 123 }
      }
    };
    let newState;

    beforeEach(() => {
      newState = reducer(currentState, { type: CLEAR_DATASET_DETAILS });
    });

    it("clears dataset", () => {
      expect(newState.datasetReducer.dataset).toEqual(undefined);
    });

    it("clears downloadedDataset", () => {
      expect(newState.datasetReducer.downloadedDataset).toEqual(undefined);
    });
  });
});

describe("UI Reducer", () => {
  it("RETRIEVE_DATASET_PREVIEW sets previewLoading to true", () => {
    let currentState = {
      presentation: {
        previewLoading: false
      },
      queryReducer: {
        isVisualizationQueryLoading: false
      }
    };
    let newState = reducer(currentState, { type: RETRIEVE_DATASET_PREVIEW });

    expect(newState.presentation.previewLoading).toEqual(true);
  });

  it("DATASET_PREIVEW sets previewLoading to false", () => {
    let currentState = {
      presentation: {
        previewLoading: true
      }
    };
    let newState = reducer(currentState, { type: DATASET_PREVIEW });

    expect(newState.presentation.previewLoading).toEqual(false);
  });

  it("DATASET_PREIVEW sets dataset_preivew", () => {
    let currentState = {
      presentation: {}
    };
    const expectedData = {
      firstName: "Joe",
      lastName: "Smith"
    };
    let newState = reducer(currentState, {
      type: DATASET_PREVIEW,
      value: expectedData
    });

    expect(newState.presentation.dataset_preview).toEqual(expectedData);
  });

  it("CLEAR_DATASET_PREVIEW clears out preview data", () => {
    let currentState = {
      presentation: {
        dataset_preview: "something",
        previewLoading: true
      }
    };
    const expectedData = {
      dataset_preview: undefined,
      previewLoading: false
    };
    let newState = reducer(currentState, { type: CLEAR_DATASET_PREVIEW });

    expect(newState.presentation).toEqual(expectedData);
  });

  it("LOGIN sets loading to true", () => {
    let currentState = {
      presentation: {
        isLoading: false
      }
    };
    let newState = reducer(currentState, { type: LOGIN });

    expect(newState.presentation.isLoading).toEqual(true);
  });

  it("LOGIN_SUCCESS sets lastLoginAttemptFailed to false", () => {
    let currentState = {
      presentation: {
        lastLoginAttemptFailed: true
      }
    };
    let newState = reducer(currentState, { type: LOGIN_SUCCESS });

    expect(newState.presentation.lastLoginAttemptFailed).toEqual(false);
    expect(newState.presentation.isLoading).toEqual(false);
  });

  it("LOGIN_FAILURE sets lastLoginAttemptFailed to true", () => {
    let currentState = {
      presentation: {
        lastLoginAttemptFailed: false
      }
    };
    let newState = reducer(currentState, { type: LOGIN_FAILURE });

    expect(newState.presentation.lastLoginAttemptFailed).toEqual(true);
    expect(newState.presentation.isLoading).toEqual(false);
  });
});

describe("Search Reducer", () => {
  it("DATASET_SEARCH sets isRunning to true", () => {
    let currentState = {
      searchReducer: {
        isRunning: false
      }
    };
    let newState = reducer(currentState, { type: DATASET_SEARCH });

    expect(newState.searchReducer.isRunning).toEqual(true);
  });

  it("DATASET_SEARCH_SUCCEEDED sets searchResults and metadata in the state", () => {
    let currentState = {
      searchReducer: {
        searchResults: {}
      }
    };
    let expectedData = {
      results: [{ this: "bob", that: "joe" }],
      metadata: ["metadata"]
    };
    let newState = reducer(currentState, {
      type: DATASET_SEARCH_SUCCEEDED,
      value: expectedData
    });

    expect(newState.searchReducer.searchResults).toEqual(expectedData.results);
    expect(newState.searchReducer.searchMetadata).toEqual(
      expectedData.metadata
    );
  });

  it("DATASET_SEARCH_SUCCEEDED sets isRunning to false", () => {
    let currentState = {
      searchReducer: {
        isRunning: true
      }
    };
    let expectedData = [];
    let newState = reducer(currentState, {
      type: DATASET_SEARCH_SUCCEEDED,
      value: expectedData
    });

    expect(newState.searchReducer.isRunning).toEqual(false);
  });

  it("UPDATE_DATASET_SEARCH_PARAMS sets search params", () => {
    let currentState = {
      searchReducer: {
        searchParams: {}
      }
    };
    let expectedParams = { limit: 1, query: "bob" };
    let newState = reducer(currentState, {
      type: UPDATE_DATASET_SEARCH_PARAMS,
      value: expectedParams
    });

    expect(newState.searchReducer.searchParams).toEqual(expectedParams);
  });

  it("UPDATE_DATASET_SEARCH_PARAMS sets facets", () => {
    let currentState = {
      searchReducer: {
        searchParams: {}
      }
    };
    let expectedParams = { facets: { keyword: ["stuff"] } };
    let newState = reducer(currentState, {
      type: UPDATE_DATASET_SEARCH_PARAMS,
      value: expectedParams
    });

    expect(newState.searchReducer.searchParams).toEqual(expectedParams);
  });

  it("UPDATE_DATASET_SEARCH_PARAMS toggles facets on", () => {
    let currentState = {
      searchReducer: {
        searchParams: { facets: { keyword: ["stuff"] } }
      }
    };
    let expectedParams = { facets: { keyword: ["stuff", "things"] } };
    let newState = reducer(currentState, {
      type: UPDATE_DATASET_SEARCH_PARAMS,
      value: { facets: { keyword: ["things"] } }
    });

    expect(newState.searchReducer.searchParams).toEqual(expectedParams);
  });

  it("UPDATE_DATASET_SEARCH_PARAMS toggles facets off", () => {
    let currentState = {
      searchReducer: {
        searchParams: { facets: { keyword: ["stuff", "things"] } }
      }
    };
    let expectedParams = { facets: { keyword: ["things"] } };
    let newState = reducer(currentState, {
      type: UPDATE_DATASET_SEARCH_PARAMS,
      value: { facets: { keyword: ["stuff"] } }
    });

    expect(newState.searchReducer.searchParams).toEqual(expectedParams);
  });

  it("UPDATE_DATASET_SEARCH_PARAMS merges search params", () => {
    let currentState = {
      searchReducer: {
        searchParams: { limit: 1, query: "bob" }
      }
    };
    let params = { query: "frank", offset: 10 };
    let expected = { limit: 1, query: "frank", offset: 10, facets: {} };
    let newState = reducer(currentState, {
      type: UPDATE_DATASET_SEARCH_PARAMS,
      value: params
    });

    expect(newState.searchReducer.searchParams).toEqual(expected);
  });
});
