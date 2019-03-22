import { shallow } from 'enzyme'
import DatasetApiDoc from './dataset-api-doc'

describe('data card element', () => {
  let subject

  test('the example url should have the dataset id', () => {
    subject = shallow(<DatasetApiDoc dataset={{ id: 'coda_stuff' }} />)
    expect(subject.find('.example-code').text()).toMatch('/api/v1/dataset/coda_stuff/query?limit=200&orderBy=id asc&where=id=3')
  })
})
