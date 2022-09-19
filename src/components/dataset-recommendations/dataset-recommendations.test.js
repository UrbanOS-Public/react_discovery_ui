import { shallow } from 'enzyme'
import DatasetRecommendations from './dataset-recommendations'
import { recommendations } from '../../../test-helpers/recommendations'

let subject

describe('DatasetRecommendations', () => {
  describe('with no recommedations found', () => {
    test('returns no content when recommendations is undefined', () => {
      subject = createSubject(recommendations)
      expect(subject.find(DatasetRecommendations).children().length).toEqual(0)
    })

    test('returns no content when there are no recommendations', () => {
      subject = createSubject([])
      expect(subject.find(DatasetRecommendations).children().length).toEqual(0)
    })
  })

  describe('rendering', () => {
    beforeEach(() => {
      subject = createSubject(recommendations)
    })

    test('returns urls for each recommended dataset', () => {
      expect(subject.find('.recommended-dataset').length).toEqual(recommendations.length)
    })
  })
})

function createSubject (recommendations) {
  return shallow(<DatasetRecommendations
    dataset={{}}
    getRecommendations={jest.fn}
    recommendations={recommendations}
                 />)
}
