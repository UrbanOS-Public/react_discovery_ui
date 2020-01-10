import './select.scss'
import _ from 'lodash'

const createOption = option => {
  return <option key={option.value} value={option.value}>{option.label}</option>
}

export default ({ options, label, selectChangeCallback, className, testId = '' }) => {
  const defaultOption = _.find(options, it => it.default)

  return (
    <select-element class={className}>
      <label className='label' htmlFor={`select-${label}`}>{label}</label>
      <select data-testid={testId} defaultValue={defaultOption ? defaultOption.value : options[0].value} className='selector' name={`select-${label}`} onChange={(event) => onChange(event, selectChangeCallback)}>
        {options.map(createOption)}
      </select>
    </select-element>
  )
}

const onChange = (event, selectChangeCallback) => {
  selectChangeCallback(event.target.value)
}
