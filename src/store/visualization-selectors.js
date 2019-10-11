import { createSelector } from "reselect"
import { isQueryTextAvailable } from "./query-selectors"

export const visualizationID = state => state.visualization.visualization.id
export const visualizationTitle = state => state.visualization.visualization.title
export const visualizationLoading = state => state.visualization.loading
export const visualizationLoaded = state => state.visualization.loaded
export const visualizationSaving = state => state.visualization.saving
export const visualizationSaved = state => state.visualization.saved
export const visualizationLoadError = state => state.visualization.loadError
export const visualizationSaveError = state => state.visualization.saveError

export const isVisualizationSavable = createSelector(
  isQueryTextAvailable,
  visualizationLoading,
  visualizationSaving,
  visualizationSaved,
  visualizationSaveError,
  (queryTextAvailable, visualizationLoading, visualizationSaving, visualizationSaved, visualizationSaveError) => {
    return queryTextAvailable && !(visualizationLoading || visualizationSaving || visualizationSaved || visualizationSaveError)
  }
)