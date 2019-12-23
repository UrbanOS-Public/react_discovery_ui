const FORMAT_OVERRIDES = {
  gtfs: 'json'
}

const containsFileType = (dataset, fileType) => dataset.fileTypes && dataset.fileTypes.map(type => type.toLowerCase()).includes(fileType)

const getDefaultFormat = (dataset) => {
  let format = dataset.fileTypes && dataset.fileTypes.length > 0
    ? dataset.fileTypes[0].toLowerCase()
    : 'json'
  return FORMAT_OVERRIDES[format] || format
}

export {
  containsFileType,
  getDefaultFormat
}
