import { RecommendationUtils } from './'
import { recommendations } from '../../test-helpers/recommendations'

describe('recommendation utils', () => {
  test('return url to dataset details page', () => {
    const expectedUrl = '/dataset/hello/world'
    expect(RecommendationUtils.getDatasetUrl(recommendations[0])).toEqual(expectedUrl)
  })
})
