import './select.scss'
import _ from 'lodash'

const createOption = option => {
  return <option key={option.label} value={option.value}>{option.label}</option>
}

export default ({options, label, selectChangeCallback, className}) => {
  const defaultValue = _.find(options, it => it.default).value

  return (
    <select-element class={className}>
      <label className='label' htmlFor={`select-${label}`}>{label}</label>
      <select defaultValue={defaultValue} className='selector' name={`select-${label}`} onChange={(event) => onChange(event, selectChangeCallback)}>
        {options.map(createOption)}
      </select>
    </select-element>
  );
}

const onChange = (event, selectChangeCallback) => {
  selectChangeCallback(event.target.value)
}