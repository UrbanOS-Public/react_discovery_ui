import "./dataset-list-view.scss"
import PropTypes from 'prop-types'
import DatasetList from "../../components/dataset-list"
import Paginator from "../../components/generic-elements/paginator"
import Select from "../../components/generic-elements/select"
import Search from "../../components/generic-elements/search"
import LoginZone from "../../components/login-zone"
import FacetSidebar from "../../components/facet-sidebar"
import ErrorComponent from "../../components/generic-elements/error-component"
import LoadingElement from "../../components/generic-elements/loading-element"
import Checkbox from "../../components/generic-elements/checkbox"

const DatasetListView = (props) => {
  const {
    queryParamsManager: {
      updateSearchText,
      updateSortBy,
      updateCurrentPage,
      toggleFacet,
      toggleApiAccessible,

      apiAccessible,
      facets,
      query,
      sort
    },
    searchResults,
    searchMetadata,
    numberOfPages,
    pageNumber,
    isSearchLoading,
    error
  } = props


  const createSortOptions = () => {
    return [
      {
        value: "name_asc",
        label: "Name Ascending",
        default: sort === "name_asc"
      },
      {
        value: "name_desc",
        label: "Name Descending",
        default: sort === "name_desc"
      },
      {
        value: "last_mod",
        label: "Last Modified",
        default: sort === "last_mod"
      }
    ]
  }

  const renderDatasetList = () => {
    if (isSearchLoading) {
      return <LoadingElement />
    } else {
      return <DatasetList datasets={searchResults} />
    }
  }

  const renderResultsCountText = () => {
    const resultCountText = isSearchLoading
          ? ""
          : (`${searchMetadata.totalDatasets || "No"} datasets found`)
    const resultCountQueryText = query
          ? ` for "${query}"`
          : ""
    return <div className="result-count">{`${resultCountText}${resultCountQueryText}`}</div>
  }

  const token = sessionStorage.getItem("api-token")

  if (error) {
    return (
      <ErrorComponent
        errorText={
          "We were unable to fetch the datasets, please refresh the page to try again"
        }
      />
    )
  } else {
    return (
      <dataset-list-view>
        <div className="left-section">
          <LoginZone token={token} />
          <Checkbox
            clickHandler={toggleApiAccessible}
            text="API Accessible"
            selected={apiAccessible}
          />
          <FacetSidebar
            availableFacets={searchMetadata.facets}
            appliedFacets={facets}
            clickHandler={toggleFacet}
          />
        </div>
        <div className="right-section">
          <Search
            className="search"
            defaultText={query}
            placeholder="Search datasets"
            callback={updateSearchText}
          />
          <div className="list-header">
            {renderResultsCountText()}
            <Select
              className="sort-select"
              label="order by"
              options={createSortOptions()}
              selectChangeCallback={updateSortBy}
            />
          </div>
          {renderDatasetList()}
          <Paginator
            className="paginator"
            numberOfPages={numberOfPages}
            currentPage={pageNumber}
            pageChangeCallback={updateCurrentPage}
          />
        </div>
      </dataset-list-view>
    )
  }
}

DatasetListView.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchMetadata: PropTypes.object.isRequired,
  pageNumber: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  queryParamsManager: PropTypes.object.isRequired,
  datasetSearch: PropTypes.func.isRequired
}
export default DatasetListView
