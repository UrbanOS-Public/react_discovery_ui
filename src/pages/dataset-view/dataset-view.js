import React from "react";
import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import qs from "qs";
import routes from "../../routes"
import { generatePath } from "react-router"

import "./dataset-view.scss";
import QueryView from "../query-view";
import ChartView from "../chart-view";
import DatasetDetailView from "../dataset-detail-view";
import LoadingElement from "../../components/generic-elements/loading-element";
import UserPageButtonPopover from "../../components/user-page-button-popover"
import SaveButtonPopover from "../../components/save-button-popover"

export default class extends Component {
  constructor(props) {
    super();
    this.state = { index: 0, localTitle: props.title || ''};
  }

  generateVisualizationLink(id) {
    return (id && generatePath(routes.visualizationView, { id: id }))
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

  handleTitleChange(event) {
    if (event.target.value !== this.state.localTitle) {
      this.setState({localTitle: event.target.value})
    }
  }

  handleSaveOrUpdate() {
    console.log("this is what were saving", this.props.idFromState, this.state.localTitle, this.props.query)
    this.props.save({ id: this.props.idFromState, title: this.state.localTitle, query: this.props.query })
  }


  render() {
    if (!this.props.isDatasetLoaded) {
      return (
        <dataset-view>
          <LoadingElement />
        </dataset-view>
      );
    }

    if (this.props.isRemoteDataset || this.props.isHostDataset) {
      return (
        <dataset-view>
          <DatasetDetailView />
        </dataset-view>
      )
    }

    return (
      <dataset-view>
        <Tabs
          className="dataset-view"
          selectedIndex={this.state.index}
          onSelect={tabIndex => this.setState({ index: tabIndex })}
        >
          <TabList className="header">
            <span className='tab-area'>
              <Tab>Dataset Details</Tab>
              <Tab>Write SQL <SQLIcon className='sqlIcon' /></Tab>
              <Tab>Visualize <ChartIcon className='chartIcon' /></Tab>
            </span>
            <span className='action-area'>
            <React.Fragment >
              <UserPageButtonPopover
                isAuthenticated={this.props.auth.isAuthenticated}
              />
              <SaveButtonPopover
                isSaveable={this.props.isSaveable}
                handleTitleChange={this.handleTitleChange.bind(this)}
                handleSaveOrUpdate={this.handleSaveOrUpdate.bind(this)}
                linkUrl={this.generateVisualizationLink(this.props.id)}
                isSaveFailure={this.props.isSaveFailure}
                isSaveSuccess={this.props.isSaveSuccess}
                localTitle={this.state.localTitle}
              />
            </React.Fragment>
          </span>
          </TabList>
          <TabPanel forceRender={true}>
            <DatasetDetailView />
          </TabPanel>
          <TabPanel>
            <QueryView shouldAutoExecuteQuery={this.props.shouldAutoExecuteQuery} />
          </TabPanel>
          <TabPanel className="visualization" selectedClassName="visualization--selected">
            <ChartView shouldAutoExecuteQuery={this.props.shouldAutoExecuteQuery} />
          </TabPanel>

        </Tabs>
      </dataset-view>
    );
  }
}
