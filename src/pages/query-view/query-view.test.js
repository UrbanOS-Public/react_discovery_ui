import { shallow } from "enzyme";

import QueryView from "./query-view";
import DatasetQuery from "../../components/dataset-query";
import LoadingElement from "../../components/generic-elements/loading-element";

// Currently, shallow rendering is not compatible with React hooks.
// We've utilized a strategy found here https://blog.carbonfive.com/2019/08/05/shallow-testing-hooks-with-enzyme/
// which should become unneccessary in the near future
const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect");
  useEffect.mockImplementationOnce(f => f());
};

describe("dataset visualization view", () => {
  let subject;

  describe("before load", () => {
    beforeEach(() => {
      subject = createSubject({ isQueryLoading: true, queryData: [] })
    });

    it("shows full page loading icon", () => {
      expect(subject.find(LoadingElement).length).toEqual(1);
    });
  });

  describe("after load", () => {
    let queryCallback;

    beforeEach(() => {
      runUseEffect();
      queryCallback = jest.fn()
      subject = createSubject({ executeQuery: queryCallback })
    });

    it("does not show full page loading icon", () => {
      expect(subject.find(LoadingElement).length).toEqual(0);
    });

    describe("executeQuery", () => {
      const newText = "SELECT * FROM great_org__awesome_dataset LIMIT 55";

      beforeEach(() => {
        subject
          .find(DatasetQuery)
          .props()
          .executeQuery(newText);
      })

      test("runs query", () => {
        expect(queryCallback).toHaveBeenCalledWith(newText);
      })
    })
  })

  it("should not render full page loading when user has submitted query", () => {
    runUseEffect();

    subject = createSubject({})

    subject
      .find(DatasetQuery)
      .props()
      .executeQuery("SELECT * FROM sky");
    subject.setProps({ isQueryLoading: true });

    expect(subject.find(LoadingElement).length).toEqual(0);
  })
});

function createSubject(params) {
  const defaultParams = {
    isQueryLoading: false,
    queryData: [{ data: {} }],
    executeQuery: jest.fn(),
    dataSources: { data: ["sources"] },
    cancelQuery: jest.fn(),
    setQueryText: jest.fn(),
    setUserInteracted: jest.fn()
  }
  const paramsWithDefaults = Object.assign({}, defaultParams, params)

  return shallow(<QueryView
    isQueryLoading={paramsWithDefaults.isQueryLoading}
    queryData={paramsWithDefaults.queryData}
    executeQuery={paramsWithDefaults.executeQuery}
    dataSources={paramsWithDefaults.dataSources}
    cancelQuery={paramsWithDefaults.cancelQuery}
    setQueryText={paramsWithDefaults.setQueryText}
    setUserInteracted={paramsWithDefaults.setUserInteracted}
  />)
}
