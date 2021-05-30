import React from "react";
import './GrayButton.css'
import '../theme.css'

const GrayButton = (props) => (
    <button className={'gray-button'} {...props}>
        {props.text}
    </button>
)


export default GrayButton
