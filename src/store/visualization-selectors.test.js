import { isVisualizationSaveable } from './visualization-selectors';

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
        state.datasetReducer = { dataset: {systemName: 'stuff'} }
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
        state.datasetReducer = { dataset: {systemName: 'stuff'} }
      })

      it('returns false even if queryText is not set', () => {
        state.queryReducer = { queryText: '' }
    
        expect(isVisualizationSaveable(state)).toBe(false)
      });
    })
  })
  describe('with visualization set to an error state', () => {
    let state
    beforeEach(() => {
      state = {
        visualization: {
          error: true
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
        state.datasetReducer = { dataset: {systemName: 'stuff'} }
      })

      it('returns false even if queryText is not set', () => {
        state.queryReducer = { queryText: '' }
    
        expect(isVisualizationSaveable(state)).toBe(false)
      });
    })
  })
  describe('with no visualization status set', () => {
    let state
    beforeEach(() => {
      state = {
        visualization: {
          loading: false,
          saving: false,
          error: false
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
        state.queryReducer = {  }
    
        expect(isVisualizationSaveable(state)).toBe(false)
      });
    
      it('returns true if query text is available', () => {
        state.queryReducer = { queryText: 'select * from stuff' }
    
        expect(isVisualizationSaveable(state)).toBe(true)
      });
    })

    describe('and dataset available', () => { 
      beforeEach(() => {
        state.datasetReducer = { dataset: {systemName: 'stuff'} }
      })

      it('returns true if queryText is not set', () => {
        state.queryReducer = { queryText: '' }
    
        expect(isVisualizationSaveable(state)).toBe(true)
      });
    })
  })
});
