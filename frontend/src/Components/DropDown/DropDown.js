import React from 'react'
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
import './DropDown.css'
import 'react-dropdown/style.css';
import Select from "react-select";
const DropDown = (props) => {
      const defaultOption = props.heading;
      return (
        <>
        <Select className='drop-box' options={props.options} placeholder={defaultOption} value={props.value} onChange={props.onChange}/>
        </>
  )
}

export default DropDown;