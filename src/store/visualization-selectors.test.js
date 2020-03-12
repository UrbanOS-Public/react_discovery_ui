import {
  isVisualizationSaveable,
  dereferencedChart,
  visualizationAllowedActions
} from './visualization-selectors';
import { getVisualizationDataSources } from './query-selectors';
import { cloneDeep } from 'lodash'

describe('visualizationSaveable', () => {
  describe('with visualization set to saving', () => {
    let state
    beforeEach(() => {
      state = {
        visualization: {
          saving: true
        }
      }
    })
    describe('and no dataset available', () => {
      beforeEach(() => {
        state.datasetReducer = { dataset: null }
      })

      it('returns false even if query text is available', () => {
        state.queryReducer = { queryText: 'select * from stuff' }

        expect(isVisualizationSaveable(state)).toBe(false)
      });
    })

    describe('and dataset available', () => {
      beforeEach(() => {
        state.datasetReducer = { dataset: { systemName: 'stuff' } }
      })

      it('returns false even if queryText is not set', () => {
        state.queryReducer = { queryText: '' }

        expect(isVisualizationSaveable(state)).toBe(false)
      });
    })
  })

  describe('with visualization set to loading', () => {
    let state
    beforeEach(() => {
      state = {
        visualization: {
          loading: true
        }
      }
    })
    describe('and no dataset available', () => {
      beforeEach(() => {
        state.datasetReducer = { dataset: null }
      })

      it('returns false even if query text is available', () => {
        state.queryReducer = { queryText: 'select * from stuff' }

        expect(isVisualizationSaveable(state)).toBe(false)
      });
    })

    describe('and dataset available', () => {
      beforeEach(() => {
        state.datasetReducer = { dataset: { systemName: 'stuff' } }
      })

      it('returns false even if queryText is not set', () => {
        state.queryReducer = { queryText: '' }

        expect(isVisualizationSaveable(state)).toBe(false)
      });
    })
  })

  describe('with no visualization loading or saving status set', () => {
    let state
    beforeEach(() => {
      state = {
        visualization: {
          loading: false,
          saving: false
        }
      }
    })

    describe('and no dataset available', () => {
      beforeEach(() => {
        state.datasetReducer = { dataset: null }
      })

      it('returns false if query text is empty', () => {
        state.queryReducer = { queryText: '' }

        expect(isVisualizationSaveable(state)).toBe(false)
      });

      it('returns false if query text is undefined', () => {
        state.queryReducer = {}

        expect(isVisualizationSaveable(state)).toBe(false)
      });

      it('returns true if query text is available', () => {
        state.queryReducer = { queryText: 'select * from stuff' }

        expect(isVisualizationSaveable(state)).toBe(true)
      });
    })

    describe('and dataset available', () => {
      beforeEach(() => {
        state.datasetReducer = { dataset: { systemName: 'stuff' } }
      })

      it('returns true if queryText is not set', () => {
        state.queryReducer = { queryText: '' }

        expect(isVisualizationSaveable(state)).toBe(true)
      });
    })
  })
});

describe('dererencedChart', () => {
  const queryDataRow = {
    bob: 'bob\'s bob',
    thing: 'bob\'s thing'
  }
  const plotlyData = [
    {
      type: 'scatter',
      mode: 'markers',
      x: ['bob\'s bob'],
      xsrc: 'bob',
      meta: { columnNames: { x: 'bob', y: 'thing' } },
      y: ['bob\'s thing'],
      ysrc: 'thing'
    }
  ]

  let state, result, preDerefDataSources

  beforeEach(() => {
    state = {
      queryReducer: { queryData: [queryDataRow] },
      visualization: {
        chart: {
          data: plotlyData,
          frames: [{ some: 'stuff' }],
          layout: { more: 'stuff' }
        }
      }
    }

    preDerefDataSources = cloneDeep(getVisualizationDataSources(state))

    result = dereferencedChart(state)
  })

  it('returns plotly data with cleared data values', () => {
    const firstPlotData = plotlyData[0]
    const expected = { ...state.visualization.chart, ...{ data: [{ ...firstPlotData, ...{ x: null, y: null } }] } }

    expect(result).toEqual(expected)
  })

  it('does not mutate data sources', () => {
    expect(getVisualizationDataSources(state)).toEqual(preDerefDataSources)
  })
})

describe('visualizationAllowedActions', () => {
  it('returns actions associated with existing visualization if one is in store', () => {
    const state = {
      visualization: {
        visualization: {
          allowedActions: [{name: 'xxxx'}, {name: 'yyyy'}]
        }
      }
    }

    expect(visualizationAllowedActions(state)).toEqual(['xxxx', 'yyyy'])
  })

  it('returns only a create action when no actions are present in the store', () => {
    const state = {
      visualization: { visualization: {} }
    }

    expect(visualizationAllowedActions(state)).toEqual(['create'])
  })
})