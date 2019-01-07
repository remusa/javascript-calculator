import React from 'react'

const Display = props => (
    <div id="display" className="calculator__display">
        {props.displayValue}
    </div>
)

export default Display
