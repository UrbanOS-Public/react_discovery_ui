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

      subject = createSubject({ searchParamsManager: { updateSearchText } })
      subject
        .find(Search)
        .props()
        .callback("my search term");

      expect(updateSearchText).toHaveBeenCalledWith("my search term")
    });

    it("sorts datasets with provided sort field", () => {
      const updateSortOrder = jest.fn()

      subject = createSubject({searchParamsManager: { updateSortOrder }})
      subject
        .find(Select)
        .props()
        .selectChangeCallback("stuff")

      expect(updateSortOrder).toHaveBeenCalledWith("stuff")
    });

    it("filters datasets with the provided facets", () => {
      const toggleFacet = jest.fn()

      subject = createSubject({searchParamsManager: {toggleFacet}})
      subject
        .find(FacetSidebar)
        .props()
        .clickHandler("organization", "stuff");

      expect(toggleFacet).toHaveBeenCalledWith("organization", "stuff")
    });

    it("update search results when api accessible toggle is clicked", () => {
      const toggleApiAccessible = jest.fn()

      subject = createSubject({searchParamsManager: {toggleApiAccessible}})

      subject
        .find(Checkbox)
        .props()
        .clickHandler()

      expect(toggleApiAccessible).toHaveBeenCalled()
    });

    it("update search results when page is changed", () => {
      const updatePage = jest.fn()

      subject = createSubject({searchParamsManager: {updatePage}})
      subject
        .find(Paginator)
        .props()
        .pageChangeCallback(9000)

      expect(updatePage).toHaveBeenCalledWith(9000)
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
      subject = createSubject({ isError: true });
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
      subject = createSubject({ searchParamsManager: { apiAccessible: true } });
      expect(subject.find(Checkbox).props().selected).toBeTruthy();
    });

    it("apiAccessible is not checked when supplied property is false", () => {
      subject = createSubject({ searchParamsManager: { apiAccessible: false } });
      expect(subject.find(Checkbox).props().selected).toBeFalsy();
    });

    it("search component is given search text from the query params manager", () => {
      subject = createSubject({ searchParamsManager: { searchText: 'hullo'} });
      expect(subject.find(Search).props().defaultText).toEqual('hullo');
    });

    it("sort order dropdown is given the sort order from the query params manager", () => {
      subject = createSubject({ searchParamsManager: { sortOrder: 'last_mod'} });
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
  const defaultProps = {
    isError: false,
    isSearchLoading: false,
    searchMetadata: {},
    searchResults: [],
    numberOfPages: 2,
    searchParamsManager: {}
  };

  const defaultSearchParams = {
    apiAccessible: true,
    sortOrder: 'name_asc',
    page: 1,
    searchText: '',
    facets: {},

    toggleApiAccessible: jest.fn(),
    updateSortOrder: jest.fn(),
    updateSearchText: jest.fn(),
    updatePage: jest.fn(),
    toggleFactes: jest.fn()
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props);
  propsWithDefaults.searchParamsManager = Object.assign({}, defaultSearchParams, props.searchParamsManager)

  return shallow(<DatasetListView {...propsWithDefaults} />);
}
