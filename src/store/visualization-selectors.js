import { createSelector } from "reselect"
import { isQueryTextAvailable } from "./query-selectors"

export const visualizationTitle = state => state.visualization.visualization.title
export const visualizationLoading = state => state.visualization.loading
export const visualizationSaving = state => state.visualization.saving
export const visualizationError = state => state.visualization.error

export const isVisualizationSavable = createSelector(
  isQueryTextAvailable,
  visualizationSaving,
  visualizationLoading,
  visualizationError,
  (queryTextAvailable, visualizationSaving, visualizationLoading, visualizationError) => {
    return queryTextAvailable && !(visualizationSaving || visualizationLoading || visualizationError)
  }
)