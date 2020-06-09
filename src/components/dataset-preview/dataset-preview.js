import React, { Component } from 'react'
import './dataset-preview.scss'
import 'react-table/react-table.css'
import CollapsableBox from '../../components/collapsable-box'
import DataView from '../data-view'

export default class extends Component {
  componentDidMount() {
    this.props.retrieveDatasetPreview(this.props.datasetId)
  }

  render() {
    const datasetPreview = this.props.datasetPreview || {}
    const columns = datasetPreview.meta ? datasetPreview.meta.columns : []
    const data = datasetPreview.data || datasetPreview

    return (
      <div id='dataset-preview'>
        <CollapsableBox title="Sample" headerHtml='This only shows the first 50 rows, to view the entire dataset please download' expanded={true}>
          <DataView data={data} columns={columns} loading={this.props.previewLoading} format={this.props.format}></DataView>
        </CollapsableBox>
      </div>
    )
  }
}
