import { GeoJsonUtils } from './'

describe('determine bounding box', () => {
  it('returns bbox when present on the dataset', () => {
    const bbox = [5, 4, 3, 2]
    const geoJsonData = { bbox: bbox }

    const result = GeoJsonUtils.determineBoundingBox(geoJsonData)

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

      const result = GeoJsonUtils.determineBoundingBox(geoJsonData)

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

      const result = GeoJsonUtils.determineBoundingBox(geoJsonData)

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

      const result = GeoJsonUtils.determineBoundingBox(geoJsonData)

      expect(result).toEqual([-1, -6, 10, 12])
    })
  })
})
