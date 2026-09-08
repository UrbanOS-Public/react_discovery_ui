import './tooltip.scss'

const ToolTip = ({ text }) => (
  <span className='tooltip'>
    {text}
    <div className='tooltip-text'>{text}</div>
  </span>
)

export default ToolTip;
