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
    let cancelCallback = jest.fn()
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={queryCallback}
          defaultQuery={defaultQuery}
          hasUserSubmittedQuery={true}
          onCancelQuery={cancelCallback}
          isLoading />)
    })

    test('shows loading component', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })

    test('hides success and error text', () => {
      expect(subject.find('.success-message').length).toEqual(0)
      expect(subject.find('.error-message').length).toEqual(0)
    })

    test('sets the cancel button to enabled', () => {
      const button = getButton(subject, 'Cancel')
      expect(button.hasClass('disabled')).toBeFalsy()
    })

    test('sets the submit button to disabled', () => {
      const button = getButton(subject, 'Submit')
      expect(button.hasClass('disabled')).toBeTruthy()
    })

    test('cancelling the query invokes a provided cancel handler', () => {
      getButton(subject, 'Cancel').simulate('click')
      expect(cancelCallback).toHaveBeenCalled()
    })
  })

  describe('after cancel button click', () => {
    beforeEach(() => {
      const cancelCallback = jest.fn()
      const queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          onQueryDataset={queryCallback}
          defaultQuery={defaultQuery}
          hasUserSubmittedQuery={true}
          onCancelQuery={cancelCallback}
          isLoading={false} />)

      getButton(subject, 'Cancel').simulate('click')
      subject.setProps({ queryFailureMessage: 'User has cancelled query.' })
    })

    test('cancelling the query sets the cancelled state to true', () => {
      expect(subject.find('.error-message').text()).toEqual('Your query has been stopped')
    })

    test('resubmitting the query sets the cancelled state to false', () => {
      getButton(subject, 'Submit').simulate('click')
      subject.setProps({ isLoading: true })

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

    test('defaults the cancel button to disabled', () => {
      const button = getButton(subject, 'Cancel')
      expect(button.hasClass('disabled')).toBeTruthy()
    })

    test('defaults the submit button to enabled', () => {
      const button = getButton(subject, 'Submit')
      expect(button.hasClass('disabled')).toBeFalsy()
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

      getButton(subject, 'Submit').simulate('click')
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

function getButton(subject, text) {
  const isButton = x => x.type() === 'button' && x.text() === text
  return subject.findWhere(isButton)
}
