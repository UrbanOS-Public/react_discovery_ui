import { shallow } from "enzyme"
import { Tab, TabPanel } from "react-tabs"

import VisualizationView from "./visualization-view"
import QueryView from "../query-view"
import ChartView from "../chart-view"
import LoadingElement from "../../components/generic-elements/loading-element"
import ErrorComponent from "../../components/generic-elements/error-component"
import AutoAnchoringPopover from "../../components/generic-elements/auto-anchoring-popover"

const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementation(f => f())
}

describe("visualization view", () => {
  let subject, resetHandler, loadHandler, saveHandler

  beforeEach(() => {
    resetHandler = jest.fn()
    loadHandler = jest.fn()
    saveHandler = jest.fn()
  })

  describe('when visualization id is not provided along with nothing else', () => {
    beforeEach(() => {
      resetHandler.mockImplementation(() => true)
      runUseEffect()
      subject = shallow(
        <VisualizationView
          match={{ params: {} }}
          isLoading={false}
          isLoadFailure={false}
          query=''
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
    })

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    })

    it("does not call the get function", () => {
      expect(loadHandler).not.toHaveBeenCalled()
    })
  })

  describe('when visualization id is provided and nothing else', () => {
    const id = '123456'

    beforeEach(() => {
      runUseEffect()
      subject = shallow(
        <VisualizationView
          match={{ params: { id} }}
          isLoading={false}
          isLoadFailure={false}
          query=''
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
    })

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    })

    it("calls the load function", () => {
      expect(loadHandler).toHaveBeenCalledWith(id)
    })
  })

  describe('when visualization is loaded with no errors', () => {
    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isSaving={false}
          isLoadFailure={false}
          title='my first visualization'
          query='SELECT the_thing FROM the_table'
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
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

  describe("when visualization is loading", () => {
    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={true}
          isLoadFailure={false}
          title='my first visualization'
          query='SELECT the_thing FROM the_table'
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
    })

    it("shows a loading element", () => {
      expect(subject.find(LoadingElement)).toHaveLength(1)
    })

    it("does not have a visualization view component", () => {
      expect(subject.find(ChartView).length).toEqual(0)
    })

    it("does not have a query view component", () => {
      expect(subject.find(QueryView).length).toEqual(0)
    })
  })

  describe("when visualization has failed to load", () => {
    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isLoadFailure={true}
          title='my first visualization'
          query='SELECT the_thing FROM the_table'
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
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
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isLoadFailure={false}
          isSaveable={false}
          title='my first visualization'
          query=''
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
    })

    it("disables the save button", () => {
      expect(subject.find('.save-button').props().disabled).toBeTruthy()
    })
  })

  describe("when visualization is able to be saved", () => {
    const saveHandler = jest.fn()
    const title = 'Placeholder Title'
    const query = 'select * from stuff'

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isLoadFailure={false}
          isSaveable={true}
          save={saveHandler}
          title='my first visualization'
          query='select * from stuff'
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )
    })

    it("enables the save button", () => {
      expect(subject.find('.save-button').props().disabled).toBeFalsy()
    })
  })

  describe("when visualization save button is clicked", () => {
    const id = 'abcdefg'
    const title = 'Placeholder Title'
    const query = 'select * from stuff'

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id } }}
          isSaving={true}
          query={query}
          id={id}
          load={loadHandler}
          reset={resetHandler}
          save={saveHandler}
        />
      )

      subject.find(".save-button").simulate("click")
    })

    it("displays the saving status popover", () => {
      expect(subject.find(AutoAnchoringPopover).props().open).toEqual(true)
    })

    it("send create visualization event with the query and a placeholder title on click of the save button", () => {
      expect(saveHandler).toHaveBeenCalledWith(title, query)
    })
  })
})


