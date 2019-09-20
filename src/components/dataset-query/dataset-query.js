import { useState } from 'react'
import PropTypes from 'prop-types';
import './dataset-query.scss'
import LoadingElement from '../generic-elements/loading-element';


const DatasetQuery = ({ defaultQuery, onQueryDataset, queryFailureMessage, isLoading, hasUserSubmittedQuery}) => {
  const [queryText, setQueryTextRaw] = useState(defaultQuery)
  const submit = () => { onQueryDataset(queryText) }
  const setQueryText = (e) => setQueryTextRaw(e.target.value)

  const textArea = <textarea rows={5} type='text' value={queryText} onChange={setQueryText} className='query-input' />
  const submitButton = <button className='action-button' onClick={submit}>Submit</button>
  const errorMessage = <span className='error-message'>Query failure.  There may be a syntax issue.</span>
  const successMessage = <span className='success-message'>Query successful.  To refesh the visualization, you must change an element in the trace</span>

  const shouldShowQuerySuccessful = !queryFailureMessage && hasUserSubmittedQuery && !isLoading


  return (
    <div className='dataset-query'>
      <p>
        Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.
      </p>
      {textArea}
      <div>
        {submitButton}
        {queryFailureMessage && errorMessage}
        {shouldShowQuerySuccessful && successMessage}
        {isLoading && <LoadingElement />}
      </div>
    </div>
  )
}

DatasetQuery.propTypes = {
  defaultQuery: PropTypes.string.isRequired,
  onQueryDataset: PropTypes.func.isRequired,
  queryFailureMessage: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  hasUserSubmittedQuery: PropTypes.bool.isRequired
}

export default DatasetQuery
