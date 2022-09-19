import { shallow } from 'enzyme'
import { Tab, Tabs, TabPanel } from 'react-tabs'

import VisualizationView from './visualization-view'
import QueryView from '../query-view'
import ChartView from '../chart-view'
import ErrorComponent from '../../components/generic-elements/error-component'
import VisualizationSaveMenuItem from '../../components/visualization-save-menu-item'
import VisualizationListMenuItem from '../../components/visualization-list-menu-item'

const runUseEffect = () => {
  const useEffect = jest.spyOn(React, 'useEffect')
  useEffect.mockImplementationOnce(f => f())
  useEffect.mockImplementationOnce(f => f())
  useEffect.mockImplementationOnce(f => f())
  useEffect.mockImplementationOnce(f => f())
}

describe('visualization view', () => {
  let subject, resetHandler, loadHandler

  const id = '123456'

  beforeEach(() => {
    resetHandler = jest.fn()
    loadHandler = jest.fn()
  })

  describe('when visualization id is not provided in the URL', () => {
    beforeEach(() => {
      resetHandler.mockImplementation(() => true)
      runUseEffect()
      subject = createSubject({ match: { params: {} }, reset: resetHandler, load: loadHandler })
    })

    it('does not call the load function', () => {
      expect(loadHandler).not.toHaveBeenCalled()
    })

    it('lands on the query view page', () => {
      expect(subject.find(Tabs).props().selectedIndex).toEqual(0)
    })
  })

  describe('when visualization id from state is provided', () => {
    it('pushes a path with the new id into history', () => {
      const history = { push: jest.fn() }

      runUseEffect()
      subject = createSubject({ history, id })

      expect(history.push).toHaveBeenCalledWith(`/visualization/${id}`)
    })
  })

  describe('when visualization id is provided in the URL and nothing else', () => {
    beforeEach(() => {
      runUseEffect()
      subject = createSubject({ match: { params: { id } }, reset: resetHandler, load: loadHandler })
    })

    it('calls the load function', () => {
      expect(loadHandler).toHaveBeenCalledWith(id)
    })

    it('lands on the chart visualization page', () => {
      expect(subject.find(Tabs).props().selectedIndex).toEqual(1)
    })
  })

  describe('when visualization id from URL matches visualization id from state', () => {
    let history
    beforeEach(() => {
      runUseEffect()
      history = { push: jest.fn() }
      subject = createSubject({ history, match: { params: { id } }, load: loadHandler, id })
    })

    it('does not call the load function', () => {
      expect(loadHandler).not.toHaveBeenCalled()
    })

    it('does not push the id onto the URL', () => {
      expect(history.push).not.toHaveBeenCalled()
    })
  })

  describe('when visualization is loaded with no errors', () => {
    beforeEach(() => {
      subject = createSubject()
    })

    it('has two tabs', () => {
      expect(subject.find(Tab).length).toEqual(2)
    })

    it('has two tab panels', () => {
      expect(subject.find(TabPanel).length).toEqual(2)
    })

    it('has a chart view component', () => {
      expect(subject.find(ChartView).length).toEqual(1)
    })

    it('does not instruct the chart view to auto execute the query', () => {
      expect(subject.find(ChartView).props().shouldAutoExecuteQuery).toBeFalsy()
    })

    it('has a query view component', () => {
      expect(subject.find(QueryView).length).toEqual(1)
    })

    it('does not instruct the query view to auto execute the query', () => {
      expect(subject.find(QueryView).props().shouldAutoExecuteQuery).toBeFalsy()
    })
  })

  describe('when visualization has failed to load', () => {
    beforeEach(() => {
      subject = createSubject({ isLoadFailure: true })
    })

    it('shows an error element', () => {
      expect(subject.find(ErrorComponent)).toHaveLength(1)
    })

    it('does not have a visualization view component', () => {
      expect(subject.find(ChartView).length).toEqual(0)
    })

    it('does not have a query view component', () => {
      expect(subject.find(QueryView).length).toEqual(0)
    })
  })

  describe('visualization view has save and user page icon in the tabs header', () => {
    beforeEach(() => {
      subject = createSubject({ auth: { isAuthenticated: true } })
    })

    it('displays the save icon in the header with expected props', () => {
      expect(subject.find(VisualizationSaveMenuItem)).toHaveLength(1)
      expect(subject.find(VisualizationSaveMenuItem).props().isAuthenticated).toBe(true)
    })

    it('displays the user page icon in the header with expected props', () => {
      expect(subject.find(VisualizationListMenuItem)).toHaveLength(1)
      expect(subject.find(VisualizationListMenuItem).props().isAuthenticated).toBe(true)
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    reset: jest.fn(),
    load: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    id: undefined,
    query: undefined,
    title: undefined,
    isLoadFailure: false,
    isSaving: false,
    isSaveSuccess: false,
    isSaveFailure: false,
    isSaveable: false,
    match: { params: {} },
    history: { push: jest.fn() },
    chart: {},
    auth: { isAuthenticated: false }
  }
  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<VisualizationView {...propsWithDefaults} />)
}
