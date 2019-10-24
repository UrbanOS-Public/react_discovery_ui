import "./dataset-list-view.scss";
import { Component } from "react";
import DatasetList from "../../components/dataset-list";
import Paginator from "../../components/generic-elements/paginator";
import Select from "../../components/generic-elements/select";
import Search from "../../components/generic-elements/search";
import LoginZone from "../../components/login-zone";
import FacetSidebar from "../../components/facet-sidebar";
import ErrorComponent from "../../components/generic-elements/error-component";
import LoadingElement from "../../components/generic-elements/loading-element";
import Checkbox from "../../components/generic-elements/checkbox";
import qs from "qs";
import _ from "lodash";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateDatasetSearchParamsFromQuery();
    this.datasetSearchWithOffset(this.props.searchParams);
  }

  componentDidUpdate(previousProps) {
    const urlSearchString = this.props.location.search;
    const propSearchString = this.queryString({
      ...this.props.searchParams,
      page: this.props.pageNumber
    });

    const previousPropSearchString = this.queryString({
      ...previousProps.searchParams,
      page: previousProps.pageNumber
    });

    const stateAndUrlOutOfSync = propSearchString !== urlSearchString;
    const stateWasUpdated = propSearchString !== previousPropSearchString;

    if (stateAndUrlOutOfSync) {
      if (stateWasUpdated || !urlSearchString) {
        //update url bar to match props
        this.updateQueryParameters({
          ...this.props.searchParams,
          page: this.props.pageNumber
        });
      } else {
        //update redux state to match url bar
        this.updateDatasetSearchParamsFromQuery();
        this.datasetSearchWithOffset(this.props.searchParams);
      }
    }
  }

  updateDatasetSearchParamsFromQuery() {
    this.props.updateDatasetSearchParams({
      query: this.getQueryParam("q") || this.props.searchParams.query,
      sort: this.getQueryParam("sort") || this.props.searchParams.sort,
      facets: this.getQueryParam("facets") || this.props.searchParams.facets,
      offset:
        this.calculateOffset(
          parseInt(this.getQueryParam("page") || 1),
          this.props.searchParams.limit
        ) || this.props.searchParams.offset,
      apiAccessible:
        this.convertStringToBooleanWithDefault(
          this.getQueryParam("apiAccessible"),
          false
        ) || this.props.searchParams.apiAccessible
    });
  }

  updateQueryParameters(params) {
    this.props.history.push({
      search: this.queryString(params)
    });
  }

  convertStringToBooleanWithDefault(value, defaultValue) {
    return value == undefined ? defaultValue : _.lowerCase(value) == "true";
  }

  getQueryParam(param) {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[
      param
    ];
  }

  datasetSearchWithOffset({ pageNumber, limit, sort, query, facets, apiAccessible }) {
    const offset = this.calculateOffset(pageNumber, limit)
    this.props.datasetSearch({ offset, limit, sort, query, facets, apiAccessible });
  }

  onSearchChange(criteria) {
    this.props.updateDatasetSearchParams({
      query: criteria,
      offset: 0
    });
    this.props.datasetSearch();
  }

  onSortChange(sort) {
    this.props.updateDatasetSearchParams({
      sort: sort,
      offset: 0
    });
    this.props.datasetSearch();
  }

  onFacetClick(facetName, facetValue) {
    this.props.updateDatasetSearchParams({
      facets: { [facetName]: [facetValue] },
      offset: 0
    });
    this.props.datasetSearch();
  }

  onRemoteToggleClick() {
    this.props.updateDatasetSearchParams({
      apiAccessible: !this.props.searchParams.apiAccessible
    });
    this.props.datasetSearch();
  }

  onPageChange(page) {
    this.props.updateDatasetSearchParams({
      offset: this.calculateOffset(page, this.props.searchParams.limit)
    });
    this.props.datasetSearch();
  }

  calculateOffset(page, limit) {
    return (page - 1) * limit;
  }

  queryString({ sort, facets, apiAccessible, page, ...rest }) {
    return qs.stringify(
      { q: rest.query, sort, facets, apiAccessible, page },
      { arrayFormat: "brackets", addQueryPrefix: true }
    );
  }

  get createSortOptions() {
    return [
      {
        value: "name_asc",
        label: "Name Ascending",
        default: this.sort === "name_asc"
      },
      {
        value: "name_desc",
        label: "Name Descending",
        default: this.sort === "name_desc"
      },
      {
        value: "last_mod",
        label: "Last Modified",
        default: this.sort === "last_mod"
      }
    ];
  }

  renderLoading() {
    if (this.props.isSearchLoading) {
      return <LoadingElement />;
    } else {
      return <DatasetList datasets={this.props.searchResults} />;
    }
  }

  resultCountText() {
    if (this.props.isSearchLoading) {
      return "";
    }
    return `${this.props.searchMetadata.totalDatasets || "No"} datasets found`;
  }

  render() {
    const resultCountText = this.resultCountText();
    const resultCountQueryText = this.props.searchParams.query
      ? ` for "${this.props.searchParams.query}"`
      : "";
    const token = sessionStorage.getItem("api-token");
    if (this.props.error) {
      return (
        <ErrorComponent
          errorText={
            "We were unable to fetch the datasets, please refresh the page to try again"
          }
        />
      );
    } else {
      return (
        <dataset-list-view ref={this.pageRef}>
          <div className="left-section">
            <LoginZone token={token} />
            <Checkbox
              clickHandler={() => this.onRemoteToggleClick()}
              text="API Accessible"
              selected={this.props.searchParams.apiAccessible}
            />
            <FacetSidebar
              availableFacets={this.props.searchMetadata.facets}
              appliedFacets={this.props.searchParams.facets}
              clickHandler={(facetName, facetValue) =>
                this.onFacetClick(facetName, facetValue)
              }
            />
          </div>
          <div className="right-section">
            <Search
              className="search"
              defaultText={this.props.searchParams.query}
              placeholder="Search datasets"
              callback={searchCriteria => this.onSearchChange(searchCriteria)}
            />
            <div className="list-header">
              <div className="result-count">{`${resultCountText}${resultCountQueryText}`}</div>
              <Select
                className="sort-select"
                label="order by"
                options={this.createSortOptions}
                selectChangeCallback={sort => this.onSortChange(sort)}
              />
            </div>
            {this.renderLoading()}
            <Paginator
              className="paginator"
              numberOfPages={this.props.numberOfPages}
              currentPage={this.props.pageNumber}
              pageChangeCallback={page => this.onPageChange(page)}
            />
          </div>
        </dataset-list-view>
      );
    }
  }
}
