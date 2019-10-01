import React from 'react'
import { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import InlineSVG from 'react-svg-inline'
import qs from 'qs'

import chart from '../../assets/chart.svg'
import sqlIcon from '../../assets/blk-database.svg'
import DatasetQueryView from '../dataset-query-view'
import DatasetVisualizationView from '../dataset-visualization-view'
import DatasetDetailView from '../dataset-detail-view'
import LoadingElement from '../../components/generic-elements/loading-element'

// const DatasetView = (props) => {
// props.retrieveDatasetDetails(props.match.params.organizationName, props.match.params.datasetName)
export default class extends Component {
    componentDidMount() {
        this.props.retrieveDatasetDetails(this.props.match.params.organizationName, this.props.match.params.datasetName)
    }
    render() {
        if (!this.props.dataset) {
            return (
                <dataset-visualization>
                    <LoadingElement />
                </dataset-visualization>)
        }

        console.log("view")
        console.log(this.props)
        const { selectedIndex } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        const index = selectedIndex ? parseInt(selectedIndex) : 0
        const systemName = this.props.dataset.systemName

        return (
            <Tabs className='dataset-view' forceRenderTabPanel={true} selectedIndex={index} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                    <Tab>Dataset Details</Tab>
                    <Tab>Visualize<InlineSVG style={{ 'marginLeft': '.3rem' }} svg={chart} height='inherit' width={'25px'} accessibilityDesc='Chart' /></Tab>
                    <Tab>Write SQL <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' /></Tab>
                </TabList>

                <TabPanel>
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

// export default DatasetView