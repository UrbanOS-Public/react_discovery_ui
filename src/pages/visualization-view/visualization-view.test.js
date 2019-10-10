import { shallow } from "enzyme";
import { Tab, TabPanel } from "react-tabs";

import VisualizationView from "./visualization-view";
import QueryView from "../query-view";
import ChartView from "../chart-view";
import LoadingElement from "../../components/generic-elements/loading-element";

const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect")
  useEffect.mockImplementationOnce(f => f())
}

describe("visualization view", () => {
  let subject;

  describe('when visualization id is not provided along with nothing else', () => {
    const resetHandler = jest.fn(() => true)
    const getHandler = jest.fn()

    beforeEach(() => {
      runUseEffect()
      subject = shallow(
        <VisualizationView
          match={{ params: {} }}
          visualization={{
            loading: false,
            error: false
          }}
          query=''
          getVisualization={getHandler}
          resetVisualization={resetHandler}
        />
      );
    });

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    });

    it("does not call the get function", () => {
      expect(getHandler).not.toHaveBeenCalled()
    });
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
          visualization={{
            loading: false,
            error: false
          }}
          query=''
          getVisualization={getHandler}
          resetVisualization={resetHandler}
        />
      );
    });

    it("calls the reset function", () => {
      expect(resetHandler).toHaveBeenCalled()
    });

    it("calls the get function", () => {
      expect(getHandler).toHaveBeenCalledWith(id)
    });
  })

  describe('when visualization is loaded with no errors', () => {
    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          visualization={{
            id: "123456",
            title: "my first visualization",
            query: 'SELECT the_original_query FROM the_api',
            loading: false,
            error: false
          }}
          query='a query'
        />
      );
    });

    it("has two tabs", () => {
      expect(subject.find(Tab).length).toEqual(2);
    });

    it("has two tab panels", () => {
      expect(subject.find(TabPanel).length).toEqual(2);
    });

    it("has a visualization view component", () => {
      expect(subject.find(ChartView).length).toEqual(1);
    });

    it("has a query view component", () => {
      expect(subject.find(QueryView).length).toEqual(1);
    })
  })

  describe("when visualization is loading", () => {
    let subject

    beforeEach(() => {
      subject = shallow(
        <VisualizationView
          match={{ params: { id: "123456" } }}
          visualization={{
            loading: true,
            id: "123456",
            title: "my first visualization",
            query: 'SELECT the_original_query FROM the_api',
            error: false
          }}
          query='a query'
        />
      )
    })
  
    it("shows a loading element", () => {
      expect(subject.find(LoadingElement)).toHaveLength(1)
    })
    
    it("does not have a visualization view component", () => {
      expect(subject.find(ChartView).length).toEqual(0);
    });

    it("does not have a query view component", () => {
      expect(subject.find(QueryView).length).toEqual(0);
    })
  })
})


