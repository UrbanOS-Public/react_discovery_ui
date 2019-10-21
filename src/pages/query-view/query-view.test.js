import { shallow } from "enzyme";

import QueryView from "./query-view";
import DatasetQuery from "../../components/dataset-query";
import LoadingElement from "../../components/generic-elements/loading-element";
import ReactTable from "react-table";

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

  it('does not automatically execute the query when instructed not to', () => {
    runUseEffect();
    const executeQuery = jest.fn()

    subject = createSubject({ autoFetchQuery: false, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(0)
  })

  it('automatically executes the query when instructed to', () => {
    runUseEffect();
    const executeQuery = jest.fn()

    subject = createSubject({ autoFetchQuery: true, executeQuery })

    expect(executeQuery).toHaveBeenCalledTimes(1)
  })

  describe('dataset preview table', () => {
    const queryData = [{ name: 'nathaniel', age: 29, isAwesome: true, spouse: { name: 'alyssa', age: 30 } }, { name: 'austin', age: 28, isAwesome: false, spouse: undefined }]
    const expectedData = [{ name: 'nathaniel', age: 29, isAwesome: "true", spouse: JSON.stringify({ name: 'alyssa', age: 30 }) }, { name: 'austin', age: 28, isAwesome: "false", spouse: '' }]
    const dataSources = {
      name: ['nathaniel', 'austin'],
      age: [29, 28],
      isAwesome: [true, false],
      spouse: [{ name: 'alyssa', age: 30 }, undefined]
    }


    beforeEach(() => {
      subject = createSubject({ queryData: queryData, dataSources: dataSources })
    });

    it("renders correctly", () => {
      const expectedColumns = [
        { Header: 'name', accessor: 'name', headerClassName: "table-header" },
        { Header: 'age', accessor: 'age', headerClassName: "table-header" },
        { Header: 'isAwesome', accessor: 'isAwesome', headerClassName: "table-header" },
        { Header: 'spouse', accessor: 'spouse', headerClassName: "table-header" }
      ]

      expect(subject.find(ReactTable).prop('data')).toEqual(expectedData)
      expect(subject.find(ReactTable).prop('columns')).toEqual(expectedColumns)
    });
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
    setUserInteracted: jest.fn(),
    autoFetchQuery: false
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
    autoFetchQuery={paramsWithDefaults.autoFetchQuery}
  />)
}
