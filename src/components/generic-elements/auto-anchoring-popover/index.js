import React, { useState } from "react"
import { Popover } from "@material-ui/core"

const AutoAnchoringPopover = ({children, className = '', ...props}) => {
  const [popoverAnchorRef, setPopoverAnchorRef] = useState(null)
  React.useEffect(() => { setPopoverAnchorRef(React.createRef()) }, [])
  const currentPopoverAnchorElement = () => (popoverAnchorRef ? popoverAnchorRef.current : null)

  return (
      <auto-anchoring-popover class={className} ref={popoverAnchorRef}>
          <Popover
              {...props}
              anchorEl={currentPopoverAnchorElement}
              container={currentPopoverAnchorElement}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              marginThreshold={0}
              transitionDuration={0}
          >
              {children}
          </Popover>
      </auto-anchoring-popover>
  )
}
export default AutoAnchoringPopover
