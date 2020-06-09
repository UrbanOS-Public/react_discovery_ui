import { shallow } from "enzyme";

import QueryView from "./query-view";
import QueryForm from "../../components/query-form";
import LoadingElement from "../../components/generic-elements/loading-element";
import ReactTable from "react-table";

// Currently, shallow rendering is not compatible with React hooks.
// We've utilized a strategy found here https://blog.carbonfive.com/2019/08/05/shallow-testing-hooks-with-enzyme/
// which should become unneccessary in the near future
const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect");
  useEffect.mockImplementationOnce(f => f());
};

describe("query view", () => {
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
          .find(QueryForm)
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
      .find(QueryForm)
      .props()
      .executeQuery("SELECT * FROM sky");
    subject.setProps({ isQueryLoading: true });

    expect(subject.find(LoadingElement).length).toEqual(0);
  })

  it('does not automatically execute the query when instructed not to', () => {
    runUseEffect();
    const executeQuery = jest.fn()

    subject = createSubject({ shouldAutoExecuteQuery: false, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(0)
  })

  it('automatically executes the query when instructed to', () => {
    runUseEffect();
    const executeQuery = jest.fn()

    subject = createSubject({ shouldAutoExecuteQuery: true, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(1)
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
    shouldAutoExecuteQuery: false
  }
  const paramsWithDefaults = Object.assign({}, defaultParams, params)

  return shallow(<QueryView {...paramsWithDefaults}/>)
}
