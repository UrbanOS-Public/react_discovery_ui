import {
  getFreestyleQueryText,
  getVisualizationDataSources,
  shouldAutoFetchQuery
} from './query-selectors';

describe('get visualization data sources', () => {
  it('returns empty data sources when data query result is missing', () => {
    const state = { queryReducer: {} };

    const dataSources = getVisualizationDataSources(state);

    expect(dataSources).toEqual({});
  });

  it('returns empty data sources when data query result is empty', () => {
    const state = { queryReducer: { datasetQueryResult: [] } };

    const dataSources = getVisualizationDataSources(state);

    expect(dataSources).toEqual({});
  });

  it('returns data sources as a list of values for each column in query result', () => {
    const state = {
      queryReducer: {
        queryData: [
          {
            bob: 'bob\'s bob',
            thing: 'bob\'s thing'
          },
          {
            bob: 'sally\'s bob',
            thing: 'sally\'s thing'
          },
          {
            bob: undefined,
            thing: 'un\'s thing'
          }
        ]
      }
    };

    const dataSources = getVisualizationDataSources(state);

    expect(dataSources).toEqual({
      bob: ['bob\'s bob', 'sally\'s bob', undefined],
      thing: ['bob\'s thing', 'sally\'s thing', 'un\'s thing']
    });
  });
});

describe('getFreestyleQueryText', () => {
  let state

  describe('for a dataset', () => {
    const tableName = 'org1__table2';

    beforeEach(() => {
      state = {
        queryReducer: {
          queryText: ''
        },
        datasetReducer: {
          dataset: {
            systemName: tableName
          }
        }
      };
    });

    it('returns the default query when freestyleQueryText is empty', () => {
      const expectedQuery = `SELECT * FROM ${tableName}\nLIMIT 20000`;

      const receivedQuery = getFreestyleQueryText(state);

      expect(receivedQuery).toBe(expectedQuery);
    });

    it('returns the freestyleQueryText when it is not empty', () => {
      const expectedQuery = 'SELECT something FROM somewhere LIMIT your_dreams';
      state.queryReducer.queryText = expectedQuery;

      const receivedQuery = getFreestyleQueryText(state);

      expect(receivedQuery).toBe(expectedQuery);
    });
  })

  describe('with no dataset and no query text', () => {
    it('returns an empty string', () => {
      state = {
        queryReducer: {},
        datasetReducer: {}
      }

      const receivedQuery = getFreestyleQueryText(state);

      expect(receivedQuery).toBe('')
    })
  })
});

describe('shouldAutoFetchQuery', () => {
  let state

  describe('with no query data present', () => {
    beforeEach(() => {
      state = {
        queryReducer: {
          queryData: null
        },
        datasetReducer: {}
      }
    })

    it('returns true when query text is set', () => {
      state.datasetReducer = { dataset: { systemName: 'pablo' } }

      expect(shouldAutoFetchQuery(state)).toBe(true)
    })

    it('returns true when dataset is present', () => {
      state.queryReducer.queryText = 'select stars from lucky_charms'

      expect(shouldAutoFetchQuery(state)).toBe(true)
    })

    it('returns false when query text is not set', () => {
      state.queryReducer.queryText = undefined

      expect(shouldAutoFetchQuery(state)).toBe(false)
    })

    it('returns false when query text is empty', () => {
      state.queryReducer.queryText = ''

      expect(shouldAutoFetchQuery(state)).toBe(false)
    })
  })

  describe('with query data present', () => {
    beforeEach(() => {
      state = {
        queryReducer: { queryData: [] },
        datasetReducer: {}
      }
    })

    it('returns false when query text is not set', () => {
      state.queryReducer.queryText = undefined

      expect(shouldAutoFetchQuery(state)).toBe(false)
    })

    it('returns false when query text is empty', () => {
      state.queryReducer.queryText = ''

      expect(shouldAutoFetchQuery(state)).toBe(false)
    })

    it('returns false when query text is set', () => {
      state.queryReducer.queryText = 'select moons from lucky_charms'

      expect(shouldAutoFetchQuery(state)).toBe(false)
    })
  })
})