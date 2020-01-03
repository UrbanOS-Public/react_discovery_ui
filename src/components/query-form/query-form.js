import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './query-form.scss'
import LoadingElement from '../generic-elements/loading-element'
import RecommendationList from '../recommendation-list'
import ReactTooltip from 'react-tooltip'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import _ from 'lodash'

const TEXT_AREA_MIN_HEIGHT = 100;
const TEXT_AREA_HEIGHT_OFFSET = 5;

const adjustHeight = (element) => {
  if (element.scrollHeight > TEXT_AREA_MIN_HEIGHT + TEXT_AREA_HEIGHT_OFFSET) {
    element.style.height = `${TEXT_AREA_HEIGHT_OFFSET}px`
    element.style.height = `${element.scrollHeight}px`;
  }
}

const QueryForm = props => {
  const {
    queryText,
    recommendations,
    isQueryLoading,
    queryFailureMessage,
    isQueryDataAvailable,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props

  const [localQueryText, setLocalQueryText] = useState(queryText)
  const textAreaRef = useRef(null)

  React.useEffect(() => {
    setLocalQueryText(queryText);
    adjustHeight(textAreaRef.current)
  }, [queryText])

  const handleQueryChange = event => {
    setLocalQueryText(event.target.value)
    adjustHeight(event.target)
  }

  const updateReduxQueryText = e => setQueryText(e.target.value)

  const submit = () => {
    executeQuery(localQueryText)
  }

  const cancel = () => {
    cancelQuery()
  }

  const textArea = <textarea
    data-testid="query"
    style={{ minHeight: `${TEXT_AREA_MIN_HEIGHT}px` }}
    type='text'
    placeholder='SELECT * FROM ...'
    value={localQueryText}
    onBlur={updateReduxQueryText}
    onChange={handleQueryChange}
    onInput={handleQueryChange}
    className='query-input'
    ref={textAreaRef}
  />
  const submitButton = <button className="action-button" disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button className="action-button" disabled={!isQueryLoading} onClick={cancel}>Cancel</button>

  const showSuccessMessage = !queryFailureMessage && isQueryDataAvailable && !isQueryLoading
  const successMessage = showSuccessMessage && (
    <span className='success-message'>
      Query successful
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
    <query-form>
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
    </query-form>
  )
}

QueryForm.propTypes = {
  queryText: PropTypes.string,
  recommendations: PropTypes.array,
  queryFailureMessage: PropTypes.string,
  isQueryDataAvailable: PropTypes.bool,
  isQueryLoading: PropTypes.bool.isRequired,

  executeQuery: PropTypes.func.isRequired,
  cancelQuery: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired
}

export default QueryForm
