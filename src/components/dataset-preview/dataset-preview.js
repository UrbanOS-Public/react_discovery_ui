import React, { Component } from 'react'
import './dataset-preview.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ReactJson from 'react-json-view'
import DataView from '../data-view'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default class extends Component {
  componentDidMount() {
    this.props.retrieveDatasetPreview(this.props.datasetId)
  }

  render() {
    const { datasetPreview = { data: [], meta: { columns: [] } } } = this.props

    return (
      <div id='dataset-preview'>
        <div className='header-container'>
          <div className='header-text-items'>
            <div className='preview-header'>Sample</div>
            <div>This only shows the first 50 rows, to view the entire dataset please download</div>
          </div>
        </div>
        <DataView data={datasetPreview.data} columns={datasetPreview.meta.columns} loading={this.props.previewLoading}></DataView>
      </div>
    )
  }
}
