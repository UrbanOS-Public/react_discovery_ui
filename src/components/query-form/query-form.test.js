import { mount } from 'enzyme'
import QueryForm from './query-form'
import { BrowserRouter as Router } from 'react-router-dom'
import LoadingElement from '../generic-elements/loading-element'
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
    const cancelCallback = jest.fn()
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

    test('sets the download button to disabled', () => {
      const button = subject.find('.download-dropdown button')
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
      subject.setProps({ queryFailureMessage: 'Query cancelled by user.' })
    })

    test('cancelling the query sets the cancelled state to true', () => {
      subject.setProps({ isQueryLoading: false })
      expect(subject.find('.error-message').text()).toContain('Query cancelled by user.')
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
      expect(subject.find('textarea').render().text()).toEqual('SELECT * FROM sky')
    })

    test('defaults the cancel button to disabled', () => {
      const button = getButton(subject, 'Cancel')
      expect(button.find('[disabled=true]').length).toEqual(1)
    })

    test('defaults the submit button to enabled', () => {
      const button = getButton(subject, 'Submit')
      expect(button.find('[disabled=false]').length).toEqual(1)
    })

    test('defaults the download button to enabled', () => {
      const button = subject.find('.download-dropdown button')
      expect(button.find('[disabled=false]').length).toEqual(1)
    })

    test('disables cancel button', () => {
      const button = getButton(subject, 'Cancel')
      expect(button.find('[disabled=true]').length).toEqual(1)
    })
  })

  describe('on success', () => {
    beforeEach(() => {
      subject = createSubject({ isQueryLoading: false, isQueryLoaded: true, isQueryDataAvailable: true })
    })

    test('calls the submit handler on click of the submit button', () => {
      const newText = 'SELECT * FROM great_org__awesome_dataset LIMIT 55'
      const queryInput = subject.find('textarea')
      queryInput.instance().value = newText
      queryInput.simulate('blur')

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

  describe('used datasets', () => {
    let subject
    beforeEach(() => {
      const fakeDataset1 = { org: 'org_name_1', name: 'data_name_1', title: 'Dataset 1', id: '123' }
      const fakeDataset2 = { org: 'org_name_2', name: 'data_name_2', title: 'Dataset 2', id: '456' }
      const datasetReferences = { [fakeDataset1.id]: fakeDataset1, [fakeDataset2.id]: fakeDataset2 }
      const usedDatasets = [fakeDataset1.id, fakeDataset2.id, 'no_ref']
      subject = createSubject({ usedDatasets, datasetReferences })
    })

    test('do not render if none are provided', () => {
      const subject_with_no_datasets = createSubject({ usedDatasets: undefined })
      expect(subject_with_no_datasets.exists('.used-datasets-section')).toBeFalsy()
    })

    test('shows the used datasets section', () => {
      expect(subject.exists('.used-datasets-section')).toBeTruthy()
    })

    test('renders a link per dataset with a reference', () => {
      const links = subject.find('.dataset-reference Link')
      expect(links.length).toEqual(2)
      expect(links.at(0).prop('to')).toEqual('/dataset/org_name_1/data_name_1')
      expect(links.at(0).text()).toEqual('Dataset 1')
      expect(links.at(1).prop('to')).toEqual('/dataset/org_name_2/data_name_2')
      expect(links.at(1).text()).toEqual('Dataset 2')
    })
  })
})

function createSubject(params) {
  const defaults = {
    queryText: 'SELECT * FROM sky',
    queryData: [],
    recommendations: recommendations,
    usedDatasets: [],
    datasetReferences: {},
    queryFailureMessage: '',
    isQueryDataAvailable: false,
    isQueryLoading: false,
    isQueryLoaded: true,
    executeQuery: queryCallback || jest.fn(),
    cancelQuery: jest.fn(),
    setQueryText: updateCallback || jest.fn()
  }

  const paramsWithDefaults = Object.assign({}, defaults, params)

  // This allows us to set properties on a component wrapped in a provider
  return mount(React.createElement(
    props => (
      <Router>
        <QueryForm {...props} />
      </Router>
    ),
    paramsWithDefaults)
  )
}

function getButton(subject, text) {
  const isButton = x => x.type() === 'button' && x.text() === text
  return subject.findWhere(isButton)
}
