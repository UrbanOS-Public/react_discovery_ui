import { shallow } from "enzyme"
import { Tab, TabPanel } from "react-tabs"

import VisualizationView from "./visualization-view"
import QueryView from "../query-view"
import ChartView from "../chart-view"
import LoadingElement from "../../components/generic-elements/loading-element"
import ErrorComponent from "../../components/generic-elements/error-component"

const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementationOnce(f => f())
}

describe("visualization view", () => {
  let subject

  describe('when visualization id is not provided along with nothing else', () => {
    const resetHandler = jest.fn(() => true)
    const getHandler = jest.fn()

    beforeEach(() => {
      runUseEffect()
      subject = shallow(
        <VisualizationView
          match={{ params: {} }}
          isLoading={false}
          isError={false}
          query=''
          getVisualization={getHandler}
          resetVisualization={resetHandler}
        />
      )
    })

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    })

    it("does not call the get function", () => {
      expect(getHandler).not.toHaveBeenCalled()
    })
  })

  describe('when visualization id is provided and nothing else', () => {
    const resetHandler = jest.fn(() => true)
    const getHandler = jest.fn()

    const id = '123456'

    beforeEach(() => {
      runUseEffect()
      subject = shallow(
        <VisualizationView
          match={{ params: { id} }}
          isLoading={false}
          isError={false}
          query=''
          getVisualization={getHandler}
          resetVisualization={resetHandler}
        />
      )
    })

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    })

    it("calls the get function", () => {
      expect(getHandler).toHaveBeenCalledWith(id)
    })
  })

  describe('when visualization is loaded with no errors', () => {
    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isSaving={false}
          isError={false}
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

    it("does not display a saving spinner", () => {
      expect(subject.find('.saving-spinner').length).toEqual(0)
    })
  })

  describe("when visualization is loading", () => {
    let subject

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={true}
          isError={false}
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
          isError={true}
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
          isError={false}
          isSavable={false}
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
    const createHandler = jest.fn()
    const title = 'Placeholder Title'
    const query = 'select * from stuff'

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          isLoading={false}
          isError={false}
          isSavable={true}
          createVisualization={createHandler}
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

      expect(createHandler).toHaveBeenCalledWith(title, query)
    })
  })

  describe("when visualiation is saving", () => {
    let subject

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          isSaving={true}
        />
      )
    })

    it("displays a spinner to indicate that saving is in progress", () => {
      expect(subject.find('.saving-spinner').length).toEqual(1)
    })
  })

  describe("when visualiation is saved", () => {
    let subject
    const id = 'abcdefg'
    const query = 'select * from saved_stuff'

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          isSaved={true}
          query={query}
          id={id}
        />
      )
    })

    it("displays a small visualization link dialog", () => {
      expect(subject.find('.saved-link-dialog').length).toEqual(1)
    })
  })
})


