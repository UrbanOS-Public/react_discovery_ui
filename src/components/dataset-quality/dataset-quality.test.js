import { render } from 'enzyme'
import DatasetQuality from './dataset-quality'

describe('Dataset Quality ', () => {
  describe('Completeness', () => {


    test('should convert quality to a percentage', () => {
      const subject = render(<DatasetQuality completeness={{ total_score: 0.95 }} />)
      expect(subject.find(".completeness-score").text()).toEqual("95%")
    })

    test('rounds to nearest number', () => {
      let subject = render(<DatasetQuality completeness={{ total_score: 0.954312 }} />)
      expect(subject.find(".completeness-score").text()).toEqual("95%")

      subject = render(<DatasetQuality completeness={{ total_score: 0.956312 }} />)
      expect(subject.find(".completeness-score").text()).toEqual("96%")
    })

    test('should not display completeness if it is null', () => {
      let subject = render(<DatasetQuality completeness={null} />)
      expect(subject.find("quality-header").length).toEqual(0)
    })
  })
})
