import { shallow, mount } from "enzyme";
import DatasetListView from "./dataset-list-view";
import Paginator from "../../components/generic-elements/paginator";
import Select from "../../components/generic-elements/select";
import Search from "../../components/generic-elements/search";
import ErrorComponent from "../../components/generic-elements/error-component";
import LoadingElement from "../../components/generic-elements/loading-element";
import FacetSidebar from "../../components/facet-sidebar";
import Checkbox from "../../components/generic-elements/checkbox";

let subject;

describe("dataset list view", () => {
  describe("action dispatches", () => {
    it("searches datasets with provided search text", () => {
      const updateSearchText = jest.fn()

      subject = createSubject({ queryParamsManager: { updateSearchText } })
      subject
        .find(Search)
        .props()
        .callback("my search term");

      expect(updateSearchText).toHaveBeenCalledWith("my search term")
    });

    it("sorts datasets with provided sort field", () => {
      const updateSortOrder = jest.fn()

      subject = createSubject({queryParamsManager: { updateSortOrder }})
      subject
        .find(Select)
        .props()
        .selectChangeCallback("stuff")

      expect(updateSortOrder).toHaveBeenCalledWith("stuff")
    });

    it("filters datasets with the provided facets", () => {
      const toggleFacet = jest.fn()

      subject = createSubject({queryParamsManager: {toggleFacet}})
      subject
        .find(FacetSidebar)
        .props()
        .clickHandler("organization", "stuff");

      expect(toggleFacet).toHaveBeenCalledWith("organization", "stuff")
    });

    it("update search results when api accessible toggle is clicked", () => {
      const toggleApiAccessible = jest.fn()

      subject = createSubject({queryParamsManager: {toggleApiAccessible}})

      subject
        .find(Checkbox)
        .props()
        .clickHandler()

      expect(toggleApiAccessible).toHaveBeenCalled()
    });

    it("update search results when page is changed", () => {
      const updatePage = jest.fn()

      subject = createSubject({queryParamsManager: {updatePage}})
      subject
        .find(Paginator)
        .props()
        .pageChangeCallback(9000, 20)

      expect(updatePage).toHaveBeenCalledWith(9000, 20)
    });
  });

  describe("renders correctly", () => {
    it("sets the paginator total count based on the props", () => {
      const expectedNumberOfPages = 4;
      subject = createSubject({ numberOfPages: expectedNumberOfPages });
      expect(subject.find(Paginator).props().numberOfPages).toEqual(
        expectedNumberOfPages
      );
    });

    it("shows error message when the error property is true", () => {
      subject = createSubject({ error: true });
      expect(subject.find(ErrorComponent)).toHaveLength(1);
    });

    it("shows a loading spinner when the loading property is true", () => {
      subject = createSubject({ isSearchLoading: true });
      expect(subject.find(LoadingElement)).toHaveLength(1);
    });

    it("does not show a loading spinner when the loading property is false", () => {
      subject = createSubject({ isSearchLoading: false });
      expect(subject.find(LoadingElement)).toHaveLength(0);
    });

    it("apiAccessible is checked when supplied property is true", () => {
      subject = createSubject({ queryParamsManager: { apiAccessible: true } });
      expect(subject.find(Checkbox).props().selected).toBeTruthy();
    });

    it("apiAccessible is not checked when supplied property is false", () => {
      subject = createSubject({ queryParamsManager: { apiAccessible: false } });
      expect(subject.find(Checkbox).props().selected).toBeFalsy();
    });

    it("search component is given search text from the query params manager", () => {
      subject = createSubject({ queryParamsManager: { searchText: 'hullo'} });
      expect(subject.find(Search).props().defaultText).toEqual('hullo');
    });

    it("sort order dropdown is given the sort order from the query params manager", () => {
      subject = createSubject({ queryParamsManager: { sortOrder: 'last_mod'} });
      expect(subject.find(Select).props().options).toContainEqual(
        expect.objectContaining({
        value: "last_mod",
        default: true
        })
      );
    });
  });
});

function createSubject(props, queryString = "") {
  const navigationSpy = props.navigationSpy || jest.fn();
  const datasetSearch = props.datasetSearch || jest.fn();
  const updateDatasetSearchParams = props.updateDatasetSearchParams || jest.fn();

  props.searchParams = defaultSearchParams(props.searchParams);

  const defaultProps = {
    datasets: [],
    facets: [],
    totalDatasets: 12,
    error: false,
    isSearchLoading: false,
    history: { push: navigationSpy },
    datasetSearch: datasetSearch,
    updateDatasetSearchParams: updateDatasetSearchParams,
    location: { search: queryString },
    searchMetadata: {},
    searchResults: [],
    searchParams: props.searchParams,
    numberOfPages: 2,
    pageNumber: 0,
    queryParamsManager: {}
  };

  const defaultQueryParams = {
    toggleApiAccessible: jest.fn(),

    apiAccessible: true
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props);
  propsWithDefaults.queryParamsManager = Object.assign({}, defaultQueryParams, props.queryParamsManager)
  return shallow(<DatasetListView {...propsWithDefaults} />);
}

function defaultSearchParams(params) {
  const defaultSearchParams = {
    limit: 10,
    offset: 0,
    apiAccessible: false,
    query: "",
    sort: "default"
  };

  return Object.assign({}, defaultSearchParams, params);
}
