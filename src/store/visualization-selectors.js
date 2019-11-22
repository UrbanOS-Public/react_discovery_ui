import { createSelector } from "reselect"
import { isQueryTextAvailable, getVisualizationDataSources } from "./query-selectors"
import { cloneDeep } from 'lodash'
import { dereference } from 'react-chart-editor/lib'

export const visualizationID = state => state.visualization.visualization.id
export const visualizationTitle = state => state.visualization.visualization.title
export const visualizationLoading = state => state.visualization.loading
export const visualizationLoadSuccess = state => state.visualization.loadSuccess
export const visualizationLoadFailure = state => state.visualization.loadFailure
export const visualizationSaving = state => state.visualization.saving
export const visualizationSaveSuccess = state => state.visualization.saveSuccess
export const visualizationSaveFailure = state => state.visualization.saveFailure
export const visualizationChart = state => state.visualization.chart

export const isVisualizationSaveable = createSelector(
  isQueryTextAvailable,
  visualizationLoading,
  visualizationSaving,
  (queryTextAvailable, visualizationLoading, visualizationSaving) => {
    return queryTextAvailable && !(visualizationLoading || visualizationSaving)
  }
)

const clearValues = datasources => {
  Object.keys(datasources).forEach((key) => {
    datasources[key] = []
  })
}

const dereferenceAndClone = (data, dataSources) => {
  var clonedData = cloneDeep(data)
  dereference(clonedData, dataSources)
  return clonedData
}

export const dereferencedChart = createSelector(
  visualizationChart,
  getVisualizationDataSources,
  (visualizationChart, getVisualizationDataSources) => {
    const { data, layout, frames } = visualizationChart
    const dataSources = getVisualizationDataSources

    clearValues(dataSources)
    const dereferencedData = dereferenceAndClone(data, dataSources)
    return { data: dereferencedData, layout, frames }
  }
)


