import { mount } from 'enzyme'
import DatasetQuery from './dataset-query'
import LoadingElement from '../generic-elements/loading-element';

describe('DatasetQuery', () => {
  let subject, queryCallback
  const defaultQuery = "SELECT * FROM sky"

  describe('on initial running query', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={queryCallback}
          defaultQuery={defaultQuery}
          hasUserSubmittedQuery={false}
          isLoading />)
    })

    test('shows loading component', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })

  })

  describe('on user submitted running query', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={queryCallback}
          defaultQuery={defaultQuery}
          hasUserSubmittedQuery={true}
          isLoading />)
    })

    test('shows loading component', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })

    test('hides success and error text', () => {
      expect(subject.find('.success-message').length).toEqual(0)
      expect(subject.find('.error-message').length).toEqual(0)
    })
  })

  describe('after initial load', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={queryCallback}
          isLoading={false}
          defaultQuery={defaultQuery}
          hasUserSubmittedQuery={false} />)
    })

    test('do not show success text', () => {
      expect(subject.find('.success-message').length).toEqual(0)
    })

    test('defaults the query input field to use the default query', () => {
      expect(subject.find('textarea').render().text()).toEqual(defaultQuery)
    })
  })

  describe('on success', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={queryCallback}
          isLoading={false}
          defaultQuery={defaultQuery}
          hasUserSubmittedQuery={true} />)
    })

    test('calls the submit handler on click of the submit button', () => {
      const newText = 'SELECT * FROM great_org__awesome_dataset LIMIT 55'
      const queryInput = subject.find('textarea')
      queryInput.instance().value = newText;
      queryInput.simulate('change');

      subject.find('button').simulate('click')
      expect(queryCallback).toHaveBeenCalledWith(newText)
    })


    test('hides loading element', () => {
      expect(subject.find(LoadingElement).length).toEqual(0)
    })

    test('shows success text', () => {
      expect(subject.find('.success-message').length).toEqual(1)
    })
  })

  describe('on failure', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={jest.fn()}
          defaultQuery={defaultQuery}
          queryFailureMessage='the bad thing happened'
          hasUserSubmittedQuery={false}
          isLoading={false} />)
    })

    test('shows error message', () => {
      expect(subject.find('.error-message')).toHaveLength(1)
    })

    test('hides success text', () => {
      expect(subject.find('.success-message').length).toEqual(0)
    })

    test('hides loading element', () => {
      expect(subject.find(LoadingElement).length).toEqual(0)
    })
  })
})
