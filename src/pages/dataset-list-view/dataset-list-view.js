import "./dataset-list-view.scss"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AlertComponent from '../../components/generic-elements/alert-component'
import DatasetList from "../../components/dataset-list"
import Paginator from "../../components/generic-elements/paginator"
import Select from "../../components/generic-elements/select"
import Search from "../../components/generic-elements/search"
import FacetSidebar from "../../components/facet-sidebar"
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
    isGlobalError,
    globalErrorMessage,
    dismissGlobalError
  } = props

  const createSortOptions = () => {
    return [
      {
        value: "name_asc",
        label: "Name Ascending",
        default: searchParamsManager.sortOrder === "name_asc" || searchParamsManager.sortOrder === "start"
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
      },
      {
        value: "relevance",
        label: "Relevance",
        default: searchParamsManager.sortOrder === "relevance"
      }
    ]
  }

  const renderDatasetList = () => {
    if (isSearchLoading) {
      return <LoadingElement />
    } else {
      document.body.className="body-dataset-lists"
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
    if (searchMetadata.totalDatasets === 0) {
      return <div data-testid="result-count" className="result-count">{`${resultCountText}${resultCountQueryText}`}<br /><Link id="home" to="/">Click here to return home</Link></div>
    } else {
      return <div data-testid="result-count" className="result-count">{`${resultCountText}${resultCountQueryText}`}</div>
    }
  }

    return (
      <dataset-list-view>
          <Search
            className="search"
            defaultText={searchParamsManager.searchText}
            placeholder="Search datasets"
      callback={searchParamsManager.updateSearchText}
          />
        <div className="left-section">
          <Auth0LoginZone />
          <div style={{height: '0.5rem'}} >
          <Checkbox
      clickHandler={searchParamsManager.toggleApiAccessible}
            text="Only Show API Accessible Datasets"
      selected={searchParamsManager.apiAccessible}
          />
          </div>
          <FacetSidebar
            availableFacets={searchMetadata.facets}
      appliedFacets={searchParamsManager.facets}
      clickHandler={searchParamsManager.toggleFacet}
          />
        </div>
        <div className="right-section">
        <AlertComponent errorMessage={globalErrorMessage} closeFunction={dismissGlobalError} showAlert={isGlobalError} />

          <div className="list-header">
            {renderResultsCountText()}
            <div className="sort-by"><Select
              className="searchParamsManager.sortOrder-select"
              label="order by"
              options={createSortOptions()}
      selectChangeCallback={searchParamsManager.updateSortOrder}
              testId='sort-select'
            />
            </div>
          </div>
          {renderDatasetList()}
          <div className="paginator-container"><Paginator
            className="paginator"
            numberOfPages={numberOfPages}
      currentPage={searchParamsManager.page}
      pageChangeCallback={searchParamsManager.updatePage}
          />
          </div>
        </div>
      </dataset-list-view>
    )
  }

DatasetListView.propTypes = {
  searchParamsManager: PropTypes.shape(SearchParamsManager.propTypes),
  searchResults: PropTypes.array.isRequired,
  searchMetadata: PropTypes.object.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  isGlobalError: PropTypes.bool,
  globalErrorMessage: PropTypes.string,
  dismissGlobalError: PropTypes.func
}

export default DatasetListView
