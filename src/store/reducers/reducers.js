import { combineReducers } from "redux";
import _ from "lodash";
import {
  DISPLAY_ERROR,
  DATASET_DETAILS,
  DATASET_RECOMMENDATIONS_SUCCEEDED,
  RETRIEVE_DATA_LIST,
  RETRIEVE_DATASET,
  RETRIEVE_DATASET_PREVIEW,
  DATASET_PREVIEW,
  CLEAR_DATASET_PREVIEW,
  CLEAR_DATASET_DETAILS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DOWNLOAD_DATASET_SUCCEEDED,
  DOWNLOAD_DATASET_FAILED,
  DATASET_SEARCH,
  DATASET_SEARCH_SUCCEEDED
} from "../actions";
import visualizationReducer from "./visualization-reducer";

import queryReducer from "./query-reducer";

const defaultDatasetState = {
  datasets: [],
  total: 0,
  datasetError: false
};

const datasetReducer = (state = defaultDatasetState, action) => {
  switch (action.type) {
    case DISPLAY_ERROR:
      return Object.assign({}, state, {
        datasetError: true
      });
    case DATASET_DETAILS:
      return Object.assign({}, state, {
        dataset: action.value
      });
    case DATASET_RECOMMENDATIONS_SUCCEEDED:
      return Object.assign({}, state, {
        recommendations: action.value
      });
    case CLEAR_DATASET_DETAILS:
      return Object.assign({}, state, {
        dataset: undefined,
        downloadedDataset: undefined
      });
    case DOWNLOAD_DATASET_SUCCEEDED:
      return Object.assign({}, state, {
        downloadedDataset: action.value
      });
    case DOWNLOAD_DATASET_FAILED:
      return Object.assign({}, state, { downloadedDatasetError: true });
    default:
      return state;
  }
};

const defaultPresentationState = {
  isLoading: false,
  isVisualizationQueryLoading: false
};

const presentationReducer = (state = defaultPresentationState, action) => {
  switch (action.type) {
    case RETRIEVE_DATA_LIST:
    case RETRIEVE_DATASET:
      return Object.assign({}, state, {
        isVisualizationQueryLoading: true
      });
    case RETRIEVE_DATASET_PREVIEW:
      return Object.assign({}, state, {
        previewLoading: true
      });
    case DATASET_PREVIEW:
      return Object.assign({}, state, {
        dataset_preview: action.value,
        previewLoading: false
      });
    case CLEAR_DATASET_PREVIEW:
      return Object.assign({}, state, {
        dataset_preview: undefined,
        previewLoading: false
      });
    case DATASET_DETAILS:
      return Object.assign({}, state, {
        isLoading: false
      });
    case LOGIN:
      return Object.assign({}, state, {
        isLoading: true
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        lastLoginAttemptFailed: false,
        isLoading: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        lastLoginAttemptFailed: true,
        isLoading: false
      });

    default:
      return state;
  }
};

const defaultSearchState = {
  isRunning: false,
  searchResults: [],
  searchMetadata: {}
};

const searchReducer = (state = defaultSearchState, action) => {
  switch (action.type) {
    case DATASET_SEARCH:
      return Object.assign({}, state, { isRunning: true });
    case DATASET_SEARCH_SUCCEEDED:
      return Object.assign({}, state, {
        isRunning: false,
        searchResults: action.value.results,
        searchMetadata: action.value.metadata
      });
    default:
      return state;
  }
};

const updateFacets = (existingFacets, facetUpdates) => {
  for (let [facetCategory, facetList] of Object.entries(facetUpdates || {})) {
    facetList.forEach(facetValue => {
      toggleFacetValue(existingFacets, facetCategory, facetValue);
    });
  }
  return existingFacets;
};

const toggleFacetValue = (facets, facetCategory, facetValue) => {
  const facetValues = _.get(facets, facetCategory);
  Object.assign(facets || {}, {
    [facetCategory]: _.xor(facetValues, [facetValue])
  });
};

const reducers = {
  datasetReducer: datasetReducer,
  presentation: presentationReducer,
  queryReducer: queryReducer,
  visualization: visualizationReducer,
  searchReducer: searchReducer
};

const combined = combineReducers(reducers);
export { combined as default, reducers };
