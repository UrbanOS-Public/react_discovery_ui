const determineBoundingBox = geoJsonData => {
  return geoJsonData.bbox ? geoJsonData.bbox : calculateBoundingBox(geoJsonData)
}

const calculateBoundingBox = geoJsonData => {
  // console.log('geoJson', geoJsonData)
  let minLat, minLong, maxLat, maxLong
  minLat = minLong = 1000
  maxLat = maxLong = -1000

  // console.log('some coordinates', geoJsonData.features[0].geometry.coordinates[0][0], geoJsonData.features[0].geometry.coordinates[0][1])

  geoJsonData.features.forEach((feature) => {
    //if featureType === 'multiLineString' do this
    // else featureType === 'lineString' just do one level
    // combine both of these and do min/max
    feature.geometry.coordinates.forEach((coordinates) => {
      coordinates.forEach((coordinate) => {
        const long = coordinate[0]
        const lat = coordinate[1]

        minLat = lat < minLat ? lat : minLat
        maxLat = lat > maxLat ? lat : maxLat
        minLong = long < minLong ? long : minLong
        maxLong = long > maxLong ? long : maxLong
      })
    })
  })
  console.log('bounding', [minLong, minLat, maxLong, maxLat])
  return [minLong, minLat, maxLong, maxLat]
}

export default { determineBoundingBox }
