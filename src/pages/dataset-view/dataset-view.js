import React from "react";
import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import qs from "qs";

import "./dataset-view.scss";
import QueryView from "../query-view";
import ChartView from "../chart-view";
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
          <Tab>Visualize <ChartIcon className='chartIcon' /></Tab>
          <Tab>Write SQL <SQLIcon className='sqlIcon' /></Tab>
        </TabList>

        <TabPanel forceRender={true}>
          <DatasetDetailView match={this.props.match} />
        </TabPanel>
        <TabPanel>
          <ChartView match={this.props.match} systemName={systemName} />
        </TabPanel>
        <TabPanel>
          <QueryView systemName={systemName} />
        </TabPanel>
      </Tabs>
    );
  }
}
