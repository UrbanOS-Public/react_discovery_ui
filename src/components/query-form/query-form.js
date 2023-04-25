import { useState } from 'react'
import PropTypes from 'prop-types'
import './query-form.scss'
import '@trendmicro/react-buttons/dist/react-buttons.css'
import '@trendmicro/react-dropdown/dist/react-dropdown.css'
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import LoadingElement from '../generic-elements/loading-element'
import RecommendationList from '../recommendation-list'
import ReactTooltip from 'react-tooltip'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import MergeType from '@material-ui/icons/MergeType'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CodeEditor from '../code-editor'
import { parse } from 'js2xmlparser'

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
    setLocalQueryText(queryText)
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

  const textArea = (
    <CodeEditor
      code={localQueryText}
      onBlur={updateReduxQueryText}
      data-testid='query-input'
      aria-label="SQL Query Input"
    />
  )
  const submitButton = <button data-testid='submit-query-button' className='action-button' disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button data-testid='cancel-query-button' className='action-button' disabled={!isQueryLoading} onClick={cancel}>Cancel</button>

  const showSuccessMessage = !queryFailureMessage && isQueryDataAvailable && !isQueryLoading
  const successMessage = showSuccessMessage && (
    <span data-testid='success-message' className='success-message'>
      Query successful
    </span>
  )

  const showFailureMessage = queryFailureMessage && !isQueryLoading
  const failureMessage = (
    showFailureMessage && <span data-testid='error-message' className='error-message'>
      <span>Query Failed</span>
      <div>{queryFailureMessage}</div>
    </span>
  )

  const recommendationSection = () => {
    const toolTipText = 'These datasets have related fields or columns that may be suitable for joining in your query'
    if (!_.isEmpty(recommendations)) {
      return (
        <div className='recommendation-section link-list'>
          <div className='title'>
            <span>Recommendations</span>
            <ReactTooltip effect='solid' />
            <InfoOutlined className='info-icon' data-tip={toolTipText} />
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
        <span className='dataset-reference' key={datasetId}><MergeType className='icon' /><Link target='_blank' to={`/dataset/${dataset.org}/${dataset.name}`}>{dataset.title}</Link></span>
      )
    })
  }

  const usedDatasetsSection = () => {
    const toolTipText = 'These datasets are used in the query. This list is regenerated whenever the visualization is saved.'
    if (!_.isEmpty(usedDatasets)) {
      return (
        <div className='link-list'>
          <div className='title'>
            <span>Used Datasets</span>
            <ReactTooltip effect='solid' />
            <InfoOutlined className='info-icon' data-tip={toolTipText} />
          </div>
          <div className='used-datasets-section'>
            {createDatasetLinks(usedDatasets)}
          </div>
        </div>
      )
    }
  }

  let dataObj, data, tempLink
  const queryDataDownloadLinkAsCsv = () => {
    dataObj = queryDataToCSV(queryData)
    data = new Blob([dataObj], { type: "application/json" })
    tempLink = document.createElement('a')
    tempLink.href = window.URL.createObjectURL(data)
    tempLink.setAttribute('download', 'query_results.csv')
    tempLink.click()
  }

  const queryDataDownloadLinkAsJson = () => {
    dataObj = JSON.stringify(queryData)
    data = new Blob([dataObj], { type: "text/csv" })
    tempLink = document.createElement('a')
    tempLink.href = window.URL.createObjectURL(data)
    tempLink.setAttribute('download', 'query_results.json')
    tempLink.click()
  }

  const queryDataDownloadLinkAsXml = () => {
    dataObj = parse("results", queryData)
    data = new Blob([dataObj], { type: "application/xml" })
    tempLink = document.createElement('a')
    tempLink.href = window.URL.createObjectURL(data)
    tempLink.setAttribute('download', 'query_results.xml')
    tempLink.click()
  }

  let keys, csv, row
  const queryDataToCSV = (dataObj) => {
    if (dataObj == undefined || dataObj == null || dataObj == []) return ''

    row = dataObj[0]
    if (row == undefined || row == null) return ''

    keys = Object.keys(row)
    csv = keys.join(',') + '\n'
    dataObj.forEach((row) => {
      Object.values(row).forEach((colVal) => {
        colVal = parseJsonStringField(colVal)
        colVal = prepareFieldForCSV(colVal)

        csv += colVal + ','
      })

      csv += '\n'
    })

    return csv
  }

  const prepareFieldForCSV = (colVal) => {
    if (colVal == null) {
      colVal = ''
    } else if (typeof colVal === 'object') {
      colVal = JSON.stringify(colVal)
      colVal = colVal.replaceAll('"', '""')
      colVal = `"${colVal}"`
    } else {
      colVal = `"${colVal}"`
    }

    return colVal
  }

  const parseJsonStringField = (stringifiedJson) => {
    try {
      return JSON.parse(stringifiedJson)
    } catch (error) {
      return stringifiedJson
    }
  }

  const downloadButtonColor = window.PRIMARY_COLOR || '#0F64B3';

  return (
    <query-form>
      <h1>Query Dataset</h1>
      <div className='user-input'>
        <div className='sql-section'>
          <label for="code-editor" className='sql-title'>Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.</label>
          {textArea}
        </div>
        <div className='query-info'>
          {recommendationSection()}
          {usedDatasetsSection()}
        </div>
      </div>
      <div className='query-form__btn-group'>
        {submitButton}
        {cancelButton}
        {successMessage}

        <Dropdown className='download-dropdown' disabled={isQueryLoading}>
          <Dropdown.Toggle title='Download Returned Results' style={{ background: downloadButtonColor, color: 'white', border: 'none', padding: '1rem' }} />
          <Dropdown.MenuWrapper>
            <Dropdown.Menu>
              <MenuItem onKeyDown={(event) => (event.key === ' ' || event.key === 'Enter') && queryDataDownloadLinkAsCsv()} onClick={() => queryDataDownloadLinkAsCsv()}>CSV</MenuItem>
              <MenuItem onKeyDown={(event) => (event.key === ' ' || event.key === 'Enter') && queryDataDownloadLinkAsJson()} onClick={() => queryDataDownloadLinkAsJson()}>JSON</MenuItem>
              <MenuItem onKeyDown={(event) => (event.key === ' ' || event.key === 'Enter') && queryDataDownloadLinkAsJson()} onClick={() => queryDataDownloadLinkAsXml()}>XML</MenuItem>
            </Dropdown.Menu>
          </Dropdown.MenuWrapper>
        </Dropdown>

        {failureMessage}
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
