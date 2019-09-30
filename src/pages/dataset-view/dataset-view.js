import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import InlineSVG from 'react-svg-inline'
import qs from 'qs'

import chart from '../../assets/chart.svg'
import sqlIcon from '../../assets/blk-database.svg'
import DatasetQueryView from '../dataset-query-view'
import DatasetVisualizationView from '../dataset-visualization-view'
import DatasetDetailView from '../dataset-detail-view'

const DatasetView = (props) => {
    const { systemName } = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    return (
        <Tabs className='dataset-view' forceRenderTabPanel={true}>
            <TabList>
                <Tab>Dataset Details</Tab>
                <Tab>Visualize <InlineSVG id='chartIcon' svg={chart} height='20px' width='20px' accessibilityDesc='Chart' /></Tab>
                <Tab>Write SQL <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' /></Tab>
            </TabList>

            <TabPanel>
                <DatasetDetailView match={props.match} />
            </TabPanel>
            <TabPanel>
                <DatasetVisualizationView match={props.match} systemName={systemName} />
            </TabPanel>
            <TabPanel>
                <DatasetQueryView systemName={systemName} />
            </TabPanel>
        </Tabs >
    )
}

export default DatasetView