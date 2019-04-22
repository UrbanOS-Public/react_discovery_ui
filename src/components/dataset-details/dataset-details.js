import "./dataset-details.scss";
import { QueryStringBuilder } from "../../utils";
import _ from "lodash";

const DatasetDetails = props => {
  if (!props.dataset) {
    return <div />;
  }

  return (
    <dataset-details>
      <div className="name">{props.dataset.title}</div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: props.dataset.description }}
      />

      {!_.isEmpty(props.dataset.keywords) && (
        <div className="keywords">
          <div className="keyword-label">KEYWORDS</div>
          {props.dataset.keywords.map(createKeyword)}
        </div>
      )}
    </dataset-details>
  );
};

const createKeyword = name => (
  <a
    key={`dataset-keyword-${name}`}
    className="keyword"
    href={`/?${QueryStringBuilder.createFilterQueryString("keywords", name)}`}
  >
    {name}
  </a>
);

export default DatasetDetails;
