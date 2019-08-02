const determineBoundingBox = geoJsonData => {
  return geoJsonData.bbox ? geoJsonData.bbox : calculateBoundingBox(geoJsonData)
}

const calculateBoundingBox = geoJsonData => {
  const bounds = geoJsonData.features.map(feature => {
    if (feature.geometry.type === 'MultiLineString') {
      return feature.geometry.coordinates.flat(1)
    } else if (feature.geometry.type === 'LineString') {
      return feature.geometry.coordinates
    } else {
      return []
    }
  }).flat(1).reduce(getNewBounds, { minLong: 1000, minLat: 1000, maxLong: -1000, maxLat: -1000 })

return [bounds.minLong, bounds.minLat, bounds.maxLong, bounds.maxLat]
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

export default { determineBoundingBox }
