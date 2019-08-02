const determineBoundingBox = geoJsonData => {
  return geoJsonData.bbox ? geoJsonData.bbox : calculateBoundingBox(geoJsonData)
}

const calculateBoundingBox = geoJsonData => {
  const bounds = geoJsonData.features
    .map(flattenCoordinates)
    .flat(1)
    .reduce(
      getNewBounds,
      { minLong: 1000, minLat: 1000, maxLong: -1000, maxLat: -1000 }
    )

  return [bounds.minLong, bounds.minLat, bounds.maxLong, bounds.maxLat]
}

const flattenCoordinates = feature => {
  switch (feature.geometry.type) {
    case 'MultiLineString':
      return feature.geometry.coordinates.flat(1)
    case 'LineString':
      return feature.geometry.coordinates
    default:
      return []
  }
}

const getNewBounds = (bounds, coordinate) => {
  const long = coordinate[0];
  const lat = coordinate[1];
  return {
    minLat: Math.min(lat, bounds.minLat),
    maxLat: Math.max(lat, bounds.maxLat),
    minLong: Math.min(long, bounds.minLong),
    maxLong: Math.max(long, bounds.maxLong)
  }
}

const isValidBoundingBox = boundingBox => {
  if (!boundingBox || boundingBox.length != 4) { return false }

  const [minLong, minLat, maxLong, maxLat] = boundingBox
  if (minLong > maxLong || minLat > maxLat
    || minLong < -180 || minLong > 180
    || minLat < -90 || minLat > 90
    || maxLong < -180 || maxLong > 180
    || maxLat < -90 || maxLat > 90) {
    return false
  }
  return true
}

export default { determineBoundingBox, isValidBoundingBox }
