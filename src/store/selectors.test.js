import { getVisualizationDataSources } from "./selectors";

describe('get visualization data sources', () => {
  it('returns empty data sources when data query result is missing', () => {
    const state = { datasetReducer: {} }

    const dataSources = getVisualizationDataSources(state)

    expect(dataSources).toEqual({})
  })

  it('returns empty data sources when data query result is empty', () => {
    const state = { datasetReducer: { datasetQueryResult: [] } }

    const dataSources = getVisualizationDataSources(state)

    expect(dataSources).toEqual({})
  })

  it('returns data sources as a list of values for each column in query result', () => {
    const state = {
      datasetReducer: {
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
    }

    const dataSources = getVisualizationDataSources(state)

    expect(dataSources).toEqual({ bob: ["bob's bob", "sally's bob", undefined], thing: ["bob's thing", "sally's thing", "un's thing"] })
  })
})
