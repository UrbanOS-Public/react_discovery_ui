import { shallow } from 'enzyme'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import DatasetView from './dataset-view'
import DatasetQueryView from '../dataset-query-view'
import DatasetVisualizationView from '../dataset-visualization-view/dataset-visualization-view'
import DatasetDetailView from '../dataset-detail-view'

describe('dataset visualization view', () => {
    let subject
    beforeEach(() => {
        subject = shallow(
            <DatasetView location={{ 'search': '?systemName=org__dataset' }} systemName={'org__dataset'} />)
    })

    it('has three tabs', () => {
        expect(subject.find(Tab).length).toEqual(3)
    })

    it('has three tab panels', () => {
        expect(subject.find(TabPanel).length).toEqual(3)
    })

    it('has a dataset details component', () => {
        expect(subject.find(DatasetDetailView).length).toEqual(1)
    })

    it('has a dataset visualization view component', () => {
        expect(subject.find(DatasetVisualizationView).length).toEqual(1)
    })

    it('has a dataset query view component', () => {
        expect(subject.find(DatasetQueryView).length).toEqual(1)
    })
})
