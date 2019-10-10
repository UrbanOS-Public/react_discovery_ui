import React from "react";
import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InlineSVG from "react-svg-inline";
import qs from "qs";

import "./dataset-view.scss";
import chart from "../../assets/chart.svg";
import sqlIcon from "../../assets/blk-database.svg";
import DatasetQueryView from "../dataset-query-view";
import DatasetVisualizationView from "../dataset-visualization-view";
import DatasetDetailView from "../dataset-detail-view";
import LoadingElement from "../../components/generic-elements/loading-element";

export default class extends Component {
  constructor() {
    super();
    this.state = { index: 0 };
  }

  componentDidMount() {
    this.props.resetQuery();

    this.props.retrieveDatasetDetails(
      this.props.match.params.organizationName,
      this.props.match.params.datasetName
    );

    if (this.state.index != this.getIndexFromQueryParams()) {
      this.setState({ index: this.getIndexFromQueryParams() });
    }
  }

  getIndexFromQueryParams() {
    const { selectedIndex } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    return selectedIndex ? parseInt(selectedIndex) : 0;
  }

  render() {
    if (!this.props.isDatasetLoaded) {
      return (
        <dataset-visualization>
          <LoadingElement />
        </dataset-visualization>
      );
    }

    const systemName = this.props.dataset.systemName;

    if (this.props.isRemoteDataset || this.props.isHostDataset) {
      return <DatasetDetailView match={this.props.match} />;
    }

    return (
      <Tabs
        className="dataset-view"
        selectedIndex={this.state.index}
        onSelect={tabIndex => this.setState({ index: tabIndex })}
      >
        <TabList>
          <Tab>Dataset Details</Tab>
          <Tab>
            Visualize
            <InlineSVG
              id="chartIcon"
              style={{ marginLeft: ".3rem" }}
              svg={chart}
              height="inherit"
              width={"25px"}
              accessibilityDesc="Chart"
            />
          </Tab>
          <Tab>
            Write SQL{" "}
            <InlineSVG
              id="sqlIcon"
              svg={sqlIcon}
              height="14px"
              width="14px"
              accessibilityDesc="Sql Icon"
            />
          </Tab>
        </TabList>

        <TabPanel forceRender={true}>
          <DatasetDetailView match={this.props.match} />
        </TabPanel>
        <TabPanel>
          <DatasetVisualizationView
            match={this.props.match}
            systemName={systemName}
          />
        </TabPanel>
        <TabPanel>
          <DatasetQueryView systemName={systemName} />
        </TabPanel>
      </Tabs>
    );
  }
}
