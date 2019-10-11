import React, { useState } from "react"
import { Popover } from "@material-ui/core"

const AutoAnchoringPopover = ({children, ...props}) => {
  const [popoverAnchorRef, setPopoverAnchorRef] = useState(null)
  React.useEffect(() => { setPopoverAnchorRef(React.createRef()) }, [])
  const currentPopoverAnchorElement = () => (popoverAnchorRef ? popoverAnchorRef.current : null)

  return (
    <auto-anchoring-popover style={{height: '50%'}} ref={popoverAnchorRef}>
      <Popover
        {...props}
        anchorEl={currentPopoverAnchorElement}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
        {children}
      </Popover>
    </auto-anchoring-popover>
  )
}
export default AutoAnchoringPopover