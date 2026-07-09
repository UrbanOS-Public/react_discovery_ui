import React, { useMemo } from 'react'
import './dataset-metadata.scss'
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table'
import CollapsableBox from '../../components/collapsable-box'

const MetadataTable = ({ data }) => {
  const columns = useMemo(() => [
    {
      header: 'Field',
      accessorKey: 'Field',
      meta: { headerClassName: 'table-header' },
      size: 160
    },
    {
      header: 'Value',
      accessorKey: 'Value',
      meta: { headerClassName: 'table-header' },
      cell: info => info.getValue() ?? <span>Unavailable</span>
    }
  ], [])

  const [sorting, setSorting] = React.useState([{ id: 'Field', desc: false }])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                scope='col'
                className={header.column.columnDef.meta?.headerClassName || ''}
                style={{ width: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined, cursor: 'pointer' }}
                onClick={header.column.getToggleSortingHandler()}
                aria-sort={header.column.getIsSorted() === 'asc' ? 'ascending' : header.column.getIsSorted() === 'desc' ? 'descending' : 'none'}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') header.column.getToggleSortingHandler()(e) }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ({ dataset }) => {
  if (!dataset) return <div />
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
      Field: 'Data Dictionary URL',
      Value: (
        dataset.describedByUrl
          ? (
            <a role='link' href={dataset.describedByUrl} target='_blank' aria-label='Data Dictionary URL' rel='noreferrer'>
              {dataset.describedByUrl}
            </a>
            )
          : (
            <span>Unavailable</span>
            )
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
      Value: (
        dataset.homepage
          ? (
            <a role='link' href={dataset.homepage} target='_blank' aria-label='Homepage URL' rel='noreferrer'>
              {dataset.homepage ?? 'Unavailable'}
            </a>
            )
          : (
            <span>Unavailable</span>
            )
      )
    },
    {
      Field: 'Related Documents',
      Value: (
        referenceUrls.length === 0
          ? (
            <span>None</span>
            )
          : (
              referenceUrls.map(url => (
                <div key={url}>
                  <a role='link' href={url} target='_blank' aria-label='Related Document URL' rel='noreferrer'>
                    {url}
                  </a>
                </div>
              ))
            ))
    },
    {
      Field: 'Source URL',
      Value: (
        dataset.sourceUrl
          ? (
            <a role='link' href={dataset.sourceUrl} target='_blank' aria-label='Source URL' rel='noreferrer'>
              {dataset.sourceUrl ?? 'Unavailable'}
            </a>
            )
          : (
            <span>Unavailable</span>
            )
      )
    },
    {
      Field: 'Source Type',
      Value: dataset.sourceType
    },
    {
      Field: 'License',
      Value: (
        dataset.license
          ? (
            <a role='link' href={dataset.license} target='_blank' aria-label={dataset.license ?? 'Unavailable'} rel='noreferrer'>
              {dataset.license ?? 'Unavailable'}
            </a>
            )
          : (
            <span>Unavailable</span>
            )
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

  return (
    <dataset-metadata class='dataset-metadata'>
      <CollapsableBox title='Additional Information' expanded>
        <MetadataTable data={data} />
      </CollapsableBox>
    </dataset-metadata>
  )
}

function mailto (email, name) {
  if (email) {
    return <a role='link' href={'mailto:' + email}>{name}</a>
  } else {
    return <span>{name}</span>
  }
}
