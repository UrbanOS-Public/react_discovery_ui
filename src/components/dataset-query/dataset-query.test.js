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
          executeQuery={queryCallback}
          queryText={defaultQuery}
          isQueryLoading={true} />)
    })

    test('shows loading component', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })

  })

  describe('on user editing query', () => {
    let updateCallback
    beforeEach(() => {
      updateCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          executeQuery={jest.fn()}
          setQueryText={updateCallback}
          queryText={defaultQuery}
          isQueryLoading />)
      subject.find('textarea').simulate('blur')
    })

    test('triggers query update callback', () => {
      expect(updateCallback).toHaveBeenCalled()
    })
  })

  describe('on user submitted running query', () => {
    let cancelCallback = jest.fn()
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          executeQuery={queryCallback}
          cancelCallback={cancelCallback}
          setUserInteracted={jest.fn()}
          queryText={defaultQuery}
          cancelQuery={cancelCallback}
          isQueryLoading />)
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
      expect(button.find('[disabled=false]').length).toEqual(1)
    })

    test('sets the submit button to disabled', () => {
      const button = getButton(subject, 'Submit')
      expect(button.find('[disabled=true]').length).toEqual(1)
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
          executeQuery={queryCallback}
          queryText={defaultQuery}
          cancelQuery={cancelCallback}
          isQueryLoading={true}
          setUserInteracted={jest.fn()}
          />)

      getButton(subject, 'Cancel').simulate('click')
      subject.setProps({ queryFailureMessage: 'Your query has been stopped.' })
    })

    test('cancelling the query sets the cancelled state to true', () => {
      subject.setProps({ isQueryLoading: false })
      expect(subject.find('.error-message').text()).toEqual('Your query has been stopped.')
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
          executeQuery={queryCallback}
          isQueryLoading={false}
          queryText={defaultQuery}
        />)
    })

    test('do not show success text', () => {
      expect(subject.find('.success-message').length).toEqual(0)
    })

    test('defaults the query input field to use the default query', () => {
      expect(subject.find('textarea').render().text()).toEqual(defaultQuery)
    })

    test('defaults the cancel button to disabled', () => {
      const button = getButton(subject, 'Cancel')
      expect(button.find('[disabled=true]').length).toEqual(1)
    })

    test('defaults the submit button to enabled', () => {
      const button = getButton(subject, 'Submit')
      expect(button.find('[disabled=false]').length).toEqual(1)
    })

    test('disables cancel button', () => {
      const button = getButton(subject, 'Cancel')
      expect(button.find('[disabled=true]').length).toEqual(1)
    })
  })

  describe('on success', () => {
    beforeEach(() => {
      queryCallback = jest.fn()
      subject = mount(
        <DatasetQuery
          executeQuery={queryCallback}
          isQueryLoading={false}
          queryText={defaultQuery}
          userHasInteracted={true}
          setUserInteracted={jest.fn()}
      />)
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
          executeQuery={jest.fn()}
          queryText={defaultQuery}
          queryFailureMessage='the bad thing happened'
          isQueryLoading={false} />)
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
