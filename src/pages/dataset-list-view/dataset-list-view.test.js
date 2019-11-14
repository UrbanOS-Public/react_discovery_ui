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
  beforeEach(() => {});
  // describe("component did update", () => {
  //   it("sets query string parameters based on search parameters changing", () => {
  //     let navigationSpy = jest.fn();
  //     subject = createSubject({ navigationSpy });
  //     const searchParams = {
  //       limit: 10,
  //       offset: 0,
  //       apiAccessible: true,
  //       query: "money",
  //       sort: "modified_date"
  //     };
  //     subject.setProps({ searchParams });
  //     expectSearchStringContains(navigationSpy, "q=money");
  //     expectSearchStringContains(navigationSpy, "sort=modified_date");
  //     expectSearchStringContains(navigationSpy, "apiAccessible=true");
  //   });

  //   it("sets query string parameters based on default search parameters even if the query string is empty", () => {
  //      /**
  //       The first time that the dataset list view updates, if the query string is empty, it can go into an infinite loop.
  //       The url string and props (search params) are out of sync.
  //       Because props HAVE NOT changed, componentDidUpdate updates the props to match the url string.
  //       The url string is empty and the props are attempted to be changed to their defaults.
  //       Because there is no change, we repeat the loop.
  //     **/
  //     let navigationSpy = jest.fn();
  //     const searchParams = {
  //       limit: 10,
  //       offset: 0,
  //       apiAccessible: true,
  //       query: "money",
  //       sort: "modified_date"
  //     };
  //     // Given the search params and a blank url
  //     subject = createSubject({ navigationSpy, searchParams }, "");

  //     // The url and props are out of sync, the props haven't changed, and the url is blank
  //     subject.setProps({ searchParams });

  //     // The url is updated with the search params
  //     expectSearchStringContains(navigationSpy, "q=money");
  //     expectSearchStringContains(navigationSpy, "sort=modified_date");
  //     expectSearchStringContains(navigationSpy, "apiAccessible=true");
  //   });

  //   it("sets query string page number based on the page number prop", () => {
  //     let navigationSpy = jest.fn();
  //     subject = createSubject({ navigationSpy });
  //     const searchParams = {
  //       limit: 10,
  //       offset: 0,
  //       apiAccessible: true,
  //       query: "money",
  //       sort: "modified_date"
  //     };
  //     subject.setProps({ searchParams, pageNumber: 10 });
  //     expectSearchStringContains(navigationSpy, "page=10");
  //   });

  //   it("sets search parameters based on query string parameters changing", () => {
  //     let updateDatasetSearchParams = jest.fn();
  //     subject = createSubject({ updateDatasetSearchParams });

  //     subject.setProps({
  //       location: { search: "?q=money&sort=modified_date&apiAccessible=true" }
  //     });

  //     expect(updateDatasetSearchParams).toHaveBeenLastCalledWith({
  //       query: "money",
  //       sort: "modified_date",
  //       apiAccessible: true,
  //       facets: undefined,
  //       offset: 0
  //     });
  //   });

  //   it("a query string page of 1 returns the proper offset", () => {
  //     let updateDatasetSearchParams = jest.fn();
  //     subject = createSubject({ updateDatasetSearchParams, searchParams: {offset: 10} });

  //     subject.setProps({
  //       location: { search: "?q=money&sort=modified_date&apiAccessible=true&page=1" }
  //     });

  //     expect(updateDatasetSearchParams).toHaveBeenLastCalledWith({
  //       query: "money",
  //       sort: "modified_date",
  //       apiAccessible: true,
  //       facets: undefined,
  //       offset: 0
  //     });
  //   });

  //   it("sets search offset based on query string page number", () => {
  //     const defaultSearchParams = {
  //       limit: 10,
  //       offset: 0,
  //       apiAccessible: false,
  //       query: "",
  //       sort: "default"
  //     };

  //     const expectedSearchParams = {
  //       offset: 90,
  //       apiAccessible: false,
  //       query: "",
  //       sort: "default"
  //     };

  //     let updateDatasetSearchParams = jest.fn();
  //     subject = createSubject({
  //       updateDatasetSearchParams,
  //       searchParams: defaultSearchParams
  //     });
  //     subject.setProps({ location: { search: "?page=10" } });

  //     expect(updateDatasetSearchParams).toHaveBeenLastCalledWith(
  //       expectedSearchParams
  //     );
  //   });
  // });

  describe("action dispatches", () => {
    // it("initializes search parameters with any found in the url", () => {
    //   const updateDatasetSearchParams = jest.fn();
    //   subject = createSubject(
    //     { updateDatasetSearchParams },
    //     "?q=monkey&sort=name_desc&apiAccessible=true"
    //   );

    //   expect(updateDatasetSearchParams).toHaveBeenCalledWith({
    //     query: "monkey",
    //     sort: "name_desc",
    //     apiAccessible: true,
    //     facets: undefined,
    //     offset: 0
    //   });
    // });

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
      const updateSortBy = jest.fn()

      subject = createSubject({queryParamsManager: { updateSortBy }})
      subject
        .find(Select)
        .props()
        .selectChangeCallback("stuff")

      expect(updateSortBy).toHaveBeenCalledWith("stuff")
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

    // We shouldn't care about the difference between one and many facet clicks here
    // it("adds additional facets to query parameters when a new facet is clicked", () => {
    //   const updateDatasetSearchParams = jest.fn();
    //   const searchParams = { facets: { organization: ["things"] } };
    //   subject = createSubject({ updateDatasetSearchParams, searchParams });
    //   subject
    //     .find(FacetSidebar)
    //     .props()
    //     .clickHandler("organization", "stuff");

    //   expect(updateDatasetSearchParams).toHaveBeenCalledWith({
    //     facets: { organization: ["stuff"] },
    //     offset: 0
    //   });
    // });

    // it("removes facets in query parameters when a lone facet is toggled", () => {
    //   const updateDatasetSearchParams = jest.fn();
    //   const searchParams = { facets: { organization: ["things"] } };
    //   subject = createSubject({ updateDatasetSearchParams, searchParams });
    //   subject
    //     .find(FacetSidebar)
    //     .props()
    //     .clickHandler("organization", "things");

    //   expect(updateDatasetSearchParams).toHaveBeenCalledWith({
    //     facets: { organization: ["things"] },
    //     offset: 0
    //   });
    // });

    // it("toggles facets in query parameters when facet is clicked and other facets exist", () => {
    //   const updateDatasetSearchParams = jest.fn();
    //   const searchParams = { facets: { keyword: ["things", "stuff"] } };
    //   subject = createSubject({ updateDatasetSearchParams, searchParams });
    //   subject
    //     .find(FacetSidebar)
    //     .props()
    //     .clickHandler("keyword", "things");

    //   expect(updateDatasetSearchParams).toHaveBeenCalledWith({
    //     facets: { keyword: ["things"] },
    //     offset: 0
    //   });
    // });

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
      const updateCurrentPage = jest.fn()

      subject = createSubject({queryParamsManager: {updateCurrentPage}})
      subject
        .find(Paginator)
        .props()
        .pageChangeCallback(9000, 20)

      expect(updateCurrentPage).toHaveBeenCalledWith(9000, 20)
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
  });
});

function expectSearchStringContains(navigationSpy, string, historyIndex = 0) {
  expect(navigationSpy.mock.calls.length).toBeGreaterThan(historyIndex);
  expect(navigationSpy.mock.calls[historyIndex][0].search).toMatch(
    encodeURI(string)
  );
}

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
