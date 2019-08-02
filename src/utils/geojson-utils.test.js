import { GeoJsonUtils } from './'

describe('determine bounding box', () => {
  const geoJsonData = {
    features: [{
      geometry: {
        coordinates: [[[1, 2], [3, 4], [5, 6]]]
      }
    }]
  }

  it('returns bbox when present on the dataset', () => {
    const bbox = [5, 4, 3, 2]
    const geoJsonData = { bbox: bbox }

    const result = GeoJsonUtils.determineBoundingBox(geoJsonData)

    expect(result).toEqual(bbox)
  })

  it('calculates bbox when bbox is not present on the dataset', () => {
    const result = GeoJsonUtils.determineBoundingBox(geoJsonData)

    expect(result).toEqual([1, 2, 5, 6])
  })
})
