import './dataset-recommendations.scss'
import CollapsableBox from '../collapsable-box'


export default (props) => {
  return (
    <dataset-recommendations>
      <CollapsableBox title={"Recommended Datasets"} expanded={false}>
        {<ul>
          {props.recommendations.map(rec =>
            <li key={rec.id}>
              <a href={"/dataset/" + rec.systemName.split("__")[0] + "/" + rec.systemName.split("__")[1]}>{rec.systemName}</a>
            </li>)}
        </ul>}
      </CollapsableBox>
    </dataset-recommendations >
  )
}
