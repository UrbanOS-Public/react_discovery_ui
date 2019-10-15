import { mount } from 'enzyme'
import ReactTooltip from 'react-tooltip'
import DatasetQuery from './dataset-query'
import LoadingElement from '../generic-elements/loading-element';
import { recommendations } from '../../../test-helpers/recommendations'
import { act } from 'react-dom/test-utils';


let subject, queryCallback, updateCallback

describe('DatasetQuery', () => {
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

  describe('on success', () => {
    beforeEach(() => {
      subject = createSubject({ isQueryLoading: false, isQueryLoaded: true, userHasInteracted: true })
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

  describe('recommendation-list', () => {
    describe('with data', () => {
      beforeEach(() => {
        subject = createSubject()
      })

      test('returns urls for each recommended dataset', () => {
        expect(subject.find('.recommended-dataset').length).toEqual(recommendations.length)
      })

      test('shows tooltips with table names for copy buttons', () => {
        expect(subject.contains(ReactTooltip)).toBeTruthy()
        const tooltips = subject.find(ReactTooltip).map((elem) => elem.text())
        expect(tooltips).toContain(`Copy table name '${recommendations[0].systemName}'`)
      })

      test('copy button changes tooltip text to "Copied" when it is clicked', () => {
        subject.find('.copy-table-name-icon').at(0).simulate('click')
        expect(subject.find(ReactTooltip).at(0).text()).toEqual("Copied!")
      })

      test('tooltip changes back to table name text after it disapears', () => {
        subject.find('.copy-table-name-icon').at(0).simulate('click')
        act(() => { subject.find(ReactTooltip).at(0).prop('afterHide')() })
        expect(subject.find(ReactTooltip).at(0).text()).toEqual(`Copy table name '${recommendations[0].systemName}'`)
      })
    })

    describe('recommendation-list without data', () => {
      test('does not render', () => {
        subject = createSubject({ recommendations: undefined })
        expect(subject.contains('.recommendation-list')).toBeFalsy()
      })
    })
  })
})

function createSubject(params) {
  const defaults = {
    queryText: "SELECT * FROM sky",
    recommendations: recommendations,
    queryFailureMessage: "",
    userHasInteracted: false,
    isQueryLoading: false,
    isQueryLoaded: true,
    executeQuery: queryCallback ? queryCallback : jest.fn(),
    cancelQuery: jest.fn(),
    setQueryText: updateCallback ? updateCallback : jest.fn(),
    setUserInteracted: jest.fn()
  }

  const paramsWithDefaults = Object.assign({}, defaults, params)

  return mount(
    <DatasetQuery
      queryText={paramsWithDefaults.queryText}
      recommendations={paramsWithDefaults.recommendations}
      queryFailureMessage={paramsWithDefaults.queryFailureMessage}
      userHasInteracted={paramsWithDefaults.userHasInteracted}
      isQueryLoading={paramsWithDefaults.isQueryLoading}
      isQueryLoaded={paramsWithDefaults.isQueryLoaded}
      executeQuery={paramsWithDefaults.executeQuery}
      cancelQuery={paramsWithDefaults.cancelQuery}
      setQueryText={paramsWithDefaults.setQueryText}
      setUserInteracted={paramsWithDefaults.setUserInteracted}
    />)
}

function getButton(subject, text) {
  const isButton = x => x.type() === 'button' && x.text() === text
  return subject.findWhere(isButton)
}
