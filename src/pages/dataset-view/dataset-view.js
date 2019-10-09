import React from 'react'
import { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import qs from 'qs'

import './dataset-view.scss'
import SQLIcon from '../../components/generic-elements/sql-icon'
import ChartIcon from '../../components/generic-elements/chart-icon'
import DatasetQueryView from '../dataset-query-view'
import DatasetVisualizationView from '../dataset-visualization-view'
import DatasetDetailView from '../dataset-detail-view'
import LoadingElement from '../../components/generic-elements/loading-element'

export default class extends Component {
    constructor() {
        super()
        this.state = { index: 0 }
    }


    componentDidMount() {
        this.props.retrieveDatasetDetails(this.props.match.params.organizationName, this.props.match.params.datasetName)

        if (this.state.index != this.getIndexFromQueryParams()) {
            this.setState({ index: this.getIndexFromQueryParams() })
        }
    }

    getIndexFromQueryParams() {
        const { selectedIndex } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        return (selectedIndex ? parseInt(selectedIndex) : 0)
    }

    render() {
        if (!this.props.dataset) {
            return (
                <dataset-visualization>
                    <LoadingElement />
                </dataset-visualization>)
        }

        const systemName = this.props.dataset.systemName

        if (this.props.dataset.sourceType == "remote") {
            return (<DatasetDetailView match={this.props.match} />)
        }

        return (
            <Tabs className='dataset-view' selectedIndex={this.state.index} onSelect={tabIndex => this.setState({ index: tabIndex })}>
                <TabList>
                    <Tab>Dataset Details</Tab>
                    <Tab>Visualize <ChartIcon className='chartIcon'/></Tab>
                    <Tab>Write SQL <SQLIcon className='sqlIcon'/></Tab>
                </TabList>

                <TabPanel forceRender={true}>
                    <DatasetDetailView match={this.props.match} />
                </TabPanel>
                <TabPanel>
                    <DatasetVisualizationView match={this.props.match} systemName={systemName} />
                </TabPanel>
                <TabPanel>
                    <DatasetQueryView systemName={systemName} />
                </TabPanel>
            </ Tabs >
        )
    }
}