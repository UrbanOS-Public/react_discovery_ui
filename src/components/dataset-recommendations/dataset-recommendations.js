import './dataset-recommendations.scss'
import CollapsableBox from '../collapsable-box'


export default (props) => {
  return (
    <dataset-recommendations>
      <CollapsableBox title={"Recommended Datasets"} expanded={false}>
        {<ul>
          {props.recommendations.map(rec =>
            <li key={rec.id}>
              rec.systemName
            </li>)}
        </ul>}
      </CollapsableBox>
    </dataset-recommendations >
  )
}
