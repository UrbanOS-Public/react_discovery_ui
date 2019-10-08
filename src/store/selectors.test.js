import {
  getFreestyleQueryText,
  getVisualizationDataSources
} from "./selectors";

describe("get visualization data sources", () => {
  it("returns empty data sources when data query result is missing", () => {
    const state = { queryReducer: {} };

    const dataSources = getVisualizationDataSources(state);

    expect(dataSources).toEqual({});
  });

  it("returns empty data sources when data query result is empty", () => {
    const state = { queryReducer: { datasetQueryResult: [] } };

    const dataSources = getVisualizationDataSources(state);

    expect(dataSources).toEqual({});
  });

  it("returns data sources as a list of values for each column in query result", () => {
    const state = {
      queryReducer: {
        datasetQueryResult: [
          {
            bob: "bob's bob",
            thing: "bob's thing"
          },
          {
            bob: "sally's bob",
            thing: "sally's thing"
          },
          {
            bob: undefined,
            thing: "un's thing"
          }
        ]
      }
    };

    const dataSources = getVisualizationDataSources(state);

    expect(dataSources).toEqual({
      bob: ["bob's bob", "sally's bob", undefined],
      thing: ["bob's thing", "sally's thing", "un's thing"]
    });
  });
});

describe("getFreestyleQueryText", () => {
  const tableName = "org1__table2";

  let state = {};
  beforeEach(() => {
    state = {
      queryReducer: {
        freestyleQueryText: ""
      },
      datasetReducer: {
        dataset: {
          systemName: tableName
        }
      }
    };
  });

  it("returns the default query when freestyleQueryText is empty", () => {
    const expectedQuery = `SELECT * FROM ${tableName}\nLIMIT 20000`;
    const receivedQuery = getFreestyleQueryText(state);
    expect(receivedQuery).toEqual(expectedQuery);
  });

  it("returns the freestyleQueryText when it is not empty", () => {
    const expectedQuery = "SELECT something FROM somewhere LIMIT your_dreams";
    state.queryReducer.freestyleQueryText = expectedQuery;

    const receivedQuery = getFreestyleQueryText(state);
    expect(receivedQuery).toEqual(expectedQuery);
  });
});
