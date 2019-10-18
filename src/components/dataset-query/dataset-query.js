import { useState } from 'react'
import PropTypes from 'prop-types'
import './dataset-query.scss'
import LoadingElement from '../generic-elements/loading-element'
import RecommendationList from '../recommendation-list'
import ReactTooltip from 'react-tooltip'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import _ from 'lodash'

const DatasetQuery = props => {
  const {
    queryText,
    recommendations,
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

  const textArea = <textarea rows={5} type='text' value={localQueryText} onBlur={updateReduxQueryText} onChange={updateLocalQueryText} className='sql-textbox' />
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

  const recommendationSection = () => {
    const toolTipText = 'These datasets have related fields or columns that may be suitable for joining in your query'
    if (!_.isEmpty(recommendations)) {
      return (
        <div className="recommendation-section">
          <div className="title">
            <span>Recommendations</span>
            <ReactTooltip effect="solid" />
            <InfoOutlined className="info-icon" data-tip={toolTipText} />
          </div>
          <RecommendationList recommendations={recommendations} />
        </div>
      )
    }
  }

  return (
    <dataset-query>
      <div className="user-input">
        <div className="sql-section">
          <div className="sql-title">Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.</div>
          {textArea}
        </div>
        {recommendationSection()}
      </div>
      <div>
        {submitButton}
        {cancelButton}
        {failureMessage}
        {successMessage}
        {isQueryLoading && <LoadingElement />}
      </div>
    </dataset-query>
  )
}

DatasetQuery.propTypes = {
  queryText: PropTypes.string,
  recommendations: PropTypes.array,
  queryFailureMessage: PropTypes.string,
  userHasInteracted: PropTypes.bool,
  isQueryLoading: PropTypes.bool.isRequired,

  executeQuery: PropTypes.func.isRequired,
  cancelQuery: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired,
  setUserInteracted: PropTypes.func.isRequired
}

export default DatasetQuery
