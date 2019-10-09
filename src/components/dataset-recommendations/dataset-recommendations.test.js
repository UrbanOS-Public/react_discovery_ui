import { shallow } from 'enzyme'
import DatasetRecommendations from './dataset-recommendations'
import { exportAllDeclaration } from '@babel/types'

let subject
const recommendations = [
  { "systemName": "hello__world", "orgName": "hello", "id": "hello_id", "dataTitle": "The world!", "dataName": "world" },
  { "systemName": "foo__bar", "orgName": "foo", "id": "foo_id", "dataTitle": "Foo Bar Baz!", "dataName": "bar" }
]

describe('DatasetRecommendations ', () => {
  beforeEach(() => {
    subject = shallow(<DatasetRecommendations recommendations={recommendations} />)
  })

  test('returns urls for each recommended dataset', () => {
    expect(subject.find('li').length).toEqual(recommendations.length)

    const expectedUrl = `/dataset/hello/world`
    expect(subject.find(`[href="${expectedUrl}"]`).length).toEqual(1)
  })
})
