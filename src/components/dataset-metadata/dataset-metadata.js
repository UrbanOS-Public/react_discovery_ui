import React, { Component } from "react";
import "./dataset-metadata.scss";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class extends Component {
  render() {
    const { dataset } = this.props;
    if (!this.props.dataset) {
      return <div />;
    }

    const referenceUrls = dataset.referenceUrls || [];

    const data = [
      {
        Field: "Maintainer",
        Value: mailto(dataset.contactEmail, dataset.contactName)
      },
      {
        Field: "Last Updated",
        Value: dataset.modified
      },
      {
        Field: "Data Last Ingested",
        Value: dataset.lastUpdatedDate
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
        Value: dataset.publishFrequency
      },
      {
        Field: "Data Standard",
        Value: dataset.conformsToUri
      },
      {
        Field: "Data Dictionary URL",
        Value: (
          <a href={dataset.describedByUrl} target="_blank">
            {dataset.describedByUrl}
          </a>
        )
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
        Value: referenceUrls.map(url => (
          <div>
            <a href={url} target="_blank">
              {url}
            </a>
          </div>
        ))
      },
      {
        Field: "Source URL",
        Value: (
          <a href={dataset.sourceUrl} target="_blank">
            {dataset.sourceUrl}
          </a>
        )
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
      },
      {
        Field: "Count - Downloads",
        Value: dataset.downloads
      },
      {
        Field: "Count - API Queries",
        Value: dataset.queries
      }
    ];

    const columns = [
      {
        Header: "Field",
        accessor: "Field",
        headerClassName: "table-header",
        width: 160
      },
      { Header: "Value", accessor: "Value", headerClassName: "table-header" }
    ];

    return (
      <div id="dataset-metadata">
        <div className="header-container">
          <div className="header-text-items">
            <div className="metadata-header">Additional Information</div>
            <a href={`${window.API_HOST}/api/v1/dataset/${dataset.id}/`}>
              View full metadata JSON
            </a>
          </div>
        </div>
        <div id="dataset-metadata-table">
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={data.length}
            className="-striped -highlight"
            showPagination={false}
            sortable
            defaultSorted={[{ id: "Field", desc: false }]}
          />
        </div>
      </div>
    );
  }
}

function mailto(email, name) {
  if (email) {
    return <a href={"mailto:" + email}>{name}</a>;
  } else {
    return <span>{name}</span>;
  }
}
