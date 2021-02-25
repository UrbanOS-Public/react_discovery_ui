import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './query-form.scss'
import LoadingElement from '../generic-elements/loading-element'
import RecommendationList from '../recommendation-list'
import ReactTooltip from 'react-tooltip'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import MergeType from '@material-ui/icons/MergeType'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CodeEditor from '../code-editor'
import { MenuItem, } from '@trendmicro/react-dropdown'
import Dropdown from '../download-dropdown/dropdown'

const QueryForm = props => {
  const {
    queryText,
    recommendations,
    usedDatasets,
    datasetReferences,
    isQueryLoading,
    queryFailureMessage,
    isQueryDataAvailable,
    queryData,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props

  const [localQueryText, setLocalQueryText] = useState(queryText)
  React.useEffect(() => {
    setLocalQueryText(queryText);
  }, [queryText])

  const updateReduxQueryText = e => {
    setQueryText(e.target.value)
    setLocalQueryText(e.target.value)
  }

  const submit = () => {
    executeQuery(localQueryText)
  }

  const cancel = () => {
    cancelQuery()
  }

  const textArea = <CodeEditor
    code={localQueryText}
    onBlur={updateReduxQueryText}
    data-testid='query-input'
  />
  const submitButton = <button data-testid="submit-query-button" className="action-button" disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button data-testid="cancel-query-button" className="action-button" disabled={!isQueryLoading} onClick={cancel}>Cancel</button>

  const showSuccessMessage = !queryFailureMessage && isQueryDataAvailable && !isQueryLoading
  const successMessage = showSuccessMessage && (
    <span data-testid='success-message' className='success-message'>
      Query successful
    </span>
  )

  const showFailureMessage = queryFailureMessage && !isQueryLoading
  const failureMessage = (
    showFailureMessage && <span data-testid='error-message' className='error-message'>
      {queryFailureMessage}
    </span>
  )

  const recommendationSection = () => {
    const toolTipText = 'These datasets have related fields or columns that may be suitable for joining in your query'
    if (!_.isEmpty(recommendations)) {
      return (
        <div className="recommendation-section link-list">
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

  const createDatasetLinks = (datasetIds) => {
    return datasetIds.map((datasetId) => {
      const dataset = datasetReferences[datasetId]
      if (!dataset) {
        return
      }
      return (
        <span className="dataset-reference" key={datasetId}><MergeType className="icon" /><Link target="_blank" to={`/dataset/${dataset.org}/${dataset.name}`}>{dataset.title}</Link></span>
      )
    });
  }

  const usedDatasetsSection = () => {
    const toolTipText = 'These datasets are used in the query. This list is regenerated whenever the visualization is saved.'
    if (!_.isEmpty(usedDatasets)) {
      return (
        <div className="link-list">
          <div className="title">
            <span>Used Datasets</span>
            <ReactTooltip effect="solid" />
            <InfoOutlined className="info-icon" data-tip={toolTipText} />
          </div>
          <div className="used-datasets-section">
            {createDatasetLinks(usedDatasets)}
          </div>
        </div>
      )
    }
  }

  const queryDataDownloadLink = (fileType) => {
    var dataObj = downloadLinkData(queryData, fileType)
    var data = new Blob([dataObj], {type: fileType})
    return  window.URL.createObjectURL(data)
  }

  const downloadLinkData = (queryData, fileType) => {
    if(fileType == "text/csv"){
      return jsonToCSV(queryData)
    } 

    return JSON.stringify(queryData)
  }

  const jsonToCSV = (jsonObj) => {
    var obj = jsonObj[0]
    var keys = []
    if (obj != undefined && obj != null) {
      keys = Object.keys(obj)
    }

    var csv = keys.join(",") + "\n"
    var rowValues
    jsonObj.forEach((row) => {
      rowValues = Object.values(row)
      csv += rowValues.join(",")
      csv += "\n"
    }) 

    return csv
  }

  return (
    <query-form>
      <div className="user-input">
        <div className="sql-section">
          <div className="sql-title">Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.</div>
          {textArea}
        </div>
        <div className="query-info">
          {recommendationSection()}
          {usedDatasetsSection()}
        </div>
      </div>
      <div className="query-form__btn-group">
        {submitButton}
        {cancelButton}
        {failureMessage}
        {successMessage}

        <Dropdown className="download-dropdown">
          <Dropdown.Toggle title="Download" style={{background: "#00aeef", color:  "#f7f7f7", border: "none", padding: "1rem"}}/>
          <Dropdown.MenuWrapper>
            <Dropdown.Menu>
              <MenuItem><a download="query_results.csv" href={queryDataDownloadLink("text/csv")}>CSV</a></MenuItem>
              <MenuItem><a download="query_results.json" href={queryDataDownloadLink("application/json")}>JSON</a></MenuItem>
            </Dropdown.Menu>
          </Dropdown.MenuWrapper>
        </Dropdown>

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
