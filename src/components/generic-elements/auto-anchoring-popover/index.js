import React, { useState } from "react"
import { Popover } from "@material-ui/core"

const AutoAnchoringPopover = ({children, className = '', ...props}) => {
  const [popoverAnchorRef, setPopoverAnchorRef] = useState({current: null})
  React.useEffect(() => { setPopoverAnchorRef(React.createRef()) }, [])
  const popoverActions = React.useRef()
  React.useEffect(() => { if (popoverActions.current) popoverActions.current.updatePosition() }, [children])
  const currentPopoverAnchorElement = () => (popoverAnchorRef.current ? popoverAnchorRef.current : null)

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
              action={popoverActions}
          >
              {children}
          </Popover>
      </auto-anchoring-popover>
  )
}
export default AutoAnchoringPopover
