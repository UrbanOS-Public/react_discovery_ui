import { useState } from 'react'
import PropTypes from 'prop-types';
import './dataset-query.scss'
import LoadingElement from '../generic-elements/loading-element';


const DatasetQuery = props => {
  const {
    queryText,
    isQueryLoading,
    isQueryLoaded,
    queryFailureMessage,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props

  const [localQueryText, setLocalQueryText] = useState(queryText)
  const [isCancelled, setIsCancelled] = useState(false)

  React.useEffect(() => {
    setLocalQueryText(queryText);
  }, [queryText])

  const submit = () => {
    // I'd like to use the Redux queryText here, but this way makes a test pass -JBP 10/9/2019
    executeQuery(localQueryText)
    setIsCancelled(false)
  }

  const cancel = () => {
    cancelQuery()
    setIsCancelled(true)
  }

  const updateLocalQueryText = e => setLocalQueryText(e.target.value)
  const updateReduxQueryText = e => setQueryText(e.target.value)
  const errorText = isCancelled ? 'Your query has been stopped' : 'Query failure.  There may be a syntax issue.'

  const textArea = <textarea rows={5} type='text' value={localQueryText} onBlur={updateReduxQueryText} onChange={updateLocalQueryText} className='query-input' />
  const submitButton = <button className="action-button" disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button className="action-button" disabled={!isQueryLoading} onClick={cancel}>Cancel</button>
  const errorMessage = <span className='error-message'>{errorText}</span>
  const successMessage = (
    <span className='success-message'>
      Query successful.  To refresh the visualization, you must change an element in the trace
    </span>
  )

  const showSuccessMessage = !queryFailureMessage && isQueryLoaded && !isQueryLoading
  const showFailureMessage = queryFailureMessage && !isQueryLoading

  return (
    <div className='dataset-query'>
      <p>
        Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.
      </p>
      {textArea}
      <div>
        {submitButton}
        {cancelButton}
        {showFailureMessage && errorMessage}
        {showSuccessMessage && successMessage}
        {isQueryLoading && <LoadingElement />}
      </div>
    </div>
  )
}

DatasetQuery.propTypes = {
  queryText: PropTypes.string,
  queryFailureMessage: PropTypes.string,
  isQueryLoading: PropTypes.bool,
  isQueryLoaded: PropTypes.bool,

  executeQuery: PropTypes.func.isRequired,
  cancelQuery: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired,

}

export default DatasetQuery
