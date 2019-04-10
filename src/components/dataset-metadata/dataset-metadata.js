import React, { Component } from 'react'
import './dataset-metadata.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class extends Component {
  render () {
    const { dataset } = this.props
    if (!this.props.dataset) { return <div /> }

    const data = [
    {
     Field: "Maintainer",
     Value: <a href={'mailto:' + dataset.contactEmail}>{dataset.contactName}</a>
    },
    {
      Field: "Last Updated",
      Value: "" //TODO bring in modified date
    },
    {
      Field: "Data Last Updated",
      Value: dataset.lastUpdatedDate
    },
    {
      Field: "Access Level",
      Value: "" //TODO bring in private field
    },
    {
      Field: "Rights",
      Value: dataset.rights
    },
    {
      Field: "Spatial",
      Value: dataset.spatial
    },
    {
      Field: "Temporal",
      Value: dataset.temporal
    },
    {
      Field: "Release Date",
      Value: dataset.issuedDate
    },
    {
      Field: "Frequency",
      Value: dataset.publishFrequency //TODO: Why publish?
    },
    {
      Field: "Data Standard",
      Value: dataset.conformsToUri
    },
    {
      Field: "Data Dictionary URL",
      Value: <a href={dataset.describedByUrl}>{dataset.describedByUrl}</a>
    },
    {
      Field: "Data Dictionary Type",
      Value: dataset.describedByMimeType
    },
    {
      Field: "Collection",
      Value: dataset.parentDataset
    },
    {
      Field: "Language",
      Value: dataset.language
    },
    {
      Field: "Homepage URL",
      Value: <a href={dataset.homepage}>{dataset.homepage}</a>
    },
    {
      Field: "Related Documents",
      Value: dataset.refereneceUrls //TODO render list of URLs as links
    },
    {
      Field: "Source URL",
      Value: <a href={dataset.sourceUrl}>{dataset.sourceUrl}</a>
    },
    {
      Field: "Source Type",
      Value: dataset.sourceType
    },
    {
      Field: "License",
      Value: dataset.license
    },
    {
      Field: "Category",
      Value: dataset.catagories
    }
    ]

    const columns = [{ Header: 'Field', accessor: 'Field', headerClassName: 'table-header', width: 160}, { Header: 'Value', accessor: 'Value', headerClassName: 'table-header'},  ]

    return (
      <div id='dataset-metadata'>
        <div className='header-container'>
          <div className='header-text-items'>
            <div className='metadata-header'>Additional Information</div>
            <a href={`${window.API_HOST}/api/v1/dataset/${dataset.id}/`}>View full metadata JSON</a>
          </div>
        </div>
        <div id='dataset-metadata-table'>
          <ReactTable
            data = {data}
            columns={columns}
            defaultPageSize={data.length}
            className='-striped -highlight'
            showPagination={false}
            sortable={true}
            defaultSorted={[{id:"Field", desc: false}]}
          />
        </div>
      </div>
    )
  }
}
