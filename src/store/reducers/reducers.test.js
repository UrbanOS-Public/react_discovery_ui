import reducer from "./index";
import {
  DISPLAY_ERROR,
  DATASET_DETAILS,
  RETRIEVE_DATASET_PREVIEW,
  DATASET_PREVIEW,
  DATASET_REFERENCE,
  RESET_DATASET_REFERENCES,
  CLEAR_DATASET_DETAILS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DOWNLOAD_DATASET_SUCCEEDED,
  CLEAR_DATASET_PREVIEW,
  DATASET_SEARCH,
  DATASET_SEARCH_SUCCEEDED
} from "../actions";
import datasetStub from "../../../stubs/dataset-details-stub";

describe("Dataset Reducer", () => {
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
        previewLoading: true,
        dataset_preview: {}
      }
    };
    let newState = reducer(currentState, { value: {}, type: DATASET_PREVIEW });

    expect(newState.presentation.previewLoading).toEqual(false);
  });

  it("DATASET_PREVIEW sets dataset_preview", () => {
    let currentState = {
      presentation: {dataset_preview: {}}
    };
    const expectedData = {
      firstName: "Joe",
      lastName: "Smith"
    };
    const actionValue = {
      data: expectedData,
      format: 'json'
    }
    let newState = reducer(currentState, {
      type: DATASET_PREVIEW,
      value: actionValue
    });
    expect(newState.presentation.dataset_preview['json']).toEqual(expectedData);
  });

  it("CLEAR_DATASET_PREVIEW clears out preview data", () => {
    let currentState = {
      presentation: {
        dataset_preview: "something",
        previewLoading: true
      }
    };
    const expectedData = {
      dataset_preview: {},
      previewLoading: false
    };
    let newState = reducer(currentState, { type: CLEAR_DATASET_PREVIEW });

    expect(newState.presentation).toEqual(expectedData);
  });

  it("DATASET_REFERENCE sets datasetReferences", () => {
    let currentState = {
      presentation: {datasetReferences: {}}
    };
    const dataset = {
      name: "dName",
      title: "Title D#",
      id: "123",
      organization: {
        name: "oName"
      }
    }
    const expectedData = {
      "123": {name: "dName", org: "oName", title: "Title D#", id: "123"}
    };
    const actionValue = dataset
    let newState = reducer(currentState, {
      type: DATASET_REFERENCE,
      value: actionValue
    });
    expect(newState.presentation.datasetReferences).toEqual(expectedData);
  });

  it("RESET_DATASET_REFERENCES removes all dataset references", () => {
    let currentState = {
      presentation: {
        datasetReferences: {
        "123": {name: "dName", org: "oName", title: "Title D#", id: "123"}
      }}
    };
    const dataset = {
      name: "dName",
      title: "Title D#",
      id: "123",
      organization: {
        name: "oName"
      }
    }
    const expectedData = {};
    const actionValue = dataset
    let newState = reducer(currentState, {
      type: RESET_DATASET_REFERENCES,
      value: actionValue
    });
    expect(newState.presentation.datasetReferences).toEqual(expectedData);
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
});
