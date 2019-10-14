import { shallow } from "enzyme"
import { Tab, TabPanel } from "react-tabs"

import VisualizationView from "./visualization-view"
import QueryView from "../query-view"
import ChartView from "../chart-view"
import LoadingElement from "../../components/generic-elements/loading-element"
import ErrorComponent from "../../components/generic-elements/error-component"
import AutoAnchoringPopover from "../../components/auto-anchoring-popover"

const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementationOnce(f => f())
}

describe("visualization view", () => {
  let subject

  describe('when visualization id is not provided along with nothing else', () => {
    const resetHandler = jest.fn(() => true)
    const loadHandler = jest.fn()

    beforeEach(() => {
      runUseEffect()
      subject = shallow(
        <VisualizationView
          match={{ params: {} }}
          isLoading={false}
          isLoadFailure={false}
          query=''
          load={loadHandler}
          reset={resetHandler}
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

  xdescribe('when visualization id is provided and nothing else', () => {
    const resetHandler = jest.fn()
    const loadHandler = jest.fn()

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
    let subject

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={true}
          isLoadFailure={false}
          title='my first visualization'
          query='SELECT the_thing FROM the_table'
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

  describe("when visualization is in error", () => {
    let subject

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isLoadFailure={true}
          title='my first visualization'
          query='SELECT the_thing FROM the_table'
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
    let subject

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isLoadFailure={false}
          isSaveable={false}
          title='my first visualization'
          query=''
        />
      )
    })
  
    it("disables the save button", () => {
      expect(subject.find('.save-button').props().disabled).toBeTruthy()
    })
  })

  describe("when visualization is able to be saved", () => {
    let subject
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
        />
      )
    })
  
    it("enables the save button", () => {
      expect(subject.find('.save-button').props().disabled).toBeFalsy()
    })

    it("send create visualization event with the query and a placeholder title on click of the save button", () => {
      subject.find('.save-button').simulate('click')

      expect(saveHandler).toHaveBeenCalledWith(title, query)
    })
  })

  describe("when visualization is saving", () => {
    let subject
    const id = 'abcdefg'
    const query = 'select * from saved_stuff'
    const finishSavingHandler = jest.fn()

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id } }}
          isSaving={true}
          query={query}
          id={id}
          finishSaving={finishSavingHandler}
        />
      )
    })

    it("displays the saving status popover", () => {
      expect(subject.find(AutoAnchoringPopover).props().open).toEqual(true)
    })

    it("the popover is configured to finish up the save session when closed", () => {
      const closeHandler = subject.find(AutoAnchoringPopover).props().onClose

      expect(closeHandler).toEqual(finishSavingHandler)
    })
  })

  describe("when visualization is not saving", () => {
    let subject
    const id = 'abcdefg'
    const query = 'select * from saved_stuff'

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id } }}
          isSaving={false}
          query={query}
          id={id}
        />
      )
    })

    it("does not display the saving status popover", () => {      
      expect(subject.find(AutoAnchoringPopover).props().open).toEqual(false)
    })
  })
})


