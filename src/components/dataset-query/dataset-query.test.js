import { mount } from 'enzyme'
import DatasetQuery from './dataset-query'

describe('DatasetQuery', () => {
  let subject, queryCallback

  describe('on success', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(<DatasetQuery systemName='org1__table2' queryDataset={queryCallback}></DatasetQuery>)
    })

    test('defaults the query text to use the systemName', () => {
      expect(subject.find('textarea').render().text()).toEqual('SELECT * FROM org1__table2\nLIMIT 20000')
    })

    test('calls the submit handler on click of the submit button', () => {
      const newText = 'SELECT * FROM great_org__awesome_dataset LIMIT 55'
      const queryInput = subject.find('textarea')
      queryInput.instance().value = newText;
      queryInput.simulate('change');

      subject.find('button').simulate('click')
      expect(queryCallback).toHaveBeenCalledWith(newText)
    })

    test('calls the submit handler on component mounting', () => {
      expect(queryCallback).toHaveBeenCalledWith('SELECT * FROM org1__table2\nLIMIT 20000')
    })
  })
  describe('on failure', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(<DatasetQuery queryDataset={jest.fn()} queryFailureMessage='the bad thing happened'></DatasetQuery>)
    })

    test('it indicates that a query error occurred', () => {
      expect(subject.find('.error-message')).toHaveLength(1)
    })
  })
})
