import { useState } from 'react'
import PropTypes from 'prop-types';
import './dataset-query.scss'
import LoadingElement from '../generic-elements/loading-element';


const DatasetQuery = props => {
  const [queryText, setQueryTextRaw] = useState(props.defaultQuery)
  const submit = () => { props.onQueryDataset(queryText) }
  const setQueryText = (e) => setQueryTextRaw(e.target.value)

  const textArea = <textarea rows={5} type='text' value={queryText} onChange={setQueryText} className='query-input' />
  const submitButton = <button className='action-button' onClick={submit}>Submit</button>
  const errorMessage = <span className='error-message'>Query failure.  There may be a syntax issue.</span>
  const successMessage = <span className='success-message'>Query successful.  To refesh the visualization, you must change an element in the trace</span>


  return (
    <div className='dataset-query'>
      <p>
        Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.
      </p>
      {textArea}
      <span>
        {submitButton}
        {props.queryFailureMessage && errorMessage}
        {!props.queryFailureMessage && props.hasUserSubmittedQuery && successMessage}
        {props.isLoading && <LoadingElement />}
      </span>
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
