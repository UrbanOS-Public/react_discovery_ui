import { mount } from 'enzyme'
import ReactTooltip from 'react-tooltip'
import RecommendationList from './recommendation-list'
import { recommendations } from '../../../test-helpers/recommendations'
import { act } from 'react-dom/test-utils'

let subject

describe('RecommendationList', () => {
  describe('with data', () => {
    beforeEach(() => {
      subject = mount(<RecommendationList
        recommendations={recommendations}
                      />)
    })

    test('returns urls for each recommended dataset', () => {
      expect(subject.find('.recommendation').length).toEqual(recommendations.length)
    })

    test('shows tooltips with table names for copy buttons', () => {
      expect(subject.contains(ReactTooltip)).toBeTruthy()
      const tooltips = subject.find(ReactTooltip).map((elem) => elem.text())
      expect(tooltips).toContain(`Copy table name '${recommendations[0].systemName}'`)
    })

    test('copy button changes tooltip text to "Copied" when it is clicked', () => {
      subject.find('.copy-table-name-icon').at(0).simulate('click')
      expect(subject.find(ReactTooltip).at(0).text()).toEqual('Copied!')
    })

    test('tooltip changes back to table name text after it disapears', () => {
      subject.find('.copy-table-name-icon').at(0).simulate('click')
      act(() => { subject.find(ReactTooltip).at(0).prop('afterHide')() })
      expect(subject.find(ReactTooltip).at(0).text()).toEqual(`Copy table name '${recommendations[0].systemName}'`)
    })
  })
})
