import "./dataset-list-view.scss"
import PropTypes from 'prop-types'
import DatasetList from "../../components/dataset-list"
import Paginator from "../../components/generic-elements/paginator"
import Select from "../../components/generic-elements/select"
import Search from "../../components/generic-elements/search"
import FacetSidebar from "../../components/facet-sidebar"
import ErrorComponent from "../../components/generic-elements/error-component"
import LoadingElement from "../../components/generic-elements/loading-element"
import Checkbox from "../../components/generic-elements/checkbox"
import { SearchParamsManager } from "../../search-params/search-params-manager"
import Auth0LoginZone from '../../components/auth0-login-zone'

const DatasetListView = (props) => {
  const {
    searchParamsManager,
    searchResults,
    searchMetadata,
    numberOfPages,

    isSearchLoading,
    isError
  } = props


  const createSortOptions = () => {
    return [
      {
        value: "name_asc",
        label: "Name Ascending",
        default: searchParamsManager.sortOrder === "name_asc"
      },
      {
        value: "name_desc",
        label: "Name Descending",
        default: searchParamsManager.sortOrder === "name_desc"
      },
      {
        value: "last_mod",
        label: "Last Modified",
        default: searchParamsManager.sortOrder === "last_mod"
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
    const resultCountQueryText = searchParamsManager.searchText
          ? ` for "${searchParamsManager.searchText}"`
          : ""
    return <div className="result-count">{`${resultCountText}${resultCountQueryText}`}</div>
  }

  if (isError) {
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
          <Auth0LoginZone />
          <Checkbox
      clickHandler={searchParamsManager.toggleApiAccessible}
            text="API Accessible"
      selected={searchParamsManager.apiAccessible}
          />
          <FacetSidebar
            availableFacets={searchMetadata.facets}
      appliedFacets={searchParamsManager.facets}
      clickHandler={searchParamsManager.toggleFacet}
          />
        </div>
        <div className="right-section">
          <Search
            className="search"
            defaultText={searchParamsManager.searchText}
            placeholder="Search datasets"
      callback={searchParamsManager.updateSearchText}
          />
          <div className="list-header">
            {renderResultsCountText()}
            <Select
              className="searchParamsManager.sortOrder-select"
              label="order by"
              options={createSortOptions()}
      selectChangeCallback={searchParamsManager.updateSortOrder}
            />
          </div>
          {renderDatasetList()}
          <Paginator
            className="paginator"
            numberOfPages={numberOfPages}
      currentPage={searchParamsManager.page}
      pageChangeCallback={searchParamsManager.updatePage}
          />
        </div>
      </dataset-list-view>
    )
  }
}

DatasetListView.propTypes = {
  searchParamsManager: PropTypes.shape(SearchParamsManager.propTypes),
  searchResults: PropTypes.array.isRequired,
  searchMetadata: PropTypes.object.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool
}

export default DatasetListView
