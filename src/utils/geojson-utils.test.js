import { GeoJsonUtils } from './'

describe('determine bounding box', () => {
  it('returns bbox when present on the dataset', () => {
    const bbox = [5, 4, 3, 2]
    const geoJsonData = { bbox: bbox }

    const result = GeoJsonUtils.determineBBox(geoJsonData)

    expect(result).toEqual(bbox)
  })

  describe('when bbox is not present on the dataset', () => {
    it('calculates bbox for multi-line strings', () => {
      const geoJsonData = {
        features: [
          {
            geometry: {
              type: 'MultiLineString',
              coordinates: [[[1, 2], [3, 4]], [[5, 8]]]
            }
          },
          {
            geometry: {
              type: 'MultiLineString',
              coordinates: [[[7, 6]]]
            }
          }
        ]
      }

      const result = GeoJsonUtils.determineBBox(geoJsonData)

      expect(result).toEqual([1, 2, 7, 8])
    })

    it('calculates bbox for singe-line strings', () => {
      const geoJsonData = {
        features: [{
          geometry: {
            type: 'LineString',
            coordinates: [[1, 2], [3, 8]]
          }
        }, {
          geometry: {
            type: 'LineString',
            coordinates: [[7, 4], [5, 6]]
          }
        }]
      }

      const result = GeoJsonUtils.determineBBox(geoJsonData)

      expect(result).toEqual([1, 2, 7, 8])
    })

    it('calculates bbox for a mix of single and multi-line strings', () => {
      const geoJsonData = {
        features: [
          {
            geometry: {
              type: 'LineString',
              coordinates: [[1, -6], [3, 8]]
            }
          },
          {
            geometry: {
              type: 'MultiLineString',
              coordinates: [[[7, 6], [-1, 2]], [[5, 4], [10, 12]]]
            }
          }
        ]
      }

      const result = GeoJsonUtils.determineBBox(geoJsonData)

      expect(result).toEqual([-1, -6, 10, 12])
    })
  })
})

describe('is valid bounding box', () => {
  it('returns false if bounding box is not provided', () => {
    expect(GeoJsonUtils.isValidBBox()).toBe(false)
  })

  it('returns false if bounding box does not have right number of values', () => {
    expect(GeoJsonUtils.isValidBBox([-180, -90, 180])).toBe(false)
    expect(GeoJsonUtils.isValidBBox([-180, -90, 180, 90, -180])).toBe(false)
  })

  it('returns false if minLong is out of range', () => {
    expect(GeoJsonUtils.isValidBBox([-190, -90, 180, 90])).toBe(false)
    expect(GeoJsonUtils.isValidBBox([190, -90, 180, 90])).toBe(false)
  })

  it('returns false if minLat is out of range', () => {
    expect(GeoJsonUtils.isValidBBox([-180, -90.1, 180, 90])).toBe(false)
    expect(GeoJsonUtils.isValidBBox([-180, 90.5, 180, 90])).toBe(false)
  })

  it('returns false if maxLong is out of range', () => {
    expect(GeoJsonUtils.isValidBBox([-180, -90, -180.5, 90])).toBe(false)
    expect(GeoJsonUtils.isValidBBox([-180, -90, 180.2, 90])).toBe(false)
  })

  it('returns false if maxLat is out of range', () => {
    expect(GeoJsonUtils.isValidBBox([-180, -90, 180, -90.5])).toBe(false)
    expect(GeoJsonUtils.isValidBBox([-180, -90, 180, 90.2])).toBe(false)
  })

  it('returns false if minLong and maxLong are reversed', () => {
    expect(GeoJsonUtils.isValidBBox([0, -90, -1, 90])).toBe(false)
  })

  it('returns false if minLat and maxLat are reversed', () => {
    expect(GeoJsonUtils.isValidBBox([-180, 1, 180, 0])).toBe(false)
  })

  it('returns true if all values are in range', () => {
    expect(GeoJsonUtils.isValidBBox([-180, -90, 180, 90])).toBe(true)
  })
})
