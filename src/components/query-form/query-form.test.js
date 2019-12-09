import { mount } from 'enzyme'
import QueryForm from './query-form'
import LoadingElement from '../generic-elements/loading-element';
import RecommendationList from '../recommendation-list'
import { recommendations } from '../../../test-helpers/recommendations'

let subject, queryCallback, updateCallback

describe('QueryForm', () => {
  describe('on initial running query', () => {
    beforeEach(() => {
      subject = createSubject({ isQueryLoaded: false, isQueryLoading: true })
    })

    test('shows loading component', () => {
      expect(subject.find(LoadingElement).length).toEqual(1)
    })
  })

  describe('on user editing query', () => {
    beforeEach(() => {
      updateCallback = jest.fn()
      subject = createSubject({ setQueryText: updateCallback })
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
      subject = createSubject({ executeQuery: queryCallback, isQueryLoading: true, cancelQuery: cancelCallback })
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
      subject = createSubject({ isQueryLoading: true })

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
      subject = createSubject({ isQueryLoaded: false })
    })

    test('do not show success text', () => {
      expect(subject.find('.success-message').length).toEqual(0)
    })

    test('defaults the query input field to use the default query', () => {
      expect(subject.find('textarea').render().text()).toEqual("SELECT * FROM sky")
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

  describe('when the query changes locally', () => {
    let queryInput
    beforeEach(() => {
      subject = createSubject({})

      queryInput = subject.find('textarea')
    })

    it('it expands the text area height to avoid scrolling', () => {
      const scrollHeight = 106
      let element = { scrollHeight, style: {}, value: 'some really long multi-line query' }

      queryInput.simulate('change', { target: element });

      expect(element.style.height).toBe(`${scrollHeight}px`)
    })

    it('does not adjust the test area height below the minimum height', () => {
      const scrollHeight = 105
      let element = { scrollHeight, style: {}, value: '' }

      queryInput.simulate('change', { target: element })

      expect(element.style.height).toBeFalsy()
    })
  })

  describe('on success', () => {
    beforeEach(() => {
      subject = createSubject({ isQueryLoading: false, isQueryLoaded: true, isQueryDataAvailable: true })
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
      subject = createSubject({ queryFailureMessage: 'the bad thing happened', isQueryLoaded: false })
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

  describe('recommendations', () => {
    test('do not render if none are provided', () => {
      subject = createSubject({ recommendations: undefined })
      expect(subject.exists(RecommendationList)).toBeFalsy()
    })
  })

  describe('recommendations', () => {
    test('do not render if none are available', () => {
      subject = createSubject({ recommendations: [] })
      expect(subject.exists('.recommendation-section')).toBeFalsy()
    })

    test('do not render if undefined', () => {
      subject = createSubject({ recommendations: undefined })
      expect(subject.exists('.recommendation-section')).toBeFalsy()
    })
  })
})

function createSubject(params) {
  const defaults = {
    queryText: "SELECT * FROM sky",
    recommendations: recommendations,
    queryFailureMessage: "",
    isQueryDataAvailable: false,
    isQueryLoading: false,
    isQueryLoaded: true,
    executeQuery: queryCallback ? queryCallback : jest.fn(),
    cancelQuery: jest.fn(),
    setQueryText: updateCallback ? updateCallback : jest.fn()
  }

  const paramsWithDefaults = Object.assign({}, defaults, params)

  return mount(
    <QueryForm
      queryText={paramsWithDefaults.queryText}
      recommendations={paramsWithDefaults.recommendations}
      queryFailureMessage={paramsWithDefaults.queryFailureMessage}
      isQueryDataAvailable={paramsWithDefaults.isQueryDataAvailable}
      isQueryLoading={paramsWithDefaults.isQueryLoading}
      isQueryLoaded={paramsWithDefaults.isQueryLoaded}
      executeQuery={paramsWithDefaults.executeQuery}
      cancelQuery={paramsWithDefaults.cancelQuery}
      setQueryText={paramsWithDefaults.setQueryText}
    />)
}

function getButton(subject, text) {
  const isButton = x => x.type() === 'button' && x.text() === text
  return subject.findWhere(isButton)
}
