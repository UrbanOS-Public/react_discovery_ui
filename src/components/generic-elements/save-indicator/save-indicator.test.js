import { shallow } from 'enzyme'
import SaveIndicator from './';
import LoadingElement from '../loading-element';
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import GeneratedShareLink from '../generated-share-link'

describe('SaveIndicator', () => {
  let subject

  describe('when saving is in progress', () => {
    beforeEach(() => {
      subject = shallow(<SaveIndicator saving />)
    })

    it('displays the loading element', () => {
      expect(subject.find(LoadingElement).length).toBe(1)
    })

    it('displays correct text', () => {
      expect(subject.text()).toContain("Your visualization is being saved")
    })
  })

  describe('when saving is not in progress', () => {
    describe('and save failed', () => {
      beforeEach(() => {
        subject = shallow(<SaveIndicator failure/>)
      })

      it('does not display the loading element', () => {
        expect(subject.find(LoadingElement).length).toBe(0)
      })

      it('displays a failure icon', () => {
        expect(subject.find(ErrorIcon).length).toBe(1)
      })

      it('displays correct text', () => {
        expect(subject.text()).toContain("Your visualization failed to save")
      })
    })

    describe('and save succeeded with a link path and params', () => {
      const linkPath = 'path/to/visualization'
      const linkParams = { id: '10t' }

      beforeEach(() => {
        subject = shallow(<SaveIndicator success linkPath={linkPath} linkParams={linkParams}/>)
      })

      it('does not display the loading element', () => {
        expect(subject.find(LoadingElement).length).toBe(0)
      })

      it('displays a success icon', () => {
        expect(subject.find(CheckCircleIcon).length).toBe(1)
      })

      it('displays correct text', () => {
        expect(subject.text()).toContain("Your visualization has saved")
      })

      it('displays a shareable link for the saved visualziation', () => {
        const link = subject.find(GeneratedShareLink)

        expect(link.length).toBe(1)
        expect(link.props().path).toBe(linkPath)
        expect(link.props().params).toBe(linkParams)
      })
    })

    describe('and save succeeded with no link path', () => {
      beforeEach(() => {
        subject = shallow(<SaveIndicator success/>)
      })

      it('does not display a shareable link', () => {
        expect(subject.find(GeneratedShareLink).length).toBe(0)
      })
    })
  })
})