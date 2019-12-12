import { createSelector } from "reselect"
import { isQueryTextAvailable, getVisualizationDataSources } from "./query-selectors"
import { mapValues, cloneDeep } from 'lodash'
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
export const userVisualizations = state => state.visualization.userVisualizations

export const isVisualizationSaveable = createSelector(
  isQueryTextAvailable,
  visualizationLoading,
  visualizationSaving,
  (queryTextAvailable, visualizationLoading, visualizationSaving) => {
    return queryTextAvailable && !(visualizationLoading || visualizationSaving)
  }
)

const clearValues = dataSources => {
  return mapValues(dataSources, () => [])
}

const dereferenceAndClone = (data, dataSources) => {
  var clonedData = cloneDeep(data)
  dereference(clonedData, dataSources)
  return clonedData
}

export const dereferencedChart = createSelector(
  visualizationChart,
  getVisualizationDataSources,
  (visualizationChart, visualizationDataSources) => {
    const { data, layout, frames } = visualizationChart

    const clearedDataSources = clearValues(visualizationDataSources)
    const dereferencedData = dereferenceAndClone(data, clearedDataSources)
    return { data: dereferencedData, layout, frames }
  }
)


