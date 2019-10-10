import './tab-button.scss'

export default ({children, className = '', ...props}) => (
  <button className={`tab-button ${className}`} role='button' {...props}>{children}</button>
)
