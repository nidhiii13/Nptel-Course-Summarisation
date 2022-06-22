import React, { useEffect, useState } from 'react'
import DropDown from '../../Components/DropDown/DropDown';
import "./Summariser.css";
import axios from 'axios';

const Summariser = () => {
    
    const list1=['Aerospace Engineering','Biotechnology and Bioengineering','Chemical Engineering','Civil Engineering','Computer Science and Engineering','Economics'];
    const [list2,setList2] = useState([]);
    const [list3,setList3] = useState([]);
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/department/getDept/').then(resp => {

        console.log(resp.data);
    });
    }, [])
    
  return (
      <>
      <div className="Summariser_box">
      <div className="drop_box">
      <div className="db_1">
      <DropDown heading="choose dept" list={list1}/></div>
      <div className="db_2">
      <DropDown heading="choose course" list={list2}/></div>
      <div className="db_3">
      <DropDown heading="lec no" list={list3}/></div>
      </div>
      <div className="text_box">
          hiiiii cckkkkkkkkkk kkkkkkkkkkkk kkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
      </div>
      <button className='download_button'>Download PDF</button>
      </div>
    </>
  )
}

export default Summariser;