import { createSelector } from "reselect"
import { isQueryTextAvailable } from "./query-selectors"

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