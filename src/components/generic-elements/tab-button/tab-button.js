import React from 'react'
import './tab-button.scss'

const TabButton = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <button ref={ref} className={`tab-button ${className}`} role='button' {...props}>{children}</button>
))

TabButton.displayName = 'TabButton';
export default TabButton;
