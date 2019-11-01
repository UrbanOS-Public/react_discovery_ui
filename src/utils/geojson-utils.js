import _ from 'lodash'

const determineBBox = geoJsonData => {
  return geoJsonData.bbox ? geoJsonData.bbox : calculateBBox(geoJsonData)
}

const calculateBBox = geoJsonData => {
  const initial = { minLong: 1000, minLat: 1000, maxLong: -1000, maxLat: -1000 }
  const bounds = _.chain(geoJsonData.features)
    .map(flattenCoordinateLists)
    .flatten()
    .reduce(getNewBounds, initial)
    .value()

  return [bounds.minLong, bounds.minLat, bounds.maxLong, bounds.maxLat]
}

const flattenCoordinateLists = feature => {
  switch (feature.geometry.type) {
    case 'MultiLineString':
      return _.flatten(feature.geometry.coordinates)
    case 'LineString':
      return feature.geometry.coordinates
    default:
      return []
  }
}

const getNewBounds = (bounds, coordinate) => {
  const long = coordinate[0]
  const lat = coordinate[1]
  return {
    minLat: Math.min(lat, bounds.minLat),
    maxLat: Math.max(lat, bounds.maxLat),
    minLong: Math.min(long, bounds.minLong),
    maxLong: Math.max(long, bounds.maxLong)
  }
}

const isValidBBox = boundingBox => {
  if (!boundingBox || boundingBox.length != 4) { return false }

  const [minLong, minLat, maxLong, maxLat] = boundingBox

  if (boundingBox.some(x => x === null)) { 
    return false 
  }
  if (minLong > maxLong || minLat > maxLat ||
    minLong < -180 || minLong > 180 ||
    minLat < -90 || minLat > 90 ||
    maxLong < -180 || maxLong > 180 ||
    maxLat < -90 || maxLat > 90) {
    return false
  }
  return true
}

export default { determineBBox, isValidBBox }
