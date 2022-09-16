import React, { Component } from 'react'
import './dataset-metadata.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import CollapsableBox from '../../components/collapsable-box'

export default class extends Component {
  render () {
    const { dataset } = this.props
    if (!this.props.dataset) {
      return <div />
    }
    document.body.className = 'body-dataset-detail'
    const referenceUrls = dataset.referenceUrls || []

    const data = [
      {
        Field: 'Maintainer',
        Value: mailto(dataset.contactEmail, dataset.contactName)
      },
      {
        Field: 'Last Updated',
        Value: dataset.modified
      },
      {
        Field: 'Data Last Ingested',
        Value: dataset.lastUpdatedDate
      },
      {
        Field: 'Rights',
        Value: dataset.rights
      },
      {
        Field: 'Spatial',
        Value: dataset.spatial
      },
      {
        Field: 'Temporal',
        Value: dataset.temporal
      },
      {
        Field: 'Release Date',
        Value: dataset.issuedDate
      },
      {
        Field: 'Frequency',
        Value: dataset.publishFrequency
      },
      {
        Field: 'Data Standard',
        Value: (<a href={dataset.conformsToUri} target='_blank'>
          {dataset.conformsToUri}
        </a>)
      },
      {
        Field: 'Data Dictionary URL',
        Value: (
          <a href={dataset.describedByUrl} target='_blank'>
            {dataset.describedByUrl}
          </a>
        )
      },
      {
        Field: 'Data Dictionary Type',
        Value: dataset.describedByMimeType
      },
      {
        Field: 'Collection',
        Value: dataset.parentDataset
      },
      {
        Field: 'Language',
        Value: dataset.language
      },
      {
        Field: 'Homepage URL',
        Value: <a href={dataset.homepage} target='_blank'>{dataset.homepage}</a>
      },
      {
        Field: 'Related Documents',
        Value: referenceUrls.map(url => (
          <div>
            <a href={url} target='_blank'>
              {url}
            </a>
          </div>
        ))
      },
      {
        Field: 'Source URL',
        Value: (
          <a href={dataset.sourceUrl} target='_blank'>
            {dataset.sourceUrl}
          </a>
        )
      },
      {
        Field: 'Source Type',
        Value: dataset.sourceType
      },
      {
        Field: 'License',
        Value: (
          <a href={dataset.license} target='_blank'>
            {dataset.license}
          </a>
        )
      },
      {
        Field: 'Category',
        Value: dataset.catagories
      },
      {
        Field: 'Count - Downloads',
        Value: dataset.downloads
      },
      {
        Field: 'Count - API Queries',
        Value: dataset.queries
      },
      {
        Field: 'Access Level',
        Value: dataset.accessLevel
      },
      {
        Field: 'Table Name',
        Value: dataset.systemName
      }
    ]

    const columns = [
      {
        Header: 'Field',
        accessor: 'Field',
        headerClassName: 'table-header',
        width: 160
      },
      { Header: 'Value', accessor: 'Value', headerClassName: 'table-header' }
    ]

    return (
      <dataset-metadata>
        <CollapsableBox title='Additional Information' expanded>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={data.length}
            className='-striped -highlight'
            showPagination={false}
            sortable
            defaultSorted={[{ id: 'Field', desc: false }]}
          />
        </CollapsableBox>
      </dataset-metadata>
    )
  }
}

function mailto (email, name) {
  if (email) {
    return <a href={'mailto:' + email}>{name}</a>
  } else {
    return <span>{name}</span>
  }
}
