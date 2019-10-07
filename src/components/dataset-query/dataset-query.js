import { useState } from 'react'
import PropTypes from 'prop-types';
import './dataset-query.scss'
import LoadingElement from '../generic-elements/loading-element';


const DatasetQuery = ({ freestyleQueryText, onQueryDataset, onUpdateQuery, onCancelQuery, queryFailureMessage, isLoading, hasUserSubmittedQuery }) => {
  const [queryText, setQueryTextRaw] = useState(freestyleQueryText)
  const [hasUserClickedCancelQuery, setHasUserClickedCancelQuery] = useState(false)

  const submit = () => {
    onQueryDataset(queryText)
    setHasUserClickedCancelQuery(false)
  }

  const cancel = () => {
    onCancelQuery()
    setHasUserClickedCancelQuery(true)
  }

  const setQueryText = (e) => setQueryTextRaw(e.target.value)
  const updateQueryText = (e) => onUpdateQuery(e.target.value)
  const errorText = hasUserClickedCancelQuery ? 'Your query has been stopped' : 'Query failure.  There may be a syntax issue.'

  // Populate the text box after the page has rendered
  React.useEffect(() => {
    setQueryTextRaw(freestyleQueryText);
  }, [freestyleQueryText])

  const textArea = <textarea rows={5} type='text' value={queryText} onBlur={updateQueryText} onChange={setQueryText} className='query-input' />
  const submitButton = <button className="action-button" disabled={isLoading} onClick={submit}>Submit</button>
  const cancelButton = <button className="action-button" disabled={!isLoading} onClick={cancel}>Cancel</button>
  const errorMessage = <span className='error-message'>{errorText}</span>
  const successMessage = (
    <span className='success-message'>
      Query successful.  To refesh the visualization, you must change an element in the trace
    </span>
  )

  const shouldShowQuerySuccessful = !queryFailureMessage && hasUserSubmittedQuery && !isLoading
  const shouldShowFailureMessage = queryFailureMessage && !isLoading


  return (
    <div className='dataset-query'>
      <p>
        Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.
      </p>
      {textArea}
      <div>
        {submitButton}
        {cancelButton}
        {shouldShowFailureMessage && errorMessage}
        {shouldShowQuerySuccessful && successMessage}
        {isLoading && <LoadingElement />}
      </div>
    </div>
  )
}

DatasetQuery.propTypes = {
  freestyleQueryText: PropTypes.string,
  onQueryDataset: PropTypes.func.isRequired,
  queryFailureMessage: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  hasUserSubmittedQuery: PropTypes.bool.isRequired
}

export default DatasetQuery
