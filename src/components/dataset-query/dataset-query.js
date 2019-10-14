import { useState } from 'react'
import PropTypes from 'prop-types';
import './dataset-query.scss'
import LoadingElement from '../generic-elements/loading-element';


const DatasetQuery = props => {
  const {
    queryText,
    isQueryLoading,
    queryFailureMessage,
    userHasInteracted,

    executeQuery,
    cancelQuery,
    setQueryText,
    setUserInteracted
  } = props

  const [localQueryText, setLocalQueryText] = useState(queryText)

  React.useEffect(() => {
    setLocalQueryText(queryText);
  }, [queryText])

  const submit = () => {
    // I'd like to use the Redux queryText here, but this way makes a test pass -JBP 10/9/2019
    executeQuery(localQueryText)
    setUserInteracted()
  }

  const cancel = () => {
    setUserInteracted()
    cancelQuery()
  }

  const updateLocalQueryText = e => setLocalQueryText(e.target.value)
  const updateReduxQueryText = (e) => setQueryText(e.target.value)

  const textArea = <textarea rows={5} type='text' value={localQueryText} onBlur={updateReduxQueryText} onChange={updateLocalQueryText} className='query-input' />
  const submitButton = <button className="action-button" disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button className="action-button" disabled={!isQueryLoading} onClick={cancel}>Cancel</button>
  
  const showSuccessMessage = !queryFailureMessage && userHasInteracted && !isQueryLoading
  const successMessage = showSuccessMessage && (
    <span className='success-message'>
      Query successful.  To refresh the visualization, you must change an element in the trace
    </span>
  )

  const showFailureMessage = queryFailureMessage && !isQueryLoading
  const failureMessage = (
    showFailureMessage && <span className='error-message'>
      {queryFailureMessage}
    </span>
  )

  return (
    <div className='dataset-query'>
      <p>
        Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.
      </p>
      {textArea}
      <div>
        {submitButton}
        {cancelButton}
        {failureMessage}
        {successMessage}
        {isQueryLoading && <LoadingElement />}
      </div>
    </div>
  )
}

DatasetQuery.propTypes = {
  queryText: PropTypes.string,
  queryFailureMessage: PropTypes.string,
  isQueryLoading: PropTypes.bool.isRequired,

  executeQuery: PropTypes.func.isRequired,
  cancelQuery: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired,
  setUserInteracted: PropTypes.func.isRequired,

}

export default DatasetQuery
