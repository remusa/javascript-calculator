import React from 'react'

const Buttons = props => (
    <button
        className='calculator__button'
        id={props.name}
        onClick={props.onClick}
        value={props.sign}>
        {props.sign}
    </button>
)

export default Buttons
