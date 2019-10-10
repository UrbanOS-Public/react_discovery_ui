import { shallow } from "enzyme";
import { Tab, TabPanel } from "react-tabs";

import DatasetView from "./dataset-view";
import QueryView from "../query-view";
import ChartView from "../chart-view";
import DatasetDetailView from "../dataset-detail-view";
import LoadingElement from "../../components/generic-elements/loading-element";

describe("dataset view", () => {
  let subject;
  beforeEach(() => {
    subject = shallow(
      <DatasetView
        match={{ params: { organizationName: "org", datasetName: "dataset" } }}
        dataset={{}}
        location={{ search: "?systemName=org__dataset" }}
        systemName={"org__dataset"}
        retrieveDatasetDetails={jest.fn()}
        setQuery={jest.fn()}
        resetQuery={jest.fn()}
        isDatasetLoaded={true}
      />
    );
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

  it("has a dataset visualization view component", () => {
    expect(subject.find(ChartView).length).toEqual(1);
  });

  it("has a dataset query view component", () => {
    expect(subject.find(QueryView).length).toEqual(1);
  })
})

describe("dataset view when dataset is not loaded", () => {
  let subject;
  beforeEach(() => {
    subject = shallow(
      <DatasetView
        match={{ params: { organizationName: "org", datasetName: "dataset" } }}
        dataset={{}}
        location={{ search: "?systemName=org__dataset" }}
        systemName={"org__dataset"}
        retrieveDatasetDetails={jest.fn()}
        setQuery={jest.fn()}
        resetQuery={jest.fn()}
        isDatasetLoaded={false}
      />
    )
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
    subject = shallow(
      <DatasetView
        match={{ params: { organizationName: "org", datasetName: "dataset" } }}
        dataset={{}}
        location={{ search: "?systemName=org__dataset" }}
        systemName={"org__dataset"}
        retrieveDatasetDetails={jest.fn()}
        setQuery={jest.fn()}
        resetQuery={jest.fn()}
        isDatasetLoaded={true}
        isRemoteDataset={true}
      />
    )
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
    subject = shallow(
      <DatasetView
        match={{ params: { organizationName: "org", datasetName: "dataset" } }}
        dataset={{}}
        location={{ search: "?systemName=org__dataset" }}
        systemName={"org__dataset"}
        retrieveDatasetDetails={jest.fn()}
        setQuery={jest.fn()}
        resetQuery={jest.fn()}
        isDatasetLoaded={true}
        isHostDataset={true}
      />
    )
  })

  it("shows a DatasetDetailView", () => {
    expect(subject.find(DatasetDetailView)).toHaveLength(1)
  })

  it("does not show tabs", () => {
    expect(subject.find(Tab)).toHaveLength(0)
  })
})
