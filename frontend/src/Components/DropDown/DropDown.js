import React from 'react'
import Dropdown from 'react-dropdown';
import './DropDown.css'
import 'react-dropdown/style.css';
const DropDown = (props) => {
      const defaultOption = props.heading;
      return (
        <>
        <Dropdown className='drop-box' options={props.list} value={defaultOption} placeholder="Select an option" />
        </>
  )
}

export default DropDown;