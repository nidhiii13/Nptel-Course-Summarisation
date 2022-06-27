import React, { useEffect, useState } from 'react'
import DropDown from '../../Components/DropDown/DropDown';
import "./Summariser.css";
import axios from 'axios';
import { getCourses, getCourseTranscripts,downloadCourseTranscripts, summariseText } from '../../api/api';
import Select from "react-dropdown-select";

const Summariser = () => {
    const list1 = [
        { label: "Aerospace Engineering", value: 1 },
        { label: "Biotechnology and Bioengineering", value: 2 },
        { label: "Chemical Engineering", value: 3 },
        { label: "Civil Engineering", value: 4 },
        { label: "Computer Science and Engineering", value: 5 },
        { label: "Economics", value: 6 }
      ];
       
    /* const list1=['Aerospace Engineering','Biotechnology and Bioengineering','Chemical Engineering','Civil Engineering','Computer Science and Engineering','Economics']; */ 
    const [list2,setList2] = useState([]);
    const [list3,setList3] = useState([]);
    const [text,setText] = useState("Summarised text here");
    const [dept,setDept] = useState("");
    const [course,setCourse] = useState("");
    const [lec,setLec] = useState("");
    const [flag,setFlag] = useState(false);
    const [summFlag,setsummFlag] = useState(false);
    var sum ="";
    const [summ,setsumm] = useState("");
    const getCourseList = async(d) => {
      const dept = await getCourses(d);
      console.log(dept);
      let temp=[];
      let i=1;
      dept.map(d=>temp.push({label:d.course_name,value:i++}));
      setList2(temp);
      console.log(list2);
    };

    const getTranscriptsList = async(c) => {
        const list = await getCourseTranscripts(c);
        console.log(list.transcripts);
        let temp=[];
        let i=1;
        var ll=list.transcripts;
        /* ll.map(d=>{l=l.concat(i);
            temp.push({label:d.l,value:i++})}); */
            for (const key in ll) {

                console.log(`${key}: ${ll[key]}`);
                temp.push({label:i++,value:ll[key]});
            }
        setList3(temp);
        console.log(list3);
      };

      const downloadTranscripts = async(lec,link) => {
        const transcripts = await downloadCourseTranscripts(lec,link);
        setText(transcripts.transcript);
        console.log(transcripts);
        setFlag(true);

      };

    const handleDept = (dept)=>{
      setsumm("Summarised text here");
      setFlag(false);
     setDept(dept);
     getCourseList(dept.label);
     console.log(dept);
    };

    const handleCourse = (course)=>{
        setFlag(false);
        setCourse(course);
        getTranscriptsList(course.label);
       };

       const handleLec = (lec)=>{
        setFlag(false);
        setLec(lec);
        console.log(lec.value);
        downloadTranscripts(lec.label.toString(),lec.value.toString());
       };

       const handleSubmit = async()=>{
           //console.log(text);
           var trim_text = text.trim();
          const summ_text = await summariseText(trim_text.slice(250,4500));
          setsumm(summ_text.summ_text[0].summary_text);
          console.log(summ_text.summ_text[0].summary_text);
          sum = summ_text.summary_text;
          setsummFlag(true);
          console.log(summ_text);
          console.log(summ);
       };
  return (
      <>
      <div className="Summariser_box">
      <div className="drop_box">
      <div className="db_1">
      <DropDown heading="Choose dept" options={list1} value={dept} onChange={handleDept}  /></div>
      <div className="db_2">
      <DropDown heading="choose course" options={list2} value={course} onChange={handleCourse}/></div>
      <div className="db_3">
      <DropDown heading="lec no" options={list3} value={lec} onChange={handleLec}/></div>
      {flag && <button className='go' onClick={handleSubmit}>GO</button>}
      </div>
      <div className="text_box">
          {summFlag && summ}
      </div>
      <button className='download_button' onClick={getCourseList}>Download PDF</button>
      </div>
    </>
  )
}

export default Summariser;