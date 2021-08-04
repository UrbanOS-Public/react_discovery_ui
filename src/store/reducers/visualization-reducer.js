import {
  VISUALIZATION_LOAD,
  VISUALIZATION_LOAD_SUCCESS,
  VISUALIZATION_LOAD_FAILURE,
  VISUALIZATIONS_LOAD_ALL,
  VISUALIZATIONS_LOAD_ALL_SUCCESS,
  VISUALIZATIONS_LOAD_ALL_FAILURE,
  VISUALIZATION_SAVE,
  VISUALIZATION_SAVE_SUCCESS,
  VISUALIZATION_SAVE_FAILURE,
  VISUALIZATION_DELETE,
  VISUALIZATION_DELETE_SUCCESS,
  VISUALIZATION_DELETE_FAILURE,
  VISUALIZATION_DELETE_CLEAR,
  VISUALIZATION_RESET,
  SET_CHART_INFORMATION
} from "../actions"
import { isArray, isPlainObject } from 'lodash'
import { Link } from 'react-router-dom'
import {DateTime} from 'luxon';

const defaultVisualizationState = {
  visualization: { id: undefined },
  chart: { data: [], layout: {}, frames: [] },
  loading: false,
  loadSuccess: false,
  loadFailure: false,
  saving: false,
  saveSuccess: false,
  saveFailure: false,
  deleting: false,
  deleteSuccess: false,
  deleteFailure: false
}

const visualizationReducer = (state = defaultVisualizationState, action) => {
  switch (action.type) {
    case VISUALIZATION_LOAD:
      return Object.assign({}, state, {
        loading: true,
        loadSuccess: false,
        loadFailure: false
      })
    case VISUALIZATION_LOAD_SUCCESS:
      return Object.assign({}, state, {
        visualization: action.value,
        loading: false,
        loadSuccess: true,
        loadFailure: false
      })
    case VISUALIZATION_LOAD_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        loadSuccess: false,
        loadFailure: true
      })
    case VISUALIZATIONS_LOAD_ALL:
      return Object.assign({}, state, {
        loading: true,
        loadSuccess: false,
        loadFailure: false
      })
    case VISUALIZATIONS_LOAD_ALL_SUCCESS:
      return Object.assign({}, state, {
        userVisualizations: formatVisualizationsForTable(action.value),
        loading: false,
        loadSuccess: true,
        loadFailure: false
      })
    case VISUALIZATIONS_LOAD_ALL_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        loadSuccess: false,
        loadFailure: true
      })
    case VISUALIZATION_DELETE:
      return Object.assign({}, state, {
        deleteFailure: false,
        deleteSuccess: false,
        deleting: true,
      })
    case VISUALIZATION_DELETE_FAILURE:
      return Object.assign({}, state, {
        deleteFailure: true,
        deleting: false
      })
    case VISUALIZATION_DELETE_SUCCESS:
      return Object.assign({}, state, {
        deleteSuccess: true,
        deleting: false
      })
    case VISUALIZATION_DELETE_CLEAR:
      return Object.assign({}, state, {
        deleteSuccess: false,
        deleteFailure: false,
        deleting: false
      })
    case VISUALIZATION_SAVE:
      return Object.assign({}, state, {
        saving: true,
        saveSuccess: false,
        saveFailure: false
      })
    case VISUALIZATION_SAVE_SUCCESS:
      return Object.assign({}, state, {
        visualization: action.value,
        saving: false,
        saveSuccess: true,
        saveFailure: false
      })
    case VISUALIZATION_SAVE_FAILURE:
      return Object.assign({}, state, {
        saving: false,
        saveSuccess: false,
        saveFailure: true
      })
    case SET_CHART_INFORMATION:
      return Object.assign({}, state, { chart: constructValidChart(action.value) })
    case VISUALIZATION_RESET:
      return defaultVisualizationState
    default: return state
  }
}

const constructValidChart = ({ data, frames, layout }) => {
  return {
    data: isValidChartData(data) ? data : [],
    frames: isValidChartFrames(frames) ? frames : [],
    layout: isValidChartLayout(layout) ? layout : {}
  }
}

const isValidChartData = data => {
  return isArray(data) && data.every(isPlainObject)
}

const isValidChartFrames = frames => {
  return isArray(frames) && frames.every(isPlainObject)
}

const isValidChartLayout = layout => {
  return isPlainObject(layout)
}

const utcToLocalTime = utcString => {
  return DateTime.fromISO(utcString, {zone: 'utc'}).toLocal().toISO({includeOffset: false, suppressMilliseconds: true})
}

const formatVisualizationsForTable = visualizations => {
  return visualizations.map(visualization => {
    return {
      ...visualization,
      title: (<Link to={`/visualization/${visualization.id}`}>{visualization.title}</Link>),
      created: utcToLocalTime(visualization.created),
      updated: utcToLocalTime(visualization.updated)
    }
  })
}

export default visualizationReducer
