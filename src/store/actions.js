export const RETRIEVE_DATA_LIST = 'RETRIEVE_DATA_LIST'
export const SELECT_DATA_LIST = 'SELECT_DATA_LIST'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'

export const retrieveDataList = () => {
  return { type: RETRIEVE_DATA_LIST }
}

export const selectDataList = (data) => {
  return { type: SELECT_DATA_LIST, value: data }
}

export const displayError = () => {
  return { type: DISPLAY_ERROR }
}
