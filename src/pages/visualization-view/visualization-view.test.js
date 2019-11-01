import { shallow } from "enzyme"
import { Tab, Tabs, TabPanel } from "react-tabs"

import VisualizationView from "./visualization-view"
import QueryView from "../query-view"
import ChartView from "../chart-view"
import ErrorComponent from "../../components/generic-elements/error-component"
import AutoAnchoringPopover from "../../components/generic-elements/auto-anchoring-popover"
import SaveIndicator from "../../components/generic-elements/save-indicator"

const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementationOnce(f => f())
  useEffect.mockImplementationOnce(f => f())
  useEffect.mockImplementationOnce(f => f())
  useEffect.mockImplementationOnce(f => f())
}

describe("visualization view", () => {
  let subject, resetHandler, loadHandler, saveHandler

  const id = '123456'
  const query = 'select * from stuff'
  const title = 'my query'

  beforeEach(() => {
    resetHandler = jest.fn()
    loadHandler = jest.fn()
    saveHandler = jest.fn()
  })

  describe('when visualization id is not provided in the URL', () => {
    beforeEach(() => {
      resetHandler.mockImplementation(() => true)
      runUseEffect()
      subject = createSubject({ match: { params: {} }, reset: resetHandler, load: loadHandler })
    })

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    })

    it("does not call the load function", () => {
      expect(loadHandler).not.toHaveBeenCalled()
    })

    it("lands on the query view page", () => {
      expect(subject.find(Tabs).props().defaultIndex).toEqual(1)
    })
  })

  describe('when visualization id is provided in the URL and nothing else', () => {
    beforeEach(() => {
      runUseEffect()
      subject = createSubject({ match: { params: { id } }, reset: resetHandler, load: loadHandler })
    })

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    })

    it("calls the load function", () => {
      expect(loadHandler).toHaveBeenCalledWith(id)
    })

    it("lands on the chart visualization page", () => {
      expect(subject.find(Tabs).props().defaultIndex).toEqual(0)
    })
  })

  describe('when visualization is loaded with no errors', () => {
    beforeEach(() => {
      subject = createSubject()
    })

    it("has two tabs", () => {
      expect(subject.find(Tab).length).toEqual(2)
    })

    it("has two tab panels", () => {
      expect(subject.find(TabPanel).length).toEqual(2)
    })

    it("has a visualization view component", () => {
      expect(subject.find(ChartView).length).toEqual(1)
    })

    it("has a query view component", () => {
      expect(subject.find(QueryView).length).toEqual(1)
    })
  })

  describe("when visualization has failed to load", () => {
    beforeEach(() => {
      subject = createSubject({ isLoadFailure: true })
    })

    it("shows an error element", () => {
      expect(subject.find(ErrorComponent)).toHaveLength(1)
    })

    it("does not have a visualization view component", () => {
      expect(subject.find(ChartView).length).toEqual(0)
    })

    it("does not have a query view component", () => {
      expect(subject.find(QueryView).length).toEqual(0)
    })
  })

  describe("when visualization is not able to be saved", () => {
    beforeEach(() => {
      subject = createSubject({ isSaveable: false })
    })

    it("disables the save button", () => {
      expect(subject.find('.save-icon').props().disabled).toBeTruthy()
    })
  })

  describe("when visualization is able to be saved", () => {
    beforeEach(() => {
      subject = createSubject({ isSaveable: true })
    })

    it("enables the save button", () => {
      expect(subject.find('.save-icon').props().disabled).toBeFalsy()
    })
  })

  describe("when visualization save button is clicked to update a previously saved visualization", () => {
    beforeEach(() => {
      subject = createSubject({ isSaving: true, query, title, save: saveHandler, updateQuery: true })
      
      subject.find(".save-icon").simulate("click")
    })

    it("displays the saving status popover", () => {
      expect(subject.find(AutoAnchoringPopover).props().open).toEqual(true)
    })

    it('sets the saving indicator', () => {
      expect(subject.find(SaveIndicator).length).toBe(1)
    })
  })

  describe("when visualization save icon is clicked to save a new visualization", () => {
    beforeEach(() => {
      subject = createSubject({ isSaving: false, query, save: saveHandler})

      subject.find(".save-icon").simulate("click")
    })

    it("displays the title prompt popover", () => {
      expect(subject.find(AutoAnchoringPopover).props().open).toEqual(true)
      expect(subject.find(".prompt").length).toEqual(1)
      expect(subject.find(".save-button").length).toEqual(1)
    })
 
    it("disables the save button when no query title has been set", () => {
      expect(subject.find(".save-button").props().disabled).toBeTruthy()
    })

    it("sends create visualization event with the query and a query title", () => {
      subject.find(".prompt").simulate("change", {target: { value: 'Query Title'}})
      subject.find(".save-button").simulate("click")
      expect(saveHandler).toHaveBeenCalledWith('Query Title', query)
    })
  })


  describe('when save succeeds', () => {
    beforeEach(() => {
      subject = createSubject({ isSaveSuccess: true, id, updateQuery: true })
      subject.find(".save-icon").simulate("click")
    })

    it('indicates the save succeeded', () => {
      expect(subject.find(SaveIndicator).props().success).toBe(true)
      expect(subject.find(SaveIndicator).props().failure).toBe(false)
      expect(subject.find(SaveIndicator).props().saving).toBe(false)
    })

    it('displays a generated link', () => {
      expect(subject.find(SaveIndicator).props().linkUrl).toBe(`/visualization/${id}`)
    })
  })

  describe('when save fails', () => {
    beforeEach(() => {
      subject = createSubject({ isSaveFailure: true, id, updateQuery: true })
      subject.find(".save-icon").simulate("click")
    })

    it('indicates the save failed', () => {
      expect(subject.find(SaveIndicator).props().failure).toBe(true)
      expect(subject.find(SaveIndicator).props().success).toBe(false)
      expect(subject.find(SaveIndicator).props().saving).toBe(false)
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
    updateQuery: false,
    match: { params: {} },
    history: { push: jest.fn() }
  }
  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(
    <VisualizationView
      reset={propsWithDefaults.reset}
      load={propsWithDefaults.load}
      save={propsWithDefaults.save}
      update={propsWithDefaults.update}
      id={propsWithDefaults.id}
      query={propsWithDefaults.query}
      title={propsWithDefaults.title}
      isLoadFailure={propsWithDefaults.isLoadFailure}
      isSaving={propsWithDefaults.isSaving}
      isSaveSuccess={propsWithDefaults.isSaveSuccess}
      isSaveFailure={propsWithDefaults.isSaveFailure}
      isSaveable={propsWithDefaults.isSaveable}
      updateQuery={propsWithDefaults.updateQuery}
      match={propsWithDefaults.match}
      history={propsWithDefaults.history}
    />
  )
}
