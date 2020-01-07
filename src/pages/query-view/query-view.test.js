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

  describe('dataset preview table', () => {
    it("converts unrenderable values to strings", () => {
      const queryData = [
        { object: { value: 1 }, boolean: true, array: [1], nan: NaN, null: null },
        { object: { value: 2 }, boolean: false, array: [2, 3], nan: NaN, null: null }
      ]
      const dataSources = {
        object: [{ value: 1 }, { value: 2 }],
        boolean: [true, false],
        array: [[1], [2, 3]],
        nan: [NaN, NaN],
        null: [null, null]
      }

      subject = createSubject({ queryData: queryData, dataSources: dataSources })

      const expectedData = [
        { object: '{\"value\":1}', boolean: 'true', array: '[1]', nan: '', null: '' },
        { object: '{\"value\":2}', boolean: 'false', array: '[2,3]', nan: '', null: '' }
      ]

      expect(subject.find(ReactTable).prop('data')).toEqual(expectedData)
    });

    it("can handle column names with dots (.) by giving a custom accessor", () => {
      const queryData = [
        { 'first.name': 'Mark', 'last.name': 'Johnson'},
        { 'first.name': 'George', 'last.name': 'Lakoff'}
      ]
      const dataSources = {
        'first.name': ['Mark', 'George'],
        'last.name': ['Johnson', 'Lakoff']
      }

      subject = createSubject({ queryData: queryData, dataSources: dataSources })

      const stringifyAccessor = column => {
        column.accessor = column.accessor.toString().replace(/\s/g,'')
        return column
      }

      const expectedColumns = [
        { Header: 'first.name', id: 'first.name', accessor: (row) => row[col], headerClassName: "table-header" },
        { Header: 'last.name', id: 'last.name', accessor: (row) => row[col], headerClassName: "table-header" },
      ]
      expectedColumns.map(stringifyAccessor)

      const actualColumns = subject.find(ReactTable).prop('columns').map(stringifyAccessor);

      expect(actualColumns).toEqual(expectedColumns)
    });
  });
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
