import { shallow } from "enzyme";
import { Tab, TabPanel } from "react-tabs";

import DatasetView from "./dataset-view";
import QueryView from "../query-view";
import ChartView from "../chart-view";
import DatasetDetailView from "../dataset-detail-view";
import LoadingElement from "../../components/generic-elements/loading-element";
import SaveButtonPopover from "../../components/save-button-popover";
import UserPageButtonPopover from "../../components/user-page-button-popover"

describe("dataset view", () => {
  let subject;
  beforeEach(() => {
    subject = createSubject()
  });

  it("has three tabs", () => {
    expect(subject.find(Tab).length).toEqual(3);
  });

  it("has three tab panels", () => {
    expect(subject.find(TabPanel).length).toEqual(3);
  });

  it("has a dataset details component", () => {
    expect(subject.find(DatasetDetailView).length).toEqual(1);
  });

  it("has a chart view component", () => {
    expect(subject.find(ChartView).length).toEqual(1);
  })

  it("passes shouldAutoExecuteQuery property to the chart view", () => {
    expect(subject.find(ChartView).props().shouldAutoExecuteQuery).toBe(true)
  })

  it("has a query view component", () => {
    expect(subject.find(QueryView).length).toEqual(1);
  })

  it("passes shouldAutoExecuteQuery property to the query view", () => {
    expect(subject.find(QueryView).props().shouldAutoExecuteQuery).toBe(true)
  })

  it("displays the save icon in the header", () => {
    expect(subject.find(SaveButtonPopover)).toHaveLength(1)
  })

  it("displays the user page icon in the header", () => {
    expect(subject.find(UserPageButtonPopover)).toHaveLength(1)
  })
})

describe("dataset view when dataset is not loaded", () => {
  let subject;
  beforeEach(() => {
    subject = createSubject({ isDatasetLoaded: false })
  })

  it("shows a loading element", () => {
    expect(subject.find(LoadingElement)).toHaveLength(1)
  })

  it("does not have a dataset details component", () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(0)
  })
})

describe("dataset view for a remote dataset", () => {
  let subject;
  beforeEach(() => {
    subject = createSubject({isRemoteDataset: true})
  })

  it("shows a DatasetDetailView", () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(1)
  })

  it("does not show tabs", () => {
    expect(subject.find(Tab)).toHaveLength(0)
  })
})

describe("dataset view for a host dataset", () => {
  let subject;
  beforeEach(() => {
    subject = createSubject({isHostDataset: true})
  })

  it("shows a DatasetDetailView", () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(1)
  })

  it("does not show tabs", () => {
    expect(subject.find(Tab)).toHaveLength(0)
  })
})

const createSubject = (props = {} ) => {
  const defaultProps = {
    match: { params: { organizationName: "org", datasetName: "dataset" } },
    dataset: {},
    location: { search: "?systemName=org__dataset" },
    systemName: "org__dataset",
    retrieveDatasetDetails: jest.fn(),
    setQuery: jest.fn(),
    resetQuery: jest.fn(),
    isDatasetLoaded: true,
    isHostDataset: false,
    isRemoteDataset: false,
    reset: jest.fn(),
    shouldAutoExecuteQuery: true,
    auth: {isAuthenticated: true}
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<DatasetView {...propsWithDefaults}/>)
}
